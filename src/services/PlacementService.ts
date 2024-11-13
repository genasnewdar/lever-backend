
import prisma from "../client";
import { randomUUID } from "crypto";
import CustomException from "../utils/CustomException";
import { ENGLISH_TEST_LEVEL_FORMAT_MAPPING } from "../configs/constants";


export class PlacementService {

    constructor() {
    }

    public getEnglishResponse = async () => {
        const data = await prisma.testResponseEnglish.findMany({})

        return data;
    }

    public getEnglishPlacementHistory = async (user_id: string) => {
        
        const testHistory = await prisma.testResponseEnglish.findMany({
            where: {
                user_id: user_id
            },
            orderBy: {
                created_at: 'desc'
            }
        });
        
        return testHistory;
    }

    public getEnglishPlacementHistoryDetails = async (user_id: string, placementResponseId: number) => {
        const testHistory = await prisma.testResponseEnglish.findFirstOrThrow({
            where: {
                id: placementResponseId,
                user_id: user_id
            },
            include: {
                question_response: {
                    include: {
                        question: true
                    }
                },
                test: {
                    include: {
                        questions: {
                            include: {
                                question: true
                            }
                        }
                    }
                }
            }
        });
    
        return testHistory;
    }
    

    public submitQuestionResponse = async (userId: string, placementResponseId: number, questionId: number, response: string) => {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                auth0_id: userId
            }
        })

        const placementResponse = await prisma.testResponseEnglish.findFirstOrThrow({
            where: {
                id: placementResponseId
            },
            include: {
                question_response: true
            }
        })

        const isFinished = placementResponse.is_finished
        if (isFinished) throw new CustomException(400, "PLACEMENT_ALREADY_FINISHED")

        const finishBefore = placementResponse.finish_before
        const now = new Date()

        if (now > finishBefore) throw new CustomException(400, "PLACEMENT_TIMEOUT")

        const question = await prisma.questionOnGeneralTestEnglish.findFirstOrThrow({
            where: {
                general_test_english_id: placementResponse.test_id,
                question_id: questionId
            },
            include: {
                question: true,
                general_test_english: true
            }
        })

        const questionResponseCheck = await prisma.questionResponseEnglish.findFirst({
            where: {
                question_id: question.question.id,
                general_test_english_id: question.general_test_english.id,
                test_response_english_id: placementResponse.id
            }
        })

        if (questionResponseCheck) {
            const updatedQuestionResponse = await prisma.questionResponseEnglish.update({
                where: {
                    id: questionResponseCheck.id
                },
                data: {
                    response: response,
                    updated_at: new Date()
                }
            })
            return updatedQuestionResponse
        }

        const questionResponse = await prisma.$transaction(async (prism) => {
            const questionResponse = await prism.questionResponseEnglish.create({
                data: {
                    response: response,
                    general_test_english_id: question.general_test_english.id,
                    question_id: question.question.id,
                    test_response_english_id: placementResponse.id
                }
            })

            const updated = await prism.testResponseEnglish.update({
                where: {
                    id: placementResponse.id
                },
                data: {
                    total_sumbitted: placementResponse.question_response.length
                }
            })

            return questionResponse
        })

        return questionResponse
    }
    
    public startPlacementEnglish = async (userId: string, placementId: number) => {

        const user = await prisma.user.findFirstOrThrow({
            where: {
                auth0_id: userId
            }
        })

        const placement = await prisma.generalTestEnglish.findFirstOrThrow({
            where: {
                id: placementId
            },
            include: {
                questions: true
            }
        })
        
        if (!placement.is_active) throw new CustomException(400, "PLACEMENT_TEST_NOT_ACTIVE")
        
        const questions = placement.questions
        const questionsCount = questions.length

        if (questionsCount <= 0) throw new CustomException(400, "PLACEMENT_TEST_ZERO_QUESTION")

        const now = new Date()
        const duration = placement.duration
        const durationMilliseconds = duration * 1000


        const testResponse = await prisma.testResponseEnglish.create({
            data: {
                user_id: user.auth0_id,
                test_id: placement.id,
                total_question: questionsCount,
                finish_before: new Date(now.getTime() + durationMilliseconds)
            }
        })

        return testResponse
    }

    

    public finishPlacementEnglish = async (userId: string, placementResponseId: number) => {

        const user = await prisma.user.findFirstOrThrow({
            where: {
                auth0_id: userId
            }
        })

        const placementResponse = await prisma.testResponseEnglish.findFirstOrThrow({
            where: {
                id: placementResponseId
            },
            include: {
                question_response: true,
                test: {
                    include: {
                        questions: {
                            include: {
                                question: true
                            }
                        }
                    }
                }
            }
        })

        const isFinished = placementResponse.is_finished
        if (isFinished) throw new CustomException(400, "PLACEMENT_ALREADY_FINISHED")

        const finishBefore = placementResponse.finish_before
        const now = new Date()

        const questions = placementResponse.test.questions
        const submittedQuestions = placementResponse.question_response

        if (now > finishBefore) {
            this._finishExam(submittedQuestions, questions, placementResponse)
            throw new CustomException(400, "PLACEMENT_TIMEOUT")
        }
        
        const r = this._finishExam(submittedQuestions, questions, placementResponse)

        return r
    }

    private _finishExam = async (submittedQuestions: any, questions: any, placementResponse: any) => {
        let correctCount = 0
        let correctArray: any = []
        let incorrectCount = 0
        let incorrectArray: any = []
        for (const s of submittedQuestions) {
            const q: any = questions.find((item: any) => item.question_id === s.question_id)

            if (q.question.answer === s.response) {
                correctArray.push(s.id)
                correctCount++;
            } else {
                incorrectCount++
                incorrectArray.push(s.id)
            }

        }

        const r = await prisma.$transaction(async (prism) => {
            for (const correct of correctArray) {
                await prism.questionResponseEnglish.update({
                    where: {
                        id: correct
                    },
                    data: {
                        is_correct: true
                    }
                })
            }

            for (const incorrect of incorrectArray) {
                await prism.questionResponseEnglish.update({
                    where: {
                        id: incorrect
                    },
                    data: {
                        is_correct: false
                    }
                })
            }

            const f = correctCount / placementResponse.total_question
            const factor = Number(f.toFixed(4))

            const startedAt = placementResponse.created_at;
            
            const now = new Date();
            
            const timeDifferenceInMillis = now.getTime() - startedAt.getTime(); 
            const timeDifferenceInSeconds = Math.floor(timeDifferenceInMillis / 1000);
            const minutes = Math.floor(timeDifferenceInSeconds / 60);
            const remainingSeconds = timeDifferenceInSeconds % 60;
            const formattedTime = `${minutes} minute${minutes !== 1 ? 's' : ''} ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
            
            const updatedPlacementResponse = await prism.testResponseEnglish.update({
                where: {
                    id: placementResponse.id
                },
                data: {
                    total_correct: correctCount,
                    total_incorrect: incorrectCount,
                    factor: factor,
                    percentage: `${factor * 100}%`,
                    is_finished: true,
                    finished_at: now,
                    time_took_sec: timeDifferenceInSeconds,
                    time_took: formattedTime,
                    updated_at: now
                }
            })

            return updatedPlacementResponse
        })
        return r
    }

    public getPlacementsEnglish = async () => {

        const placements = await prisma.generalTestEnglish.findMany()
        return placements
    }
    public getPlacementById = async (id: number) => {
        const placement = await prisma.generalExam.findUnique({
          where: { id },
          include: {
            exam_questions: {
              include: { exam_question: true }
            }
          }
        });
        
        if (!placement) throw new CustomException(404, "Placement test not found");
        return placement;
    }
    
    public deletePlacement = async (id: number) => {
        await prisma.generalExam.delete({
            where: { id }
        });
        
        return { message: "Placement test deleted successfully" };
    }
    public getActivePlacements = async () => {
        const activePlacements = await prisma.generalExam.findMany({
          where: { is_active: true }
        });
        
        return activePlacements;
    }
    public getPlacementStatistics = async (id: number) => {
        const statistics = await prisma.generalExamResponse.groupBy({
          by: ['total_correct'],
          where: { test_id: id },
          _count: { id: true },
          _avg: { factor: true }
        });
        
        return statistics;
    }
    public activatePlacement = async (id: number) => {
        const activatedPlacement = await prisma.generalExam.update({
            where: { id },
            data: { is_active: true }
        });
        
        return activatedPlacement;
    }
    public updatePlacement = async (id: number, data: any) => {// ene data type asuuna data type aa yuu gej avc boloh ve
        const updatedPlacement = await prisma.generalExam.update({
            where: { id },
            data
        });
        
        return updatedPlacement;
    }

    public deactivatePlacement = async (id: number) => {
        const deactivatedPlacement = await prisma.generalExam.update({
            where: { id },
            data: { is_active: false }
        });
        
        return deactivatedPlacement;
    }

    public getPlacementEnglish = async (id: number, comprehensive: boolean) => {

        if (comprehensive) {
            const placement = await prisma.generalTestEnglish.findFirstOrThrow({
                where: {
                    id: id
                },
                include: {
                    questions: {
                        select: {
                            question_id: true,
                            question: {
                                select: {
                                    type: true,
                                    subject: true,
                                    levels: true,
                                    topic: true,
                                    text: true,                                  
                                    choices: true
                                }
                            }
                        }
                    }
                }
            })
            return placement
        }
        const placement = await prisma.generalTestEnglish.findFirstOrThrow({
            where: {
                id: id
            }
        })
        return placement
    }

    public createQuestion = async (data: any) => {

        const check = await prisma.question.findFirst({
            where: {
                subject: data.subject,
                type: data.type,
                topic: data.topic,
                text: data.text
            }
        })
        if (check) throw new CustomException(400, "Duplicated.")

        const question = await prisma.question.create({
            data: {
                type: data.type,
                subject: data.subject,
                levels: data.levels,
                text: data.text,
                answer: data.answer,
                choices: data.choices,
                topic: data.topic
            }
        })
        return question
    }

    public generateEnglishPlacementTest = async (data: any) => {
        const level = data.level as keyof typeof ENGLISH_TEST_LEVEL_FORMAT_MAPPING;
        const format = ENGLISH_TEST_LEVEL_FORMAT_MAPPING[level]

        
        const questions = await prisma.question.findMany({
            where: {
                subject: data.subject,
                levels: {
                    has: level
                }
            }
        })

        // select random questions based on format
        let placementRaw: any = []
        for (const key in format) {
            if (Object.prototype.hasOwnProperty.call(format, key)) {
                let topicCountFromFormat = format[key as keyof typeof format];
                let topicQuestions = questions.filter((q: any) => {
                    return q.topic == key
                })

                if (topicCountFromFormat > topicQuestions.length) {
                    throw new CustomException(400, `${key} does not have sufficient question base.`)
                }

                let randomlySelectedQuestions = this.getRandomElements(topicQuestions, topicCountFromFormat)
                placementRaw = placementRaw.concat(randomlySelectedQuestions)
            }        
        }

        // shuffling the input
        const placementInput = this.shuffleArray(placementRaw)

        let query: any[] = [];        
        placementInput.forEach((p: any) => {
            query.push({
                question: {
                    connect: {
                        id: p.id
                    }
                }
            })
        });
        
        const placement = await prisma.generalTestEnglish.create({
            data: {
                title: data.title,
                description: data.description,
                format: "default",
                levels: [level],
                duration: data.duration,
                questions: {
                    create: query
                }
            }
        })

        return placement
    }

    private getRandomElements<T>(arr: T[], numElements: number): T[] {
        const shuffledArray = arr.slice();
    
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
    
        return shuffledArray.slice(0, numElements);
    }

    private shuffleArray<T>(arr: T[]): T[] {
        const shuffledArray = arr.slice(); // Create a copy to avoid mutating the original array
    
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
    
        return shuffledArray;
    }
}

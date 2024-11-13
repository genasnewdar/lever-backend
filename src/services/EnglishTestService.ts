import prisma from "../client";
import CustomException from "../utils/CustomException";

export class EnglishTestService {
    constructor() {}

    public createFullEnglishTest = async (data: any) => {
        return prisma.$transaction(async (prismaClient) => {
            const englishTest = await prismaClient.englishTest.create({
                data: {
                    title: data.title,
                    description: data.description,
                    duration: data.duration,
                    is_active: data.is_active,
                    total_points: data.total_points,
                    english_test_parts: {
                        create: (data.english_test_parts || []).map((part: any) => ({
                            title: part.title,
                            order: part.order,
                            english_test_sections: {
                                create: (part.english_test_sections || []).map((section: any) => ({
                                    title: section.title,
                                    description: section.description,
                                    order: section.order,
                                    english_test_tasks: {
                                        create: (section.english_test_tasks || []).map((task: any) => ({
                                            description: task.description,
                                            content: task.content,
                                            should_index: task.should_index,
                                            english_test_questions: {
                                                create: (task.english_test_questions || []).map((question: any) => ({
                                                    type: question.type,
                                                    content: question.content,
                                                    answer: question.answer,
                                                    choices: question.choices || [],
                                                    points: question.points,
                                                    order: question.order
                                                }))
                                            }
                                        }))
                                    }
                                }))
                            }
                        }))
                    }
                },
                include: {
                    english_test_parts: {
                        include: {
                            english_test_sections: {
                                include: {
                                    english_test_tasks: {
                                        include: {
                                            english_test_questions: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
    
            return englishTest;
        });
    }

    public createEnglishTest = async (data: any) => {
        return prisma.englishTest.create({
            data: {
                title: data.title,
                description: data.description,
                duration: data.duration,
                is_active: data.is_active,
                total_points: data.total_points
            }
        });
    }

    public createEnglishTestPart = async (englishTestId: number, data: any) => {
        return prisma.englishTestPart.create({
            data: {
                title: data.title,
                order: data.order,
                english_test_id: englishTestId
            }
        });
    }

    public createEnglishTestSection = async (englishTestPartId: number, data: any) => {
        return prisma.englishTestSection.create({
            data: {
                title: data.title,
                description: data.description,
                order: data.order,
                english_test_part_id: englishTestPartId
            }
        });
    }

    public createEnglishTestTask = async (englishTestSectionId: number, data: any) => {
        return prisma.englishTestTask.create({
            data: {
                description: data.description,
                content: data.content,
                should_index: data.should_index,
                english_test_section_id: englishTestSectionId
            }
        });
    }

    public createEnglishTestQuestion = async (englishTestTaskId: number, data: any) => {
        return prisma.englishTestQuestion.create({
            data: {
                type: data.type,
                content: data.content,
                answer: data.answer,
                choices: data.choices,
                points: data.points,
                order: data.order,
                task_id: englishTestTaskId
            }
        });
    }
    public getEnglishTests = async () => {
        return prisma.englishTest.findMany({
            where: {
                is_deleted: false
            },
            include: {
                english_test_parts: {
                    include: {
                        english_test_sections: {
                            include: {
                                english_test_tasks: {
                                    include: {
                                        english_test_questions: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////USER APIS/////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    public getEnglishTestById = async (id: number) => {
        try {
            const englishTest = await prisma.englishTest.findUnique({
                where: {
                    id: id,
                    is_deleted: false,
                    is_active: true
                },
                include: {
                    english_test_parts: {
                        include: {
                            english_test_sections: {
                                include: {
                                    english_test_tasks: {
                                        include: {
                                            english_test_questions: true
                                        }
                                    },
                                    english_test_task_match: {
                                        include: {
                                            english_test_match_questions: true
                                        }
                                    },
                                    english_test_task_multiple_blank: {
                                        include: {
                                            english_test_multiple_blank_questions: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });

            if (!englishTest) {
                throw new CustomException(404, "English test not found");
            }

            return englishTest;
        } catch (error) {
            if (error instanceof CustomException) {
                throw error;
            }
            throw new CustomException(500, "Error fetching English test");
        }
    }

    public startEnglishTest = async (userId: string, testId: number) => {
        try {
            const englishTest = await this.getEnglishTestById(testId);

            const totalQuestions = this.calculateTotalQuestions(englishTest);

            const testResponse = await prisma.englishTestResponse.create({
                data: {
                    user_id: userId,
                    english_test_id: testId,
                    total_questions: totalQuestions,
                    finish_before: new Date(Date.now() + englishTest.duration * 1000)
                }
            });

            return testResponse;
        } catch (error) {
            if (error instanceof CustomException) {
                throw error;
            }
            throw new CustomException(500, "Error starting English test");
        }
    }

    public submitQuestionResponse = async (userId: string, testResponseId: number, questionId: number, response: string) => {
        try {
            const testResponse = await prisma.englishTestResponse.findFirstOrThrow({
                where: {
                    id: testResponseId,
                    user_id: userId
                },
                include: {
                    english_test_part_responses: {
                        include: {
                            english_test_section_responses: {
                                include: {
                                    english_test_task_responses: {
                                        include: {
                                            english_test_question_responses: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });

            if (testResponse.is_finished) {
                throw new CustomException(400, "Test already finished");
            }

            if (new Date() > testResponse.finish_before) {
                throw new CustomException(400, "Test time expired");
            }

            const question = await prisma.englishTestQuestion.findUnique({
                where: { id: questionId }
            });

            if (!question) {
                throw new CustomException(404, "Question not found");
            }

            const existingResponse = await prisma.englishTestQuestionResponse.findFirst({
                where: {
                    english_test_question_id: questionId,
                    english_test_task_response: {
                        english_test_section_response: {
                            english_test_part_response: {
                                english_test_response_id: testResponseId
                            }
                        }
                    }
                }
            });

            let questionResponse;

            if (existingResponse) {
                questionResponse = await prisma.englishTestQuestionResponse.update({
                    where: { id: existingResponse.id },
                    data: {
                        response: response,
                    }
                });
            } else {
                questionResponse = await prisma.englishTestQuestionResponse.create({
                    data: {
                        english_test_task_response: {
                            connect: {
                                id: testResponse.english_test_part_responses[0].english_test_section_responses[0].english_test_task_responses[0].id
                            }
                        },
                        english_test_question: {
                            connect: { id: questionId }
                        },
                        response: response,
                    }
                });
            }

            await this.updateTestResponseStats(testResponseId);

            return questionResponse;
        } catch (error) {
            if (error instanceof CustomException) {
                throw error;
            }
            throw new CustomException(500, "Error submitting question response");
        }
    }

    public finishEnglishTest = async (userId: string, testResponseId: number) => {
        try {
            const testResponse = await prisma.englishTestResponse.findFirstOrThrow({
                where: {
                    id: testResponseId,
                    user_id: userId,
                    is_finished: false
                },
                include: {
                    english_test_part_responses: {
                        include: {
                            english_test_section_responses: {
                                include: {
                                    english_test_task_responses: {
                                        include: {
                                            english_test_question_responses: {
                                                include: {
                                                    english_test_question: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });

            if (testResponse.is_finished) {
                throw new CustomException(400, "Test already finished");
            }

            const now = new Date();
            const timeTookSec = Math.floor((now.getTime() - testResponse.created_at.getTime()) / 1000);
            const timeTook = this.formatTimeTook(timeTookSec);

            let totalCorrect = 0;
            let totalPoints = 0;

            testResponse.english_test_part_responses.forEach(partResponse => {
                partResponse.english_test_section_responses.forEach(sectionResponse => {
                    sectionResponse.english_test_task_responses.forEach(taskResponse => {
                        taskResponse.english_test_question_responses.forEach(questionResponse => {
                            if (questionResponse.response === questionResponse.english_test_question.answer) {
                                totalCorrect++;
                                totalPoints += questionResponse.english_test_question.points;
                            }
                        });
                    });
                });
            });

            const totalSubmitted = testResponse.total_submitted;
            const percentageCorrect = (totalCorrect / testResponse.total_questions) * 100;

            const updatedTestResponse = await prisma.englishTestResponse.update({
                where: { id: testResponseId },
                data: {
                    is_finished: true,
                    finished_at: now,
                    time_took_sec: timeTookSec,
                    time_took: timeTook,
                    total_correct: totalCorrect,
                    total_incorrect: totalSubmitted - totalCorrect,
                    total_points: totalPoints,
                    percentage_correct: percentageCorrect
                }
            });

            return updatedTestResponse;
        } catch (error) {
            if (error instanceof CustomException) {
                throw error;
            }
            throw new CustomException(500, "Error finishing English test");
        }
    }

    public getEnglishTestHistory = async (userId: string) => {
        try {
            const testHistory = await prisma.englishTestResponse.findMany({
                where: {
                    user_id: userId
                },
                orderBy: {
                    created_at: 'desc'
                },
                include: {
                    english_test: {
                        select: {
                            title: true,
                            description: true
                        }
                    }
                }
            });

            return testHistory;
        } catch (error) {
            throw new CustomException(500, "Error fetching English test history");
        }
    }

    private calculateTotalQuestions(englishTest: any): number {
        let total = 0;
        for (const part of englishTest.english_test_parts) {
            for (const section of part.english_test_sections) {
                total += section.english_test_tasks.reduce((sum: number, task: any) => sum + task.english_test_questions.length, 0);
                total += section.english_test_task_match.reduce((sum: number, task: any) => sum + task.english_test_match_questions.length, 0);
                total += section.english_test_task_multiple_blank.reduce((sum: number, task: any) => sum + task.english_test_multiple_blank_questions.length, 0);
            }
        }
        return total;
    }

    private async updateTestResponseStats(testResponseId: number) {
        const testResponse = await prisma.englishTestResponse.findUnique({
            where: { id: testResponseId },
            include: {
                english_test_part_responses: {
                    include: {
                        english_test_section_responses: {
                            include: {
                                english_test_task_responses: {
                                    include: {
                                        english_test_question_responses: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!testResponse) {
            throw new CustomException(404, "Test response not found");
        }

        const totalSubmitted = testResponse.english_test_part_responses.reduce((sum, partResponse) => 
            sum + partResponse.english_test_section_responses.reduce((sectionSum, sectionResponse) => 
                sectionSum + sectionResponse.english_test_task_responses.reduce((taskSum, taskResponse) => 
                    taskSum + taskResponse.english_test_question_responses.length, 0), 0), 0);

        await prisma.englishTestResponse.update({
            where: { id: testResponseId },
            data: {
                total_submitted: totalSubmitted,
            }
        });
    }

    private formatTimeTook(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
    }
}
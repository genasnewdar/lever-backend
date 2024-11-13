import prisma from "../client";
import { randomUUID } from "crypto";
import CustomException from "../utils/CustomException";
import { string } from "joi";
import { clear, count } from "console";


export class ExamService {

    constructor() {
    }

    public createGeneralExam = async (data: any) => {
        const examIntl = await prisma.generalExam.create({
            data: {
                title: data.title,
                description: data.description,
                format: "default",
                levels: [data.level],
                duration: data.duration,
            }
        })
        return examIntl
    }

    public createExamDBlocks = async (examId: number, data: any) => {
        // const exam = await prisma.generalExam.findFirstOrThrow({
        //     where: {
        //         id: examId
        //     }
        // })

        const updated = prisma.generalExam.update({
            where: {
                id: examId
            },
            data: {
                description_blocks: data.description_blocks
            }
        })

        return updated
    }

    public createGeneralExamQuestion = async (examId: number, data: any) => {
        // const exam = await prisma.generalExam.findFirstOrThrow({
        //     where: {
        //         id: examId
        //     }
        // })

        const exam_question = prisma.examQuestion.create({
            data: {
                type: data.type,
                subject: data.subject,
                levels: data.levels,
                topic: data.topic,
                text: data.text,
                index: data.index,
                index_to_show: data.index_to_show ? data.index_to_show : data.index,
                sub_index_type: data.sub_index_type ? data.sub_index_type : "",
                answer: data.answer,
                choices: data.choices,
                combination_keys: data.combination_keys,
                combination_values: data.combination_values,
                combinations_answers: data.combinations_answers
            }
        })

        return exam_question
    }

    public createExam = async (data: any) => {
        const examIntl = await prisma.examInternational.create({
            data: {
                type: data.type,
                description: data.description
            }
        })
        return examIntl
    }

    public createExamListening = async (examId: number, data: any) => {
        const exam = await prisma.examInternational.findFirstOrThrow({
            where: {
                id: examId
            }
        })

        const listening = await prisma.listening.create({
            data: {
                exam_id: exam.id,
                page1: data.page1,
                page2: data.page2,
                page3: data.page3,
                page4: data.page4
            }
        })
        return listening
    }

    public createExamReading = async (examId: number, data: any) => {
        const exam = await prisma.examInternational.findFirstOrThrow({
            where: {
                id: examId
            }
        })

        const reading = await prisma.reading.create({
            data: {
                exam_id: exam.id,
                page1: data.page1,
                page2: data.page2,
                page3: data.page3
            }
        })
        return reading
    }

    public createExamWriting = async (examId: number, data: any) => {
        const exam = await prisma.examInternational.findFirstOrThrow({
            where: {
                id: examId
            }
        })

        const dt: any = {
            exam_id: exam.id,
            page1: data.page1,
            page2: data.page2,
            link1: data.link1,
            link2: data.link2
        }
        
        if (data.type1) dt.type1 = data.type1
        if (data.type2) dt.type2 = data.type2
        
        const writing = await prisma.writing.create({
            data: dt
        })

        return writing
    }

    public createExamSpeaking = async (examId: number, data: any) => {
        const exam = await prisma.examInternational.findFirstOrThrow({
            where: {
                id: examId
            }
        })
        
        const speaking = await prisma.speaking.create({
            data: {
                exam_id: exam.id,
                page1_1: data.page1_1,
                page1_1_link: data.page1_1_link,
                page1_2: data.page1_2,
                page1_2_link: data.page1_2_link,
                page1_3: data.page1_3,
                page1_3_link: data.page1_3_link,
    
                page1_4: data.page1_4,
                page1_4_link: data.page1_4_link,
                page1_5: data.page1_5,
                page1_5_link: data.page1_5_link,
                page1_6: data.page1_6,
                page1_6_link: data.page1_6_link,
                
                page2: data.page2,
    
                page3_1: data.page3_1,
                page3_1_link: data.page3_1_link,
                page3_2: data.page3_2,
                page3_2_link: data.page3_2_link,
                page3_3: data.page3_3,
                page3_3_link: data.page3_3_link,
    
                page3_4: data.page3_4,
                page3_4_link: data.page3_4_link,
                page3_5: data.page3_5,
                page3_5_link: data.page3_5_link,
                page3_6: data.page3_6,
                page3_6_link: data.page3_6_link,
            }
        })

        return speaking
    }

    public createExamListeningAnswer = async (listeningId: number, data: any) => {
        const listening = await prisma.listening.findFirstOrThrow({
            where: {
                id: listeningId
            }
        })

        const listeningAnswer = await prisma.listeningAnswer.create({
            data: {
                listening_id: listening.id,
                a1: data.a1,
                a2: data.a2,
                a3: data.a3,
                a4: data.a4,
                a5: data.a5,
                a6: data.a6,
                a7: data.a7,
                a8: data.a8,
                a9: data.a9,
                a10: data.a10,
                a11: data.a11,
                a12: data.a12,
                a13: data.a13,
                a14: data.a14,
                a15: data.a15,
                a16: data.a16,
                a17: data.a17,
                a18: data.a18,
                a19: data.a19,
                a20: data.a20,
                a21: data.a21,
                a22: data.a22,
                a23: data.a23,
                a24: data.a24,
                a25: data.a25,
                a26: data.a26,
                a27: data.a27,
                a28: data.a28,
                a29: data.a29,
                a30: data.a30,
                a31: data.a31,
                a32: data.a32,
                a33: data.a33,
                a34: data.a33,
                a35: data.a35,
                a36: data.a36,
                a37: data.a37,
                a38: data.a38,
                a39: data.a39,
                a40: data.a40
            }
        })
        return listeningAnswer
    }

    public createExamReadingAnswer = async (readingId: number, data: any) => {
        const reading = await prisma.reading.findFirstOrThrow({
            where: {
                id: readingId
            }
        })

        const readingAnswer = await prisma.readingAnswer.create({
            data: {
                reading_id: reading.id,
                a1: data.a1,
                a2: data.a2,
                a3: data.a3,
                a4: data.a4,
                a5: data.a5,
                a6: data.a6,
                a7: data.a7,
                a8: data.a8,
                a9: data.a9,
                a10: data.a10,
                a11: data.a11,
                a12: data.a12,
                a13: data.a13,
                a14: data.a14,
                a15: data.a15,
                a16: data.a16,
                a17: data.a17,
                a18: data.a18,
                a19: data.a19,
                a20: data.a20,
                a21: data.a21,
                a22: data.a22,
                a23: data.a23,
                a24: data.a24,
                a25: data.a25,
                a26: data.a26,
                a27: data.a27,
                a28: data.a28,
                a29: data.a29,
                a30: data.a30,
                a31: data.a31,
                a32: data.a32,
                a33: data.a33,
                a34: data.a33,
                a35: data.a35,
                a36: data.a36,
                a37: data.a37,
                a38: data.a38,
                a39: data.a39,
                a40: data.a40
            }
        })
        return readingAnswer
    }

    public getExam = async (examId: number) => {
        const examIntl = await prisma.examInternational.findFirstOrThrow({
            where: {
                id: examId
            },
            select: {
                id: true,
                type: true,
                description: true,
                created_at: true,
                listening: true,
                reading: true,
                writing: true,
                speaking: true
            }
        })
        return examIntl
    }

    public getExams = async () => {
        const examIntl = await prisma.examInternational.findMany({
            select: {
                id: true,
                type: true,
                description: true,
                created_at: true
            }
        })
        return examIntl
    }

    public getListeningResponse = async (examResponseId: number) => {
        try {
            const response = await prisma.listeningResponse.findFirst({
                where: { id: examResponseId }
            });
    
            if (!response) {
                throw new Error(`NO_LISTENING_RESPONSE_FOUND_ON_EXAM ${examResponseId}`);
            }
    
            return response;
        } catch (error) {
            console.error("FAILED_TO_RETRIEVE_LISTENING_RESPONSE", error);
            throw new Error(`FAILED_TO_RETRIEVE_LISTENING_RESPONSE_FROM_THE_EXAM ${examResponseId}: ${error.message}`);
        }
    }
    public getReadingResponse = async (examResponseId: number) => {
        try {
            const response = await prisma.readingResponse.findFirst({
                where: { id: examResponseId },
                select: {
                    id: true,
                    created_at: true,
                    a1: true,
                    a2: true,
                    a3: true,
                    a4: true,
                    a5: true,
                    a6: true,
                    a7: true,
                    a8: true,
                    a9: true,
                    a10: true,
                    a11: true,
                    a12: true,
                    a13: true,
                    a14: true,
                    a15: true,
                    a16: true,
                    a17: true,
                    a18: true,
                    a19: true,
                    a20: true,
                    a21: true,
                    a22: true,
                    a23: true,
                    a24: true,
                    a25: true,
                    a26: true,
                    a27: true,
                    a28: true,
                    a29: true,
                    a30: true,
                    a31: true,
                    a32: true,
                    a33: true,
                    a34: true,
                    a35: true,
                    a36: true,
                    a37: true,
                    a38: true,
                    a39: true,
                    a40: true,
                }
            });
    
            if (!response) {
                throw new Error(`NO_READING_RESPONSE_FOUND_ON_EXAM ${examResponseId}`);
            }
    
            return response;
        } catch (error) {
            console.error("FAILED_TO_RETRIEVE_READING_RESPONSE", error);
            throw new Error(`FAILED_TO_RETRIEVE_READING_RESPONSE_FROM_THE_EXAM ${examResponseId}: ${error.message}`);
        }
    }
    
    
    public getWritingResponse = async (examResponseId: number) => {
        return prisma.writingResponse.findFirstOrThrow({
            where: { exam_id: examResponseId }
        });
    }
    
    public getSpeakingResponse = async (examResponseId: number) => {
        return prisma.speakingResponse.findFirstOrThrow({
            where: { exam_id: examResponseId }
        });
    }
    public startIELTSExam = async (userId: string, examId: number) => {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                auth0_id: userId
            }
        });

        const exam = await prisma.examInternational.findFirstOrThrow({
            where: {
                id: examId
            },
            include: {
                listening: true,
                writing: true,
                speaking: true,
                reading: true
            }
        })

        // listening, writing, speaking, reading baigaa esehiig shalganaa, ali ni negni bhgy bol aldaa ugnuu THROW EXCEPTION ERROR 
        // tus buriih ni  answer baigaa esehiig shalganaa, ali neg ni bhgu bol throw error

        if (exam.is_deleted) throw new CustomException(400, "IELTS_TEST_IS_DELETED")

        const durationMinutes = 180;
        const now = new Date();
        const durationMilliseconds = durationMinutes * 60 * 1000;

        const endTime = new Date(now.getTime() + durationMilliseconds);

        // 1t exam bga uguig shalgaad aguulgiig avna
        // enig exam gey

        const examResponse = await prisma.examInternationalResponse.create({
            data: {
                user_id: userId,
                exam_id: examId,
                score: "0",
                start_time: now,
                end_time: endTime,
                is_finished: false,
            },
            include: {
                ListeningResponse: true,
                ReadingResponse: true,
                SpeakingResponse: true,
                WritingResponse: true
            }
        });

        // exam response uusgene
        //


        // return examresponse

        return examResponse;
    }
    public submitListeningResponse = async (userId: string, examResponseId: number, response: any) => {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                auth0_id: userId
            }
        })
            
        const examResponse = await prisma.examInternationalResponse.findFirstOrThrow({
            where: {
                id: examResponseId
            },
            include: {
                ListeningResponse: true,
                exam: {
                    include: {
                        listening: {
                            include: {
                                ListeningAnswer: true
                            }
                        }
                    }
                }
            }
        });

        console.log(examResponse);

        if (examResponse.is_finished) {
            throw new CustomException(400, 'EXAM_ALREADY_FINISHED');
        }
        const now = new Date();
        
        if (examResponse.end_time && now > examResponse.end_time) {
            throw new CustomException(400, 'EXAM_TIMEOUT');
        }

        const listeningResponse = examResponse.ListeningResponse

        if (listeningResponse) {
            const updatedListeningResponse = await prisma.listeningResponse.update({
                where: {
                    id: listeningResponse.id,
                },
                data: {
                    ...response,
                    updated_at: new Date(),
                },
            });
            return updatedListeningResponse;
        } else {
            if (!examResponse.exam.listening) {
                throw new CustomException(400, 'NO_LISTENING_FOUND_ON_EXAM')
            }
            if (!examResponse.exam.listening?.ListeningAnswer) {
                throw new CustomException(400, 'NO_LISTENING_ANSWER_FOUND')
            }
                            
            const listeningResponse = await prisma.listeningResponse.create({
                data: { 
                    listening_answer_id: examResponse.exam.listening.ListeningAnswer.id,
                    exam_id: examResponse.id,
                    score: "0",
                    ...response
                },
            });

            return listeningResponse
        }
    }

    public submitReadingResponse = async (userId: string, examResponseId: number, response: any) => {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                auth0_id: userId
            }
        })
            
        const examResponse = await prisma.examInternationalResponse.findFirstOrThrow({
            where: {
                id: examResponseId
            },
            include: {
                ReadingResponse: true,
                exam: {
                    include: {
                        reading: {
                            include: {
                                ReadingAnswer: true
                            }
                        }
                    }
                }
            }
        });
        console.log(examResponse)

        if (examResponse.is_finished) {
            throw new CustomException(400, 'EXAM_ALREADY_FINISHED');
        }
        const now = new Date();
        
        if (examResponse.end_time && now > examResponse.end_time) {
            throw new CustomException(400, 'EXAM_TIMEOUT');
        }

        const readingResponse = examResponse.ReadingResponse

        if (readingResponse) {
            const updatedReadingResponse = await prisma.readingResponse.update({
                where: {
                    id: readingResponse.id,
                },
                data: {
                    ...response,
                    updated_at: new Date(),
                },
            });
            return updatedReadingResponse;
        } else{
            if (!examResponse.exam.reading) {
                throw new CustomException(400, 'NO_READING_FOUND_ON_EXAM')
            }
            if (!examResponse.exam.reading?.ReadingAnswer) {
                throw new CustomException(400, 'NO_READING_ANSWER_FOUND')
            }
                            
            const readingResponse = await prisma.readingResponse.create({
                data: { 
                    reading_answer_id: examResponse.exam.reading.ReadingAnswer.id,
                    exam_id: examResponse.id,
                    score: "0",
                    ...response
                },
            });

            return readingResponse
        }
    }

    public submitWritingResponse = async (userId: string, examResponseId: number, data: any) => {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                auth0_id: userId
            }
        });
    
        const examResponse = await prisma.examInternationalResponse.findFirstOrThrow({
            where: {
                id: examResponseId
            },
            include: {
                WritingResponse: true,
                exam: {
                    include: {
                        writing: {
                        }
                    }
                }
            }
        });
    
        if (examResponse.is_finished) {
            throw new CustomException(400, 'EXAM_ALREADY_FINISHED');
        }
        const now = new Date();
        if (examResponse.end_time && now > examResponse.end_time) {
            throw new CustomException(400, 'EXAM_TIMEOUT');
        }
    
        const writingResponse = examResponse.WritingResponse;
    
        if (writingResponse) {
            const updatedWritingResponse = await prisma.writingResponse.update({
                where: {
                    id: writingResponse.id,
                },
                data: {
                    ...data,
                    updated_at: new Date(),
                },
            });
            return updatedWritingResponse;
        } else {
            if (!examResponse.exam.writing) {
                throw new CustomException(400, 'NO_WRITING_FOUND_ON_EXAM')
            }
    
            const writingResponse = await prisma.writingResponse.create({
                data: { 
                    exam_id: examResponse.id,
                    score: "1",
                    ...data
                },
            });
    
            return writingResponse;
        }
    }

    public submitSpeakingResponse = async (userId: string, examResponseId: number, data: any) => {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                auth0_id: userId
            }
        });
    
        const examResponse = await prisma.examInternationalResponse.findFirstOrThrow({
            where: {
                id: examResponseId
            },
            include: {
                SpeakingResponse: true,
                exam: {
                    include: {
                        speaking: {
                        }
                    }
                }
            }
        });
    
        if (examResponse.is_finished) {
            throw new CustomException(400, 'EXAM_ALREADY_FINISHED');
        }
    
        const now = new Date();
        if (examResponse.end_time && now > examResponse.end_time) {
            throw new CustomException(400, 'EXAM_TIMEOUT');
        }
    
        const speakingResponse = examResponse.SpeakingResponse;
    
        if (speakingResponse) {
            const updatedSpeakingResponse = await prisma.speakingResponse.update({
                where: {
                    id: speakingResponse.id,
                },
                data: {
                    ...data,
                    updated_at: new Date(),
                },
            });
            return updatedSpeakingResponse;
        } else {
            if (!examResponse.exam.speaking) {
                throw new CustomException(400, 'NO_SPEAKING_FOUND_ON_EXAM')
            }
    
            const speakingResponse = await prisma.speakingResponse.create({
                data: { 
                    exam_id: examResponse.id,
                    score: "1",
                    ...data
                },
            });
    
            return speakingResponse;
        }
    }
    
    public finishIELTSExam = async (userId: string, testResponseId: number) => {
        const user = await prisma.user.findFirstOrThrow({
            where: {
                auth0_id: userId
            }
        });
    
        const testResponse = await prisma.examInternationalResponse.findFirstOrThrow({
            where: {
                id: testResponseId,
                is_finished: false
            },
            include: {
                ListeningResponse: true,
                ReadingResponse: true,
                WritingResponse: true,
                SpeakingResponse: true
            }
        });


        
    
        const endTime = new Date();
        const timeDifferenceInMillis = endTime.getTime() - testResponse.start_time.getTime();
        const timeDifferenceInSeconds = Math.floor(timeDifferenceInMillis / 1000);
        const minutes = Math.floor(timeDifferenceInSeconds / 60);
        const remainingSeconds = timeDifferenceInSeconds % 60;
        const formattedTime = `${minutes} minute${minutes !== 1 ? 's' : ''} ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;

        const listeningScore = await this._finishListening(testResponse.ListeningResponse, testResponse.ListeningResponse?.listening_answer_id);
        const readingScore = await this._finishReading(testResponse.ReadingResponse, testResponse.ReadingResponse?.reading_answer_id);
        const writingScore = await this._finishWriting(testResponse.WritingResponse);
        const speakingScore = await this._finishSpeaking(testResponse.SpeakingResponse);

        const response = await prisma.$transaction(async (prism) => {
            // listening
            await prism.listeningResponse.update({
                where :{
                    id: testResponse.ListeningResponse?.id
                },
                data: {
                    score: listeningScore.toString(),
                    is_analyzed: true,
                    analyzed_at: new Date()
                }
            })

            // reading
            await prism.readingResponse.update({
                where: {
                    id: testResponse.ReadingResponse?.id
                },
                data: {
                    score: readingScore.toString(),
                    is_analyzed: true,
                    analyzed_at: new Date()
                }
            });

            // writing
            await prism.writingResponse.update({
                where: {
                    id: testResponse.WritingResponse?.id
                },
                data: {
                    score: writingScore.toString(),
                    is_analyzed: true,
                    analyzed_at: new Date()
                }
            });

            // speaking
            await prism.speakingResponse.update({
                where: {
                    id: testResponse.SpeakingResponse?.id
                },
                data: {
                    score: speakingScore.toString(),
                    is_analyzed: true,
                    analyzed_at: new Date()
                }
            });

            const updatedTestResponse = await prism.examInternationalResponse.update({
                where: {
                    id: testResponse.id
                },
                data: {
                    end_time: endTime,
                    duration: formattedTime,
                    is_finished: true
                }
            });
            return updatedTestResponse;
        })
        return response;
    }

    private _finishListening = async (submittedListeningResponse: any, listeningAnswer: any) => {
        let correctCount = 0

        const listeningResponseId = submittedListeningResponse.id
        for (let i = 1; i <= 40; i++) {
            const submittedAnswer = submittedListeningResponse['a' + i];
            const correctAnswer = listeningAnswer['a' + i];
            if (submittedAnswer === correctAnswer) {
                correctCount++;
            }
        }
        let score = 0;
        switch (correctCount) {
            case 0:
                score = 1;
                break;
            case 1:
            case 2:
                score = 1.5;
                break;
            case 3:
            case 4:
                score = 2;
                break;
            case 5:
            case 6:
                score = 2.5;
                break;
            case 7:
            case 8:
                score = 3;
                break;
            case 9:
            case 10:
                score = 3.5;
                break;
            case 11:    
            case 12:
                score = 4;
                break;
            case 13:
            case 14:
            case 15:
                score = 4.5;
                break;
            case 16:
            case 17:
                score = 5;
                break;
            case 18:
            case 19:
            case 20:
            case 21:
            case 22:
                score = 5.5;
                break;
            case 23:
            case 24:
            case 25:
                score = 6;
                break;
            case 26:
            case 27:
            case 28:
            case 29:
                score = 6.5;
                break;
            case 30:
            case 31:
                score = 7;
                break;
            case 32:
            case 33:
            case 34:
                score = 7.5;
                break;
            case 35:
            case 36:
                score = 8;
                break;
            case 37:
            case 38:
                score = 8.5;
                break;
            case 39:
            case 40:
                score = 9;
                break;
        }

        // try {
        //     const result = await prisma.$transaction(async (prisma) => {
        //         return await prisma.listeningResponse.update({
        //             where: {
        //                 id: submittedListeningResponse.id
        //             },
        //             data: {
        //                 score: score.toString(),
        //                 is_analyzed: true,
        //                 analyzed_at: new Date()
        //             }
        //         });
        //     });

        return score
    }
    private _finishReading = async (submittedReadingResponse: any, readingAnswer: any) => {
        let correctCount = 0;
    
        for (let i = 1; i <= 40; i++) {
            const submittedAnswer = submittedReadingResponse['a' + i];
            const correctAnswer = readingAnswer['a' + i];
            if (submittedAnswer === correctAnswer) {
                correctCount++;
            }
        }
    
        let score = 0;
        switch (correctCount) {
            case 0:
                score = 1;
                break;
            case 1:
            case 2:
                score = 1.5;
                break;
            case 3:
            case 4:
                score = 2;
                break;
            case 5:
            case 6:
                score = 2.5;
                break;
            case 7:
            case 8:
                score = 3;
                break;
            case 9:
            case 10:
                score = 3.5;
                break;
            case 11:    
            case 12:
                score = 4;
                break;
            case 13:
            case 14:
                score = 4.5;
                break;
            case 15:
            case 16:
            case 17:
            case 18:
                score = 5;
                break;
            case 19:
            case 20:
            case 21:
            case 22:
                score = 5.5;
                break;
            case 23:
            case 24:
            case 25:
            case 26:
                score = 6;
                break;
            case 27:
            case 28:
            case 29:
                score = 6.5;
                break;
            case 30:
            case 31:
            case 32:
                score = 7;
                break;
            case 33:
            case 34:
                score = 7.5;
                break;
            case 35:
            case 36:
                score = 8;
                break;
            case 37:
            case 38:
                score = 8.5;
                break;
            case 39:
            case 40:
                score = 9;
                break;
        }
    
        try {
            const result = await prisma.$transaction(async (prisma) => {
                return await prisma.readingResponse.update({
                    where: {
                        id: submittedReadingResponse.id
                    },
                    data: {
                        score: score.toString(),
                        is_analyzed: true,
                        analyzed_at: new Date()
                    }
                });
            });
            return result;
        } catch (error) {
            console.error("FAILED_TO_UPDATE_READING_RESPONSE", error);
            throw error;
        }
    }
    private _finishWriting = async (submittedWritingResponse: any) => {
        const { essay1, essay2, id } = submittedWritingResponse;
        try {
            const score1 = Math.floor(Math.random() * 7) + 1;
            const score2 = Math.floor(Math.random() * 7) + 1;

            const finalScore = (score1 + 2 * score2) / 2;

            return finalScore;
        }catch(error){
            console.error("FAILED_TO_FINISH_WRITING_RESPONSE:", error);
            throw error;
        }
    }
    private _finishSpeaking = async (submittedSpeakingResponse: any) => {
        const { response1, response2, id } = submittedSpeakingResponse;
        try {
            const score1 = Math.floor(Math.random() * 7) + 1;
            const score2 = Math.floor(Math.random() * 7) + 1;
    
            const finalScore = (score1 + 2 * score2) / 2;
    
            return finalScore;
        } catch (error) {
            console.error("FAILED_TO_FINISH_SPEAKING_RESPONSE:", error);
            throw error;
        }
    }
    

//deleted code is in my notes
}

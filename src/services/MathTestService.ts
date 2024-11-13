import prisma from "../client";
import CustomException from "../utils/CustomException";

export class MathTestService {
    
    // Create a new Math Test
    public createMathTest = async (data: any) => {
        return await prisma.mathTest.create({
            data: {
                title: data.title,
                description: data.description,
                duration: data.duration,
                is_active: data.is_active,
                total_points: data.total_points,
                math_test_parts: {
                    create: data.math_test_parts.map((part: any) => ({
                        title: part.title,
                        order: part.order,
                        math_test_sections: {
                            create: part.math_test_sections.map((section: any) => ({
                                title: section.title,
                                description: section.description,
                                order: section.order,
                                math_test_questions: {
                                    create: section.math_test_questions.map((question: any) => ({
                                        type: question.type,
                                        content: question.content,
                                        answer: question.answer,
                                        points: question.points,
                                        order: question.order,
                                        choices: question.choices,
                                    })),
                                },
                            })),
                        },
                    })),
                },
            },
            include: {
                math_test_parts: {
                    include: {
                        math_test_sections: {
                            include: {
                                math_test_questions: true,
                            },
                        },
                    },
                },
            },
        });
    }

    // Retrieve all Math Tests
    public getMathTests = async () => {
        return await prisma.mathTest.findMany({
            include: {
                math_test_parts: {
                    include: {
                        math_test_sections: {
                            include: {
                                math_test_questions: true,
                            },
                        },
                    },
                },
            },
        });
    }

    // Retrieve Math Test by ID
    public getMathTestById = async (id: number) => {
        return await prisma.mathTest.findUnique({
            where: { id },
            include: {
                math_test_parts: {
                    include: {
                        math_test_sections: {
                            include: {
                                math_test_questions: true,
                            },
                        },
                    },
                },
            },
        });
    }

    // Update a Math Test by ID
    public updateMathTest = async (id: number, data: any) => {
        return await prisma.mathTest.update({
            where: { id },
            data: {
                title: data.title,
                description: data.description,
                duration: data.duration,
                is_active: data.is_active,
                total_points: data.total_points,
            },
        });
    }

    // Delete a Math Test by ID
    public deleteMathTest = async (id: number) => {
        await prisma.mathTest.delete({
            where: { id },
        });
    }

    // Get test history for a user
    public getMathTestHistory = async (userId: string) => {
        try {
            const testHistory = await prisma.mathTestResponse.findMany({
                where: { user_id: userId },
                orderBy: { created_at: 'desc' },
                include: {
                    math_test: {
                        select: {
                            title: true,
                            description: true
                        }
                    }
                }
            });
            return testHistory;
        }catch(error){
            throw new CustomException(500, "Error fetching Math test history");
        }
    }

    public startMathTest = async (userId: string, testId: number) => {
        try {
            const mathTest = await this.getMathTestById(testId);
    
            const totalQuestions = this.calculateTotalQuestions(mathTest);
            if (mathTest) {
                const testResponse = await prisma.mathTestResponse.create({
                    data: {
                        user_id: userId,
                        math_test_id: testId,
                        total_questions: totalQuestions,
                        finish_before: new Date(Date.now() + mathTest.duration * 1000)
                    }
                });
                return testResponse;
            } else {
                throw new CustomException(404, "Math test not found");
            }
    
        } catch (error) {
            if (error instanceof CustomException) {
                throw error;
            }
            throw new CustomException(500, "Error starting Math test");
        }
    }

    private calculateTotalQuestions(mathTest: any): number {
        let total = 0;
        for (const part of mathTest.math_test_parts) {
            for (const section of part.math_test_sections) {
                total += section.math_test_questions.length;
            }
        }
        return total;
    }

    public submitQuestionResponse = async (userId: string, testResponseId: number, questionId: number, response: string) => {
        try {
            const testResponse = await prisma.mathTestResponse.findFirstOrThrow({
                where: { id: testResponseId, user_id: userId },
                include: {
                    math_test_part_responses: {
                        include: {
                            math_test_section_responses: {
                                include: {
                                    math_test_question_responses: true
                                }
                            }
                        }
                    }
                }
            });

            if (testResponse.is_finished) {
                throw new CustomException(400, "Test is already finished");
            }
            
            if (new Date() > testResponse.finish_before) {
                throw new CustomException(400, "Test is already finished");
            }

            const question = await prisma.mathTestQuestion.findUnique({
                where: { id: questionId }
            });

            if (!question) {
                throw new CustomException(404, "Question not found");
            }

            const isCorrect = response === question.answer;
            const points = isCorrect ? question.points : 0;

            await prisma.mathTestQuestionResponse.create({
                data: {
                    math_test_section_response_id: testResponseId,
                    math_test_question_id: questionId,
                    response: response,
                    is_correct: isCorrect,
                    points: points,
                }
            });

            return { isCorrect, points };
        } catch (error) {
            if (error instanceof CustomException) {
                throw error;
            }
            throw new CustomException(500, "Error submitting question response");
        }
    }

    public finishMathTest = async (userId: string, testResponseId: number) => {
        try {
            const testResponse = await prisma.mathTestResponse.findFirstOrThrow({
                where: {
                    id: testResponseId,
                    user_id: userId,
                    is_finished: false
                },
                include: {
                    math_test_part_responses: {
                        include: {
                            math_test_section_responses: {
                                include: {
                                    math_test_question_responses: {
                                        include: {
                                            math_test_question: true
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
    
            testResponse.math_test_part_responses.forEach(partResponse => {
                partResponse.math_test_section_responses.forEach(sectionResponse => {
                    sectionResponse.math_test_question_responses.forEach(questionResponse => {
                        if (questionResponse.response === questionResponse.math_test_question.answer) {
                            totalCorrect++;
                            totalPoints += questionResponse.math_test_question.points;
                        }
                    });
                });
            });
    
            const totalSubmitted = testResponse.total_submitted;
            const percentageCorrect = (totalCorrect / testResponse.total_questions) * 100;
    
            const updatedTestResponse = await prisma.mathTestResponse.update({
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
            throw new CustomException(500, "Error finishing Math test");
        }
    }
    private formatTimeTook(seconds: number): string {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} minute${minutes !== 1 ? 's' : ''} ${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`;
    }  
}

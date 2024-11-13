import prisma from "../client";
import CustomException from "../utils/CustomException";

export class CourseService {
  constructor() {}

  public createCourse = async (data: any) => {
    try {
      const course = await prisma.course.create({
        data: {
          title: data.title,
          description: data.description,
        }
      });
      return course;
    } catch (error) {
      console.error("FAILED_TO_CREATE_COURSE", error);
      throw new CustomException(400, "FAILED_TO_CREATE_COURSE");
    }
  }

  public getCourses = async () => {
    try {
      const courses = await prisma.course.findMany({
        where: { is_deleted: false }
      });
      return courses;
    } catch (error) {
      console.error("FAILED_TO_FETCH_COURSES", error);
      throw new CustomException(400, "FAILED_TO_FETCH_COURSES");
    }
  }

  public getCourse = async (courseId: number) => {
    try {
      const course = await prisma.course.findFirstOrThrow({
        where: { id: courseId, is_deleted: false },
        include: { lessons: true }
      });
      return course;
    } catch (error) {
      console.error("FAILED_TO_FETCH_COURSE", error);
      throw new CustomException(404, "COURSE_NOT_FOUND");
    }
  }

  public updateCourse = async (courseId: number, data: any) => {
    try {
      const course = await prisma.course.update({
        where: { id: courseId },
        data: {
          title: data.title,
          description: data.description,
          updated_at: new Date()
        }
      });
      return course;
    } catch (error) {
      console.error("FAILED_TO_UPDATE_COURSE", error);
      throw new CustomException(400, "FAILED_TO_UPDATE_COURSE");
    }
  }

  public deleteCourse = async (courseId: number) => {
    try {
      const course = await prisma.course.update({
        where: { id: courseId },
        data: { is_deleted: true, updated_at: new Date() }
      });
      return course;
    } catch (error) {
      console.error("FAILED_TO_DELETE_COURSE", error);
      throw new CustomException(400, "FAILED_TO_DELETE_COURSE");
    }
  }

  public createLesson = async (courseId: number, data: any) => {
    try {
      const lesson = await prisma.lesson.create({
        data: {
          title: data.title,
          description: data.description,
          videoUrl: data.videoUrl,
          course_id: courseId,
        }
      });
      return lesson;
    } catch (error) {
      console.error("FAILED_TO_CREATE_LESSON", error);
      throw new CustomException(400, "FAILED_TO_CREATE_LESSON");
    }
  }

  public getLessons = async (courseId: number) => {
    try {
      const lessons = await prisma.lesson.findMany({
        where: { course_id: courseId, is_deleted: false }
      });
      return lessons;
    } catch (error) {
      console.error("FAILED_TO_FETCH_LESSONS", error);
      throw new CustomException(400, "FAILED_TO_FETCH_LESSONS");
    }
  }

  public getLesson = async (lessonId: number) => {
    try {
      const lesson = await prisma.lesson.findFirstOrThrow({
        where: { id: lessonId, is_deleted: false },
        include: { CourseQuestion: true }
      });
      return lesson;
    } catch (error) {
      console.error("FAILED_TO_FETCH_LESSON", error);
      throw new CustomException(404, "LESSON_NOT_FOUND");
    }
  }

  public updateLesson = async (lessonId: number, data: any) => {
    try {
      const lesson = await prisma.lesson.update({
        where: { id: lessonId },
        data: {
          title: data.title,
          description: data.description,
          videoUrl: data.videoUrl,
          updated_at: new Date()
        }
      });
      return lesson;
    } catch (error) {
      console.error("FAILED_TO_UPDATE_LESSON", error);
      throw new CustomException(400, "FAILED_TO_UPDATE_LESSON");
    }
  }

  public deleteLesson = async (lessonId: number) => {
    try {
      const lesson = await prisma.lesson.update({
        where: { id: lessonId },
        data: { is_deleted: true, updated_at: new Date() }
      });
      return lesson;
    } catch (error) {
      console.error("FAILED_TO_DELETE_LESSON", error);
      throw new CustomException(400, "FAILED_TO_DELETE_LESSON");
    }
  }

  public createQuestion = async (lessonId: number, data: any) => {
    try {
      const question = await prisma.courseQuestion.create({
        data: {
          text: data.text,
          choices: data.choices,
          correctAnswer: data.correctAnswer,
          lesson_id: lessonId,
        }
      });
      return question;
    } catch (error) {
      console.error("FAILED_TO_CREATE_QUESTION", error);
      throw new CustomException(400, "FAILED_TO_CREATE_QUESTION");
    }
  }

  public getQuestion = async (questionId: number) => {
    try {
      const question = await prisma.courseQuestion.findFirstOrThrow({
        where: { id: questionId, is_deleted: false }
      });
      return question;
    } catch (error) {
      console.error("FAILED_TO_FETCH_QUESTION", error);
      throw new CustomException(404, "QUESTION_NOT_FOUND");
    }
  }

  public submitLessonResponse = async (userId: string, lessonId: number, data: any) => {
    try {
      const lessonResponse = await prisma.courseLessonResponse.create({
        data: {
          user_id: userId,
          lesson_id: lessonId,
          is_completed: true,
          completed_at: new Date(),
          responses: {
            create: data.responses.map((response: any) => ({
              user_id: userId,
              question_id: response.question_id,
              response: response.response,
              is_correct: response.is_correct,
            }))
          }
        }
      });
      return lessonResponse;
    } catch (error) {
      console.error("FAILED_TO_SUBMIT_LESSON_RESPONSE", error);
      throw new CustomException(400, "FAILED_TO_SUBMIT_LESSON_RESPONSE");
    }
  }

  public getUserCourseProgress = async (userId: string, courseId: number) => {
    try {
      const courseProgress = await prisma.courseLessonResponse.findMany({
        where: {
          user_id: userId,
          lesson: {
            course_id: courseId
          }
        },
        include: {
          lesson: true,
          responses: true
        }
      });
      return courseProgress;
    } catch (error) {
      console.error("FAILED_TO_FETCH_USER_COURSE_PROGRESS", error);
      throw new CustomException(400, "FAILED_TO_FETCH_USER_COURSE_PROGRESS");
    }
  }

  public enrollUserInCourse = async (userId: string, courseId: number) => {
    try {
      const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: { lessons: true }
      });

      if (!course) {
        throw new CustomException(404, "COURSE_NOT_FOUND");
      }

      const enrollments = await prisma.courseLessonResponse.createMany({
        data: course.lessons.map(lesson => ({
          user_id: userId,
          lesson_id: lesson.id,
          is_completed: false
        }))
      });

      return enrollments;
    } catch (error) {
      console.error("FAILED_TO_ENROLL_USER_IN_COURSE", error);
      throw new CustomException(400, "FAILED_TO_ENROLL_USER_IN_COURSE");
    }
  }

  public getCourseAnalytics = async (courseId: number) => {
    try {
      const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: {
          lessons: {
            include: {
              responses: {
                where: { is_completed: true },
                select: { user_id: true }
              },
              CourseQuestion: {
                include: {
                  responses: {
                    select: { is_correct: true }
                  }
                }
              }
            }
          }
        }
      });

      if (!course) {
        throw new CustomException(404, "COURSE_NOT_FOUND");
      }

      const totalEnrollments = new Set(course.lessons.flatMap(lesson => lesson.responses.map(r => r.user_id))).size;
      const completionRate = course.lessons.map(lesson => ({
        lessonId: lesson.id,
        title: lesson.title,
        completionRate: (lesson.responses.length / totalEnrollments) * 100
      }));

      const questionPerformance = course.lessons.flatMap(lesson =>
        lesson.CourseQuestion.map(question => ({
          questionId: question.id,
          lessonId: lesson.id,
          correctRate: (question.responses.filter(r => r.is_correct).length / question.responses.length) * 100
        }))
      );

      return {
        courseId,
        title: course.title,
        totalEnrollments,
        completionRate,
        questionPerformance
      };
    } catch (error) {
      console.error("FAILED_TO_FETCH_COURSE_ANALYTICS", error);
      throw new CustomException(400, "FAILED_TO_FETCH_COURSE_ANALYTICS");
    }
  }
}
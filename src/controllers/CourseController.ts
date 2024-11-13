import { NextFunction, Request, Response, Router } from "express";
import Joi from 'joi';
import BaseController from "./BaseController";
import { validateRequestBody, validateRequestIdParam } from "../middlewares/RequestValidator";
import CustomException from "../utils/CustomException";
import { CourseService } from "../services/CourseService";
import { checkJwt, decodeJwt } from "../middlewares/AuthValidator";
import RequestWithUser from "../dto/RequestWithUser";

export class CourseController implements BaseController {

  public baseUrl = "/api/course";
  private courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  public initializeRoutes(router: Router): void {
    router.get("", checkJwt, decodeJwt, this.getCourses);
    router.get("/:id", checkJwt, decodeJwt, validateRequestIdParam, this.getCourse);
    router.post("", checkJwt, decodeJwt, this.createCourse);
    router.put("/:id", checkJwt, decodeJwt, validateRequestIdParam, this.updateCourse);
    router.delete("/:id", checkJwt, decodeJwt, validateRequestIdParam, this.deleteCourse);

    router.get("/:courseId/lessons", checkJwt, decodeJwt, validateRequestIdParam, this.getLessons);
    router.get("/lessons/:id", checkJwt, decodeJwt, validateRequestIdParam, this.getLesson);
    router.post("/:courseId/lessons", checkJwt, decodeJwt, this.createLesson);
    router.put("/lessons/:id", checkJwt, decodeJwt, validateRequestIdParam, this.updateLesson);
    router.delete("/lessons/:id", checkJwt, decodeJwt, validateRequestIdParam, this.deleteLesson);

    router.get("/lessons/:lessonId/questions", checkJwt, decodeJwt, validateRequestIdParam, this.getQuestions);
  }

  // Course handlers
  private getCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courses = await this.courseService.getCourses();
      return res.json(courses);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }

  private getCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const course = await this.courseService.getCourse(+id);
      return res.json(course);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }

  private createCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const course = await this.courseService.createCourse(req.body);
      return res.json(course);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }

  private updateCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const course = await this.courseService.updateCourse(+id, req.body);
      return res.json(course);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }

  private deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const course = await this.courseService.deleteCourse(+id);
      return res.json(course);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }

  // Lesson handlers
  private getLessons = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId } = req.params;
      const lessons = await this.courseService.getLessons(+courseId);
      return res.json(lessons);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }

  private getLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const lesson = await this.courseService.getLesson(+id);
      return res.json(lesson);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }

  private createLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId } = req.params;
      const lesson = await this.courseService.createLesson(+courseId, req.body);
      return res.json(lesson);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }

  private updateLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const lesson = await this.courseService.updateLesson(+id, req.body);
      return res.json(lesson);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }

  private deleteLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const lesson = await this.courseService.deleteLesson(+id);
      return res.json(lesson);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }

  private getQuestions = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lessonId } = req.params;
      const questions = await this.courseService.getQuestion(+lessonId);
      return res.json(questions);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }
}

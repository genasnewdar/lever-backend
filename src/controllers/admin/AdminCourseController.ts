import { NextFunction, Request, Response, Router } from "express";
import Joi from 'joi';
import BaseController from "../BaseController";
import { _validateAdminApiKey, validateRequestBody, validateRequestIdParam } from "../../middlewares/RequestValidator";
import CustomException from "../../utils/CustomException";
import { CourseService } from "../../services/CourseService";

export class AdminCourseController implements BaseController {
  public baseUrl = "/admin/course";
  public courseService: CourseService;

  constructor() {
    this.courseService = new CourseService();
  }

  public initializeRoutes(router: Router): void {
    router.post("", _validateAdminApiKey, this._validateCourse, this.postCourse);
    router.put("/:id", _validateAdminApiKey, validateRequestIdParam, this._validateCourse, this.updateCourse);
    router.delete("/:id", _validateAdminApiKey, validateRequestIdParam, this.deleteCourse);

    router.post("/:id/lesson", _validateAdminApiKey, validateRequestIdParam, this._validateLesson, this.postLesson);
    router.put("/lesson/:id", _validateAdminApiKey, validateRequestIdParam, this._validateLesson, this.updateLesson);
    router.delete("/lesson/:id", _validateAdminApiKey, validateRequestIdParam, this.deleteLesson);

    router.post("/lesson/:id/question", _validateAdminApiKey, validateRequestIdParam, this._validateQuestion, this.postQuestion);

    router.get("/:id/analytics", _validateAdminApiKey, validateRequestIdParam, this.getCourseAnalytics);
  }

  private postCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.courseService.createCourse(req.body);
      return res.json(result);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }

  private updateCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.courseService.updateCourse(+id, req.body);
      return res.json(result);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }

  private deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.courseService.deleteCourse(+id);
      return res.json(result);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }

  private postLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.courseService.createLesson(+id, req.body);
      return res.json(result);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }

  private updateLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.courseService.updateLesson(+id, req.body);
      return res.json(result);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }

  private deleteLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.courseService.deleteLesson(+id);
      return res.json(result);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }

  private postQuestion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.courseService.createQuestion(+id, req.body);
      return res.json(result);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }

  private getCourseAnalytics = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.courseService.getCourseAnalytics(+id);
      return res.json(result);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }

  private _validateCourse(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required()
    });
    validateRequestBody(req, next, schema);
  }

  private _validateLesson(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      videoUrl: Joi.string().required()
    });
    validateRequestBody(req, next, schema);
  }

  private _validateQuestion(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      text: Joi.string().required(),
      choices: Joi.array().items(Joi.string()).required(),
      correctAnswer: Joi.string().required()
    });
    validateRequestBody(req, next, schema);
  }
}
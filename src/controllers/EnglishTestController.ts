import { NextFunction, Request, Response, Router } from "express";
import Joi from 'joi';
import BaseController from "./BaseController";
import { validateRequestBody, validateRequestIdParam } from "../middlewares/RequestValidator";
import CustomException from "../utils/CustomException";
import { EnglishTestService } from "../services/EnglishTestService";
import { checkJwt, decodeJwt } from "../middlewares/AuthValidator";
import RequestWithUser from "../dto/RequestWithUser";

export class EnglishTestController implements BaseController {
    public baseUrl = "/api/english-test";
    private englishTestService: EnglishTestService;

    constructor() {
        this.englishTestService = new EnglishTestService();
    }

    public initializeRoutes(router: Router): void {
        router.get("/:id", validateRequestIdParam, this.getEnglishTestById);
        router.post("/:id/start", checkJwt, decodeJwt, validateRequestIdParam, this.startEnglishTest);
        router.post("/test/:id/question-response", checkJwt, decodeJwt, validateRequestIdParam, this._validateQuestionResponse, this.submitQuestionResponse);
        router.post("/test/:id/finish", checkJwt, decodeJwt, validateRequestIdParam, this.finishEnglishTest);
        router.get("/history", checkJwt, decodeJwt, this.getEnglishTestHistory);
    }

    private getEnglishTestById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this.englishTestService.getEnglishTestById(+id);
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private startEnglishTest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as RequestWithUser).auth0Id;
            const { id } = req.params;
            const result = await this.englishTestService.startEnglishTest(userId, +id);
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private submitQuestionResponse = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as RequestWithUser).auth0Id;
            const { id } = req.params;
            const { question_id, response } = req.body;
            const result = await this.englishTestService.submitQuestionResponse(userId, +id, +question_id, response);
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private finishEnglishTest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as RequestWithUser).auth0Id;
            const { id } = req.params;
            const result = await this.englishTestService.finishEnglishTest(userId, +id);
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private getEnglishTestHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as RequestWithUser).auth0Id;
            const result = await this.englishTestService.getEnglishTestHistory(userId);
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private _validateQuestionResponse(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            question_id: Joi.number().integer().required(),
            response: Joi.string().required()
        });
        validateRequestBody(req, next, schema);
    }
}
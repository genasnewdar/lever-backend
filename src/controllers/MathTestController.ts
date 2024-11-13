import { NextFunction, Request, Response, Router } from "express";
import Joi from 'joi';
import BaseController from "./BaseController";
import { validateRequestBody, validateRequestIdParam } from "../middlewares/RequestValidator";
import CustomException from "../utils/CustomException";
import { MathTestService } from "../services/MathTestService";
import { checkJwt, decodeJwt } from "../middlewares/AuthValidator";
import RequestWithUser from "../dto/RequestWithUser";

export class MathTestController implements BaseController {
    public baseUrl = "/api/math-test";
    private mathTestService: MathTestService;

    constructor() {
        this.mathTestService = new MathTestService();
    }

    public initializeRoutes(router: Router): void {
        router.get("/:id", validateRequestIdParam, this.getMathTestById);
        router.post("/:id/start", checkJwt, decodeJwt, validateRequestIdParam, this.startMathTest);
        router.post("/test/:id/question-response", checkJwt, decodeJwt, validateRequestIdParam, this._validateQuestionResponse, this.submitQuestionResponse);
        router.post("/test/:id/finish", checkJwt, decodeJwt, validateRequestIdParam, this.finishMathTest);
        router.get("/history", checkJwt, decodeJwt, this.getMathTestHistory);
    }

    private getMathTestById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this.mathTestService.getMathTestById(+id);
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private startMathTest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as RequestWithUser).auth0Id;
            const { id } = req.params;
            const result = await this.mathTestService.startMathTest(userId, +id);
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
            const result = await this.mathTestService.submitQuestionResponse(userId, +id, +question_id, response);
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private finishMathTest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as RequestWithUser).auth0Id;
            const { id } = req.params;
            const result = await this.mathTestService.finishMathTest(userId, +id);
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private getMathTestHistory = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as RequestWithUser).auth0Id;
            const result = await this.mathTestService.getMathTestHistory(userId);
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

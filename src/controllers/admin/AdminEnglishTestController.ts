import { NextFunction, Request, Response, Router } from "express";
import Joi from 'joi';
import BaseController from "../BaseController";
import { _validateAdminApiKey, validateRequestBody } from "../../middlewares/RequestValidator";
import CustomException from "../../utils/CustomException";
import { EnglishTestService } from "../../services/EnglishTestService";

export class AdminEnglishTestController implements BaseController {
    public baseUrl = "/admin/english-test";
    public englishTestService: EnglishTestService;

    constructor() {
        this.englishTestService = new EnglishTestService();
    }

    public initializeRoutes(router: Router): void {
        router.post("", _validateAdminApiKey, this._validateEnglishTest, this.createEnglishTest);
        router.get("", _validateAdminApiKey, this.getEnglishTests);
    }

    private createEnglishTest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.englishTestService.createFullEnglishTest(req.body);
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private getEnglishTests = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.englishTestService.getEnglishTests();
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private _validateEnglishTest(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            title: Joi.string().required(),
            description: Joi.string(),
            duration: Joi.number().integer().min(0),
            is_active: Joi.boolean(),
            total_points: Joi.number().integer().min(0),
            english_test_parts: Joi.array().items(Joi.object({
                title: Joi.string().required(),
                order: Joi.number().integer().required(),
                english_test_sections: Joi.array().items(Joi.object({
                    title: Joi.string().required(),
                    description: Joi.string(),

                    
                    order: Joi.number().integer().required(),
                    english_test_tasks: Joi.array().items(Joi.object({
                        description: Joi.string().required(),
                        content: Joi.string().allow(null),
                        should_index: Joi.boolean().required(),
                        english_test_questions: Joi.array().items(Joi.object({
                            type: Joi.string().valid('MULTIPLE_CHOICES', 'FILL_IN_THE_BLANK', 'MULTIPLE_CHOICE_FORK').required(),
                            content: Joi.string().required(),
                            answer: Joi.string().required(),
                            choices: Joi.array().items(Joi.string()).required(),
                            points: Joi.number().integer().min(0),
                            order: Joi.number().integer()
                        }))
                    }))
                }))
            }))
        });
        validateRequestBody(req, next, schema);
    }
}
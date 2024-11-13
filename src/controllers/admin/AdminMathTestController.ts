import { NextFunction, Request, Response, Router } from "express";
import Joi from 'joi';
import BaseController from "../BaseController";
import { _validateAdminApiKey, validateRequestBody, validateRequestIdParam } from "../../middlewares/RequestValidator";
import CustomException from "../../utils/CustomException";
import { MathTestService } from "../../services/MathTestService";

export class AdminMathTestController implements BaseController {
    public baseUrl = "/admin/math-test";
    public mathTestService: MathTestService;

    constructor() {
        this.mathTestService = new MathTestService();
    }

    public initializeRoutes(router: Router): void {
        router.post("", _validateAdminApiKey, this.createMathTest);
        router.get("", _validateAdminApiKey, this.getMathTests);
        router.delete("/:id", _validateAdminApiKey, validateRequestIdParam, this.deleteMathTest);
    }

    private createMathTest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.mathTestService.createMathTest(req.body);
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private getMathTests = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.mathTestService.getMathTests();
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
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

    private updateMathTest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this.mathTestService.updateMathTest(+id, req.body);
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private deleteMathTest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            await this.mathTestService.deleteMathTest(+id);
            return res.status(204).send(); // No content
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }
}
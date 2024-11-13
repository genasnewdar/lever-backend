import { NextFunction, Request, Response, Router } from "express";
import Joi from 'joi';
import BaseController from "../BaseController";
import CustomException from "../../utils/CustomException";
import { AcademyService } from "../../services/AcademyService";
import { _validateAdminApiKey, validateRequestBody, validateRequestIdParam } from "../../middlewares/RequestValidator";

export class AdminAcademyController implements BaseController {
    public baseUrl = "/admin/academy";
    private academyService: AcademyService;

    constructor() {
        this.academyService = new AcademyService();
    }

    public initializeRoutes(router: Router): void {
        router.post("", _validateAdminApiKey, this.validateAcademy, this.createAcademy);
        router.get("", _validateAdminApiKey, this.getAllAcademies);
        router.get("/:id", _validateAdminApiKey, validateRequestIdParam, this.getAcademyById);
        router.put("/:id", _validateAdminApiKey, validateRequestIdParam, this.updateAcademy);
        router.delete("/:id", _validateAdminApiKey, validateRequestIdParam, this.deleteAcademy);
    }

    private createAcademy = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, description, rating } = req.body;
            const academy = await this.academyService.createAcademy(name, description, rating);
            res.status(201).json(academy);
        } catch (err) {
            next(new CustomException(400, err.message));
        }
    }

    private getAllAcademies = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const academies = await this.academyService.getAcademies();
            res.json(academies);
        } catch (err) {
            next(new CustomException(400, err.message));
        }
    }

    private getAcademyById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const academyId = parseInt(req.params.id);
            const academy = await this.academyService.getAcademyById(academyId);
            res.json(academy);
        } catch (err) {
            next(new CustomException(400, err.message));
        }
    }

    private updateAcademy = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const academyId = parseInt(req.params.id);
            const academy = await this.academyService.updateAcademy(academyId, req.body);
            if (!academy) {
                return res.status(404).json({ message: "Academy not found" });
            }
            res.json(academy);
        } catch (err) {
            next(new CustomException(400, err.message));
        }
    }

    private deleteAcademy = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const academyId = parseInt(req.params.id);
            await this.academyService.deleteAcademy(academyId);
            res.status(204).end();
        } catch (err) {
            next(new CustomException(400, err.message));
        }
    }

    private validateAcademy(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required()
        });
        validateRequestBody(req, next, schema);
    }
}

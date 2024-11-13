import { NextFunction, Request, Response, Router } from "express";
import Joi, { date } from 'joi';
import BaseController from "../BaseController";
import { _validateAdminApiKey, validateRequestBody, validateRequestIdParam } from "../../middlewares/RequestValidator";
import CustomException from "../../utils/CustomException";
import { PlacementService } from "../../services/PlacementService";
import { ENGLISH_TOPIC_OPTIONS, LEVELS, LEVEL_OPTIONS, QUESTION_TYPE_OPTIONS, SUBJECTS, SUBJECT_OPTIONS } from "../../configs/constants";

export class AdminPlacementController implements BaseController{

    public baseUrl = "/admin/placement";
    public placementService: PlacementService;

    constructor() {
        this.placementService = new PlacementService();
    }

    public initializeRoutes(router: Router): void {
        router.post("/randomly-generate", _validateAdminApiKey, this._validateRandomPlacement, this.generatePlacementTest)

        router.post("/question", _validateAdminApiKey, this._validateQuestion, this.postQuestion);
        
        router.get("/english", _validateAdminApiKey, this.getPlacementHistory);

        router.get("/english/:user_id", _validateAdminApiKey, this.getEnglishPlacementHistory);

        router.delete("/:id", _validateAdminApiKey, validateRequestIdParam, this.deletePlacement);
        router.put("/:id", _validateAdminApiKey, validateRequestIdParam, this._validateUpdatePlacement, this.updatePlacement);
        router.get("/:id/statistics", _validateAdminApiKey, validateRequestIdParam, this.getPlacementStatistics);
        router.post("/:id/activate", _validateAdminApiKey, validateRequestIdParam, this.activatePlacement);
        router.post("/:id/deactivate", _validateAdminApiKey, validateRequestIdParam, this.deactivatePlacement);


    }

    private getPlacementHistory = async(req: Request, res: Response, next: NextFunction)=>{
        try {
            const data = await this.placementService.getEnglishResponse();
            res.json(data);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    private getEnglishPlacementHistory = async(req: Request, res: Response, next: NextFunction)=>{
        try {
            const { user_id } = req.params;
            
            const testHistory = await this.placementService.getEnglishPlacementHistory(user_id);

            res.json(testHistory);
        } catch (error) {
            next(error);
        }
    }

    private generatePlacementTest = async (req: Request, res: Response, next: NextFunction) => {
        try {
            if (req.body.subject === SUBJECTS.ENGLISH) {
                const result = await this.placementService.generateEnglishPlacementTest(req.body)
                return res.json(result);
            }
            throw new CustomException(400, "Subject error. Currently should only be \"ENGLISH\".")

        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private postQuestion = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.placementService.createQuestion(req.body)

            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }
    private updatePlacement = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this.placementService.updatePlacement(+id, req.body);
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private deletePlacement = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this.placementService.deletePlacement(+id);
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }
    
    private getPlacementStatistics = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this.placementService.getPlacementStatistics(+id);
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }
    
    private activatePlacement = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this.placementService.activatePlacement(+id);
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }
    
    private deactivatePlacement = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this.placementService.deactivatePlacement(+id);
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }
    
    private _validateQuestion(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            type: Joi.string().required().valid(...QUESTION_TYPE_OPTIONS),
            levels: Joi.array().items(Joi.string().required().valid(...LEVEL_OPTIONS)).required(),
            subject: Joi.string().required().valid(...SUBJECT_OPTIONS),
            text: Joi.string().required(),
            answer: Joi.string().required(),
            choices: Joi.array().items(Joi.string().required()).required(),
            topic: Joi.string().when(
               'subject', { is: SUBJECTS.ENGLISH, then: Joi.string().required().valid(...ENGLISH_TOPIC_OPTIONS), otherwise: Joi.optional() }
            )
        });
        validateRequestBody(req, next, schema);
    }
    
    private _validateRandomPlacement(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            level: Joi.string().required().valid(...LEVEL_OPTIONS),
            subject: Joi.string().required().valid(...SUBJECT_OPTIONS),
            title: Joi.string().required(),
            description: Joi.string().required(),
            duration: Joi.number().required() // in seconds
        });
        validateRequestBody(req, next, schema);
    }

    private _validateUpdatePlacement(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            title: Joi.string(),
            description: Joi.string(),
            duration: Joi.number(),
            is_active: Joi.boolean()
        });
        validateRequestBody(req, next, schema);
    }
}
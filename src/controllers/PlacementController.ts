import { NextFunction, Request, Response, Router } from "express";
import Joi from 'joi';
import BaseController from "./BaseController";
import { validateRequestBody, validateRequestIdParam } from "../middlewares/RequestValidator";
import CustomException from "../utils/CustomException";
import { PlacementService } from "../services/PlacementService";
import { checkJwt, decodeJwt } from "../middlewares/AuthValidator";
import RequestWithUser from "../dto/RequestWithUser";


export class PlacementController implements BaseController{

  public baseUrl = "/api/placement";
  private placementService: PlacementService;

  constructor() {
    this.placementService = new PlacementService();
  }

  public initializeRoutes(router: Router): void {
    router.get("/english", checkJwt, decodeJwt, this.getPlacementsEnglish);
    
    router.get("/english/:id/abstract", checkJwt, decodeJwt, validateRequestIdParam, this.getPlacementAbstractEnglish);
    router.get("/english/:id/full", checkJwt, decodeJwt, validateRequestIdParam, this.getPlacementFullEnglish);

    router.get("/english/history", checkJwt, decodeJwt, this.getEnglishPlacementHistory);
    router.get("/english/history/:id", checkJwt, decodeJwt, validateRequestIdParam, this.getEnglishPlacementHistoryDetails);

    router.post("/english/:id/start", checkJwt, decodeJwt, validateRequestIdParam, this.postStartPlacement);
    router.post("/english/test/:id/question-response", checkJwt, decodeJwt, validateRequestIdParam, this._validateQuestionResponse, this.postSubmitQuestionResponse);
    router.post("/english/test/:id/finish", checkJwt, decodeJwt, validateRequestIdParam, this.postFinishPlacement);
  }

  private postSubmitQuestionResponse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as RequestWithUser).auth0Id;
        const { id } = req.params;
        const data = req.body
        const result = await this.placementService.submitQuestionResponse(
          userId, 
          +id,
          +data.question_id,
          data.response
        )
        return res.json(result);
    } catch (err) {
        return next(new CustomException(400, err.message));
    }
  }

  private postFinishPlacement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as RequestWithUser).auth0Id;
        const { id } = req.params;
        const result = await this.placementService.finishPlacementEnglish(userId, +id)
        return res.json(result);
    } catch (err) {
        return next(new CustomException(400, err.message));
    }
  }

  private postStartPlacement = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as RequestWithUser).auth0Id;
        const { id } = req.params;
        const result = await this.placementService.startPlacementEnglish(userId, +id)
        return res.json(result);
    } catch (err) {
        return next(new CustomException(400, err.message));
    }
  }

  private getPlacementAbstractEnglish = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await this.placementService.getPlacementEnglish(+id, false)
        return res.json(result);
    } catch (err) {
        return next(new CustomException(400, err.message));
    }
  }

  private getPlacementFullEnglish = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await this.placementService.getPlacementEnglish(+id, true)
        return res.json(result);
    } catch (err) {
        return next(new CustomException(400, err.message));
    }
  }

  private getPlacementsEnglish = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await this.placementService.getPlacementsEnglish()
        return res.json(result);
    } catch (err) {
        return next(new CustomException(400, err.message));
    }
  }

  private getEnglishPlacementHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as RequestWithUser).auth0Id;
      const result = await this.placementService.getEnglishPlacementHistory(userId);
      return res.json(result);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }

  private getEnglishPlacementHistoryDetails = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as RequestWithUser).auth0Id;
        const { id } = req.params;
        const result = await this.placementService.getEnglishPlacementHistoryDetails(userId, +id);
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

  private _validateUpdateQuestionResponse(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        response: Joi.string().required()
    });
    validateRequestBody(req, next, schema);
  }
}
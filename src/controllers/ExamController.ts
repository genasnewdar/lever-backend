import { NextFunction, Request, Response, Router } from "express";
import Joi from 'joi';
import BaseController from "./BaseController";
import { validateRequestBody, validateRequestIdParam } from "../middlewares/RequestValidator";
import CustomException from "../utils/CustomException";
import { ExamService } from "../services/ExamService";
import { checkJwt, decodeJwt } from "../middlewares/AuthValidator";
import RequestWithUser from "../dto/RequestWithUser";

export class ExamController implements BaseController{

  public baseUrl = "/api/exam";
  private examService: ExamService;

  constructor() {
    this.examService = new ExamService();
  }

  public initializeRoutes(router: Router): void {
    router.get("", checkJwt, decodeJwt, this.getExams);
    router.get("/:id", checkJwt, decodeJwt, validateRequestIdParam, this.getExam);

    router.get("/:id/listeningResponse", checkJwt, decodeJwt, validateRequestIdParam, this.getListeningResponse);
    router.get("/:id/readingResponse", checkJwt, decodeJwt, validateRequestIdParam, this.getReadingResponse);
    router.get("/:id/writingResponse", checkJwt, decodeJwt, validateRequestIdParam, this.getWritingResponse);
    router.get("/:id/speakingResponse", checkJwt, decodeJwt, validateRequestIdParam, this.getSpeakingResponse);
    router.get("/:id/ieltsResponse", checkJwt, decodeJwt, validateRequestIdParam, /*this.getIeltsResponse*/);
    router.get("/:id/")


    router.post("/ielts/:id/start/", checkJwt, decodeJwt, validateRequestIdParam, this.startIeltsExam);
    router.post("/ielts/:id/finish", checkJwt, decodeJwt, validateRequestIdParam, this.finishIeltsExam);
    router.post("/ielts/:id/listening", checkJwt, decodeJwt, validateRequestIdParam, this._validateListeningResponse, this.postSubmitListeningResponse);
    router.post("/ielts/:id/reading", checkJwt, decodeJwt, validateRequestIdParam, this._validateReadingResponse, this.postSubmitReadingResponse);
    router.post("/ielts/:id/writing", checkJwt, decodeJwt, validateRequestIdParam, this.postSubmitWritingResponse);
    router.post("/ielts/:id/speaking", checkJwt, decodeJwt, validateRequestIdParam, /*this.validateSpeakingResponse*/ this.postSubmitSpeakingResponse);
  }

  private getExam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await this.examService.getExam(+id)
        return res.json(result);
    } catch (err) {
        return next(new CustomException(400, err.message));
    }
  }

  private getExams = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await this.examService.getExams()
        return res.json(result);
    } catch (err) {
        return next(new CustomException(400, err.message));
    }
  }

  private getListeningResponse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await this.examService.getListeningResponse(+id);
        return res.json(result);
    } catch (err) {
        return next(new CustomException(400, err.message));
    }
}

private getReadingResponse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await this.examService.getReadingResponse(+id);
        return res.json(result);
    } catch (err) {
        return next(new CustomException(400, err.message));
    }
}

private getWritingResponse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await this.examService.getWritingResponse(+id);
        return res.json(result);
    } catch (err) {
        return next(new CustomException(400, err.message));
    }
}

private getSpeakingResponse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await this.examService.getSpeakingResponse(+id);
        return res.json(result);
    } catch (err) {
        return next(new CustomException(400, err.message));
    }
}

  private startIeltsExam = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const auth0_id = (req as RequestWithUser).auth0Id;
        const result = await this.examService.startIELTSExam(auth0_id, +id);
        return res.json(result);
    } catch (err) {
        return next(new CustomException(400, err.message));
    }
  }

  private postSubmitListeningResponse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as RequestWithUser).auth0Id;
      const { id } = req.params;
      const data = req.body;

      const result = await this.examService.submitListeningResponse(
          userId,
          +id,
          data
      );
        
      return res.json(result);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }

  private postSubmitReadingResponse = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = (req as RequestWithUser).auth0Id;
        const { id } = req.params;
        const data = req.body;
        
        const result = await this.examService.submitReadingResponse(
            userId,
            +id,
            data
        );

        return res.json(result);
    } catch (err) {
        return next(new CustomException(400, err.message));
    }
  }

  private postSubmitWritingResponse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as RequestWithUser).auth0Id;
      const { id } = req.params;
      const data = req.body;

      const result = await this.examService.submitWritingResponse(
          userId,
          +id,
          data
      );
        
      return res.json(result);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }

  private postSubmitSpeakingResponse = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = (req as RequestWithUser).auth0Id;
      const { id } = req.params;
      const data = req.body;

      const result = await this.examService.submitSpeakingResponse(
          userId,
          +id,
          data
      );
        
      return res.json(result);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }



  private finishIeltsExam = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const auth0_id = (req as RequestWithUser).auth0Id;
      const result = await this.examService.finishIELTSExam(auth0_id, +id);
      return res.json(result);
    } catch (err) {
      return next(new CustomException(400, err.message));
    }
  }
  private _validateListeningResponse(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      a1: Joi.string(),
      a2: Joi.string(),
      a3: Joi.string(),
      a4: Joi.string(),
      a5: Joi.string(),
      a6: Joi.string(),
      a7: Joi.string(),
      a8: Joi.string(),
      a9: Joi.string(),
      a10: Joi.string(),
      a11: Joi.string(),
      a12: Joi.string(),
      a13: Joi.string(),
      a14: Joi.string(),
      a15: Joi.string(),
      a16: Joi.string(),
      a17: Joi.string(),
      a18: Joi.string(),
      a19: Joi.string(),
      a20: Joi.string(),
      a21: Joi.string(),
      a22: Joi.string(),
      a23: Joi.string(),
      a24: Joi.string(),
      a25: Joi.string(),
      a26: Joi.string(),
      a27: Joi.string(),
      a28: Joi.string(),
      a29: Joi.string(),
      a30: Joi.string(),
      a31: Joi.string(),
      a32: Joi.string(),
      a33: Joi.string(),
      a34: Joi.string(),
      a35: Joi.string(),
      a36: Joi.string(),
      a37: Joi.string(),
      a38: Joi.string(),
      a39: Joi.string(),
      a40: Joi.string()
    });
    validateRequestBody(req, next, schema);
  }
  private _validateReadingResponse(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
      a1: Joi.string(),
      a2: Joi.string(),
      a3: Joi.string(),
      a4: Joi.string(),
      a5: Joi.string(),
      a6: Joi.string(),
      a7: Joi.string(),
      a8: Joi.string(),
      a9: Joi.string(),
      a10: Joi.string(),
      a11: Joi.string(),
      a12: Joi.string(),
      a13: Joi.string(),
      a14: Joi.string(),
      a15: Joi.string(),
      a16: Joi.string(),
      a17: Joi.string(),
      a18: Joi.string(),
      a19: Joi.string(),
      a20: Joi.string(),
      a21: Joi.string(),
      a22: Joi.string(),
      a23: Joi.string(),
      a24: Joi.string(),
      a25: Joi.string(),
      a26: Joi.string(),
      a27: Joi.string(),
      a28: Joi.string(),
      a29: Joi.string(),
      a30: Joi.string(),
      a31: Joi.string(),
      a32: Joi.string(),
      a33: Joi.string(),
      a34: Joi.string(),
      a35: Joi.string(),
      a36: Joi.string(),
      a37: Joi.string(),
      a38: Joi.string(),
      a39: Joi.string(),
      a40: Joi.string()
    });
    validateRequestBody(req, next, schema);
  }
}
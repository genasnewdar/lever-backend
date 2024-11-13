import { NextFunction, Request, Response, Router } from "express";
import Joi, { date } from 'joi';
import BaseController from "../BaseController";
import { _validateAdminApiKey, validateRequestBody, validateRequestHeader, validateRequestIdParam } from "../../middlewares/RequestValidator";
import CustomException from "../../utils/CustomException";
import { ExamService } from "../../services/ExamService";
import { ADMIN_API_KEY, ENGLISH_TOPIC_OPTIONS, LEVEL_OPTIONS, QUESTION_TYPE_OPTIONS, SUBJECTS, SUBJECT_OPTIONS } from "../../configs/constants";


export class AdminExamController implements BaseController{

    public baseUrl = "/admin/exam";
    public examService: ExamService;

    constructor() {
        this.examService = new ExamService();
    }

    public initializeRoutes(router: Router): void {
        router.post("",  _validateAdminApiKey, this._validateExam, this.postExam);

        // listening
        router.post("/:id/listening", _validateAdminApiKey, validateRequestIdParam, this._validateExamListening, this.postExamListening);
        router.post("/listening/:id/answer", _validateAdminApiKey, validateRequestIdParam, this._validateExamListeningAnswer, this.postExamListeningAnswer);
        
        // reading
        router.post("/:id/reading", _validateAdminApiKey, validateRequestIdParam, this._validateExamReading, this.postExamReading);
        router.post("/reading/:id/answer", _validateAdminApiKey, validateRequestIdParam, this._validateExamReadingAnswer, this.postExamReadingAnswer);

        // writing
        router.post("/:id/writing", _validateAdminApiKey, validateRequestIdParam, this._validateExamWriting, this.postExamWriting);

        // speaking
        router.post("/:id/speaking", _validateAdminApiKey, validateRequestIdParam, this._validateExamSpeaking, this.postExamSpeaking);

        // questions
        router.post("/general", _validateAdminApiKey, this._validateGeneralExam, this.postGeneralExam);
        router.post("/general/:id/d-block", _validateAdminApiKey, this._validateGeneralExamDBlock, this.postGeneralExamDBlocks)
        router.post("/general/:id/question", _validateAdminApiKey, this._validateQuestion, this.postGeneralQuestion);

    }

    private postGeneralExam = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.examService.createGeneralExam(req.body)
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private postGeneralExamDBlocks = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this.examService.createExamDBlocks(+id, req.body)
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private postGeneralQuestion = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this.examService.createGeneralExamQuestion(+id, req.body)

            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private postExam = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.examService.createExam(req.body)
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private postExamListening = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this.examService.createExamListening(+id, req.body)
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private postExamReading = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this.examService.createExamReading(+id, req.body)
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private postExamWriting = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this.examService.createExamWriting(+id, req.body)
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private postExamSpeaking = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this.examService.createExamSpeaking(+id, req.body)
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private postExamListeningAnswer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this.examService.createExamListeningAnswer(+id, req.body)
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private postExamReadingAnswer = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const result = await this.examService.createExamReadingAnswer(+id, req.body)
            return res.json(result);
        } catch (err) {
            return next(new CustomException(400, err.message));
        }
    }

    private _validateExam(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            type: Joi.string().required().valid(
                'toefl',
                'ielts'
            ),
            description: Joi.string().required()
        });
        validateRequestBody(req, next, schema);
    }

    private _validateGeneralExam(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            level: Joi.string().required().valid(...LEVEL_OPTIONS),
            subject: Joi.string().required().valid(...SUBJECT_OPTIONS),
            title: Joi.string().required(),
            description: Joi.string().required(),
            duration: Joi.number().required() // in seconds
        });
        validateRequestBody(req, next, schema);
    }

    private _validateGeneralExamDBlock(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            description_blocks: Joi.array().items(
                Joi.object({
                    before_index: Joi.number().integer().required(),
                    html: Joi.string().required()
                })
            )
        });
        validateRequestBody(req, next, schema);
    }

    private _validateExamListening(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            page1: Joi.string().required(),
            page2: Joi.string().required(),
            page3: Joi.string().required(),
            page4: Joi.string().required()
        });
        validateRequestBody(req, next, schema);
    }

    private _validateExamReading(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            page1: Joi.string().required(),
            page2: Joi.string().required(),
            page3: Joi.string().required()
        });
        validateRequestBody(req, next, schema);
    }

    private _validateExamWriting(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            page1: Joi.string().required(),
            type1: Joi.string(),
            link1: Joi.string(),
            page2: Joi.string().required(),
            type2: Joi.string(),
            link2: Joi.string()
        });
        validateRequestBody(req, next, schema);
    }

    private _validateExamSpeaking(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            page1_1: Joi.string().required(),
            page1_1_link: Joi.string().required(),
            page1_2: Joi.string().required(),
            page1_2_link: Joi.string().required(),
            page1_3: Joi.string().required(),
            page1_3_link: Joi.string().required(),

            page1_4: Joi.string(),
            page1_4_link: Joi.string(),
            page1_5: Joi.string(),
            page1_5_link: Joi.string(),
            page1_6: Joi.string(),
            page1_6_link: Joi.string(),
            
            page2: Joi.string().required(),

            page3_1: Joi.string().required(),
            page3_1_link: Joi.string().required(),
            page3_2: Joi.string().required(),
            page3_2_link: Joi.string().required(),
            page3_3: Joi.string().required(),
            page3_3_link: Joi.string().required(),

            page3_4: Joi.string(),
            page3_4_link: Joi.string(),
            page3_5: Joi.string(),
            page3_5_link: Joi.string(),
            page3_6: Joi.string(),
            page3_6_link: Joi.string(),

        });
        validateRequestBody(req, next, schema);
    }

    private _validateExamListeningAnswer(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            "a1" : Joi.string().required(),
            "a2" : Joi.string().required(),
            "a3" : Joi.string().required(),
            "a4" : Joi.string().required(),
            "a5" : Joi.string().required(),
            "a6" : Joi.string().required(),
            "a7" : Joi.string().required(),
            "a8" : Joi.string().required(),
            "a9" : Joi.string().required(),
            "a10": Joi.string().required(),
            "a11": Joi.string().required(),
            "a12": Joi.string().required(),
            "a13": Joi.string().required(),
            "a14": Joi.string().required(),
            "a15": Joi.string().required(),
            "a16": Joi.string().required(),
            "a17": Joi.string().required(),
            "a18": Joi.string().required(),
            "a19": Joi.string().required(),
            "a20": Joi.string().required(),
            "a21": Joi.string().required(),
            "a22": Joi.string().required(),
            "a23": Joi.string().required(),
            "a24": Joi.string().required(),
            "a25": Joi.string().required(),
            "a26": Joi.string().required(),
            "a27": Joi.string().required(),
            "a28": Joi.string().required(),
            "a29": Joi.string().required(),
            "a30": Joi.string().required(),
            "a31": Joi.string().required(),
            "a32": Joi.string().required(),
            "a33": Joi.string().required(),
            "a34": Joi.string().required(),
            "a35": Joi.string().required(),
            "a36": Joi.string().required(),
            "a37": Joi.string().required(),
            "a38": Joi.string().required(),
            "a39": Joi.string().required(),
            "a40": Joi.string().required(),
        });
        validateRequestBody(req, next, schema);
    }

    private _validateExamReadingAnswer(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            "a1" : Joi.string().required(),
            "a2" : Joi.string().required(),
            "a3" : Joi.string().required(),
            "a4" : Joi.string().required(),
            "a5" : Joi.string().required(),
            "a6" : Joi.string().required(),
            "a7" : Joi.string().required(),
            "a8" : Joi.string().required(),
            "a9" : Joi.string().required(),
            "a10": Joi.string().required(),
            "a11": Joi.string().required(),
            "a12": Joi.string().required(),
            "a13": Joi.string().required(),
            "a14": Joi.string().required(),
            "a15": Joi.string().required(),
            "a16": Joi.string().required(),
            "a17": Joi.string().required(),
            "a18": Joi.string().required(),
            "a19": Joi.string().required(),
            "a20": Joi.string().required(),
            "a21": Joi.string().required(),
            "a22": Joi.string().required(),
            "a23": Joi.string().required(),
            "a24": Joi.string().required(),
            "a25": Joi.string().required(),
            "a26": Joi.string().required(),
            "a27": Joi.string().required(),
            "a28": Joi.string().required(),
            "a29": Joi.string().required(),
            "a30": Joi.string().required(),
            "a31": Joi.string().required(),
            "a32": Joi.string().required(),
            "a33": Joi.string().required(),
            "a34": Joi.string().required(),
            "a35": Joi.string().required(),
            "a36": Joi.string().required(),
            "a37": Joi.string().required(),
            "a38": Joi.string().required(),
            "a39": Joi.string().required(),
            "a40": Joi.string().required(),
        });
        validateRequestBody(req, next, schema);
    }

    private _validateQuestion(req: Request, res: Response, next: NextFunction) {
        const schema = Joi.object({
            type: Joi.string().required().valid(...QUESTION_TYPE_OPTIONS),
            levels: Joi.array().items(Joi.string().required().valid(...LEVEL_OPTIONS)).required(),
            subject: Joi.string().required().valid(...SUBJECT_OPTIONS),
            topic: Joi.string().when(
                'subject', { is: SUBJECTS.ENGLISH, then: Joi.string().required().valid(...ENGLISH_TOPIC_OPTIONS), otherwise: Joi.optional() }
            ),
            index: Joi.number().integer().required(),
            index_to_show: Joi.string(),
            

            text: Joi.string(),
            answer: Joi.string(),
            choices: Joi.array().items(Joi.string().required()),

            combination_keys: Joi.array().items(Joi.string().required()),
            combination_values: Joi.array().items(Joi.string().required()),
            combination_answers: Joi.array().items(Joi.string().required())
        });
        validateRequestBody(req, next, schema);
    }
}
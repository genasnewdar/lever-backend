import { Request, Response, Router } from "express";
import BaseController from "./BaseController";
import { checkJwt, decodeJwt } from "../middlewares/AuthValidator";

export class HealthController implements BaseController {

    public baseUrl = "/api/health";

    constructor() {
    }

    public initializeRoutes(router: Router) {
        router.get("", checkJwt, decodeJwt, this.health);
        router.get("/test", checkJwt, decodeJwt, this.healthTest);
    }

    private health = (request: Request, response: Response) => {
        const data = {
            status: 'OK',
            uptime: process.uptime(),
            message: 'Ok',
            date: new Date()
        };
        return response.status(200).send(data);
    }

    private healthTest = (request: Request, response: Response) => {
        const data = {
            status: 'OK',
            uptime: process.uptime(),
            message: 'Ok this is api health test',
            date: new Date()
        };
        return response.status(200).send(data);
    }
    
}
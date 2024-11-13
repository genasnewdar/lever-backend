import { Router } from "express";

interface BaseController {
    baseUrl: string;
    initializeRoutes(router: Router): void;
}

export default BaseController;
import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "express-oauth2-jwt-bearer";
import CustomException from "../utils/CustomException";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err) {
        console.error(err);
        const status = 400;
        const message = err.message ? err.message : 'Something went wrong.';
        res.status(status)
            .send({
                status,
                message,
            });
    } else {
        next();
    }        
}
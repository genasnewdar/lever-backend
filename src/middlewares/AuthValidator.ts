import { NextFunction, Request, Response } from "express";
import jsonWebToken from "jsonwebtoken";
import CustomException from "../utils/CustomException";
// import { UserService } from "../services/UserService";
import RequestWithUser from "../dto/RequestWithUser";
import { auth, claimCheck } from 'express-oauth2-jwt-bearer';
import config from "../configs/config";

export const checkJwt = (request: Request, response: Response, next: NextFunction) => auth({
    audience: config.auth0.auth0Audience,
    issuerBaseURL: config.auth0.auth0Domain
})(request, response, next);

export const decodeJwt = (request: Request, response: Response, next: NextFunction) => {
    if (request.headers && request.headers.authorization) {
        const token: string = request.headers.authorization.split(" ")[1];
        const user: any = jsonWebToken.decode(token);
        (request as RequestWithUser).auth0Id = user.sub;
        (request as RequestWithUser).auth0Token = token;
        next();
    } else {
        next(new CustomException(400, "invalid request"));
    }
}
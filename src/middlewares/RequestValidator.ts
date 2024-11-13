import { NextFunction, Request, Response } from "express";
import Joi, { Schema } from "joi";
import CustomException from "../utils/CustomException";
import { ADMIN_API_KEY } from "../configs/constants";

export function validateRequestBody(req: Request, next: NextFunction, schema: Schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.body, options);
    if (error) {
        next(new CustomException(400, `Validation error: ${error.details.map(x => x.message).join(', ')}`));
    } else {
        next();
    }
}

export function validateRequestQuery(req: Request, next: NextFunction, schema: Schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.query, options);
    if (error) {
        next(new CustomException(400, `Validation error: ${error.details.map(x => x.message).join(', ')}`));
    } else {
        next();
    }
}

export function validateRequestParam(req: Request, next: NextFunction, schema: Schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.params, options);
    if (error) {
        next(new CustomException(400, `Validation error: ${error.details.map(x => x.message).join(', ')}`));
    } else {
        next();
    }
}

export function _validateAdminApiKey(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        "x-api-key": Joi.string().required().equal(ADMIN_API_KEY).messages({ "any.only": "Invalid key", "any.required": "Invalid key" })
    });
    validateRequestHeader(req, next, schema);
}

export function validateRequestHeader(req: Request, next: NextFunction, schema: Schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.headers, options);
    if (error) {
        next(new CustomException(400, `Validation error: ${error.details.map(x => x.message).join(', ')}`));
    } else {
        next();
    }
}

export function validateRequestCookie(req: Request, next: NextFunction, schema: Schema) {
    const options = {
        abortEarly: false, // include all errors
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };
    const { error, value } = schema.validate(req.cookies, options);
    if (error) {
        next(new CustomException(400, `Validation error: ${error.details.map(x => x.message).join(', ')}`));
    } else {
        next();
    }
}

export function validateRequestIdParam(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        id: Joi.number().required()
    });
    validateRequestParam(req, next, schema);
}

export function validateRequestStringIdParam(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        id: Joi.string()
    });
    validateRequestParam(req, next, schema);
}

export function validateRequestUuidParam(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        id: Joi.string().uuid()
    });
    validateRequestParam(req, next, schema);
}
import { NextFunction, Request, Response, Router } from "express";
import Joi, { string } from 'joi';
import BaseController from "./BaseController";
import { validateRequestBody, validateRequestHeader } from "../middlewares/RequestValidator";
import CustomException from "../utils/CustomException";
import { UserService} from "../services/UserService";
import config from "../configs/config";
import { checkJwt, decodeJwt } from "../middlewares/AuthValidator";
import prisma from "../client";
import RequestWithUser from "../dto/RequestWithUser";

export class UserController implements BaseController{

  public baseUrl = "/api/user";
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public initializeRoutes(router: Router): void {
    router.get("", checkJwt, decodeJwt, this.getByAuth0Id);
    router.post("/login-hook", this._validateAuth0HookHeader, this.login);
  }

  private getByAuth0Id = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const {auth0Id} = request as RequestWithUser;
      let user = await this.userService.getByAuth0Id(auth0Id);
      response.json({user});
    }catch (error) {
      console.log(error);
      next(error);
    }
  }

  private login = async (request: Request, response: Response, next: NextFunction) => {
    try {
      let user = await this.userService.getByAuth0Id(request.body.user_id);

      if (!user) {
        user = await this.userService.registerUser(
          request.body.user_id,
          request.body.email,
          request.body.first_name,
          request.body.last_name,
          request.body.picture
        );
      }

      if (user.is_deleted) return next(new CustomException(401, "Invalid user"));
      response.json({ status: "success" });
    } catch (e: any) {
      next(e);
    }
  }

  private _validateAuth0HookHeader(req: Request, res: Response, next: NextFunction) {
    const schema = Joi.object({
        "x-api-key": Joi.string().required().equal(config.auth0.auth0ApiKey).messages({ "any.only": "Invalid key", "any.required": "Invalid key" })
    });
    validateRequestHeader(req, next, schema);
  }
}
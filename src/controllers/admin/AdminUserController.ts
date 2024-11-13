import { NextFunction, Request, Response, Router } from "express";
import BaseController from "../BaseController";
import { UserService } from "../../services/UserService";
import { validateRequestHeader, _validateAdminApiKey} from "../../middlewares/RequestValidator";


export class AdminUserController implements BaseController {

  public baseUrl = "/admin/user";
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public initializeRoutes(router: Router): void {
    router.get("",  _validateAdminApiKey, this.getAllUsers);
    router.get("/:id", _validateAdminApiKey, this.getUserById);
  }

  private getAllUsers = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getUserList();
      response.json(users);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  private getUserById = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const userId = request.params.id;
      const user = await this.userService.getByAuth0Id(userId);
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }
      response.json(user);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

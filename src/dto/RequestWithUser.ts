import { User } from "@prisma/client";
import { Request } from "express";

export default interface RequestWithUser extends Request {
    user: User;
    auth0Id: string;
    auth0Token: string;
}
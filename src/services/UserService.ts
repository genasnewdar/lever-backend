import prisma from "../client";
import { randomUUID } from "crypto";
import CustomException from "../utils/CustomException";


export class UserService {

    constructor() {
    }

    public getByAuth0Id = async (id: string) => {
        const user = await prisma.user.findUnique({
            where: {
                auth0_id: id
            }
        });
        return user;
    }

    public registerUser = async (
        id: string, 
        email: string, 
        firstName: string, 
        lastName: string, 
        picture: string
    ) => {
        const user = await this.createUser(
            id, 
            email, 
            firstName, 
            lastName, 
            picture
        );
        return user;
    }

    public createUser = async (
        id: string, 
        email: string, 
        firstName: string, 
        lastName: string, 
        picture: string
    ) => {
        try {
            const user = await prisma.user.create({
                data: {
                    auth0_id: id,
                    email: email,
                    full_name: `${firstName} ${lastName}`,
                    picture: picture
                }
            });
            return user;
        } catch (ex) {
            throw ex;
        }
    }
    public getUserList = async () => {
        try {
            const users = await prisma.user.findMany();
            return users;
        }catch (ex) {
            throw ex;
        }
    }
}

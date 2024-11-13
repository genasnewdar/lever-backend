import prisma from "../client";
import CustomException from "../utils/CustomException";

export class AcademyService {
    constructor() {}

    public createAcademy = async(name: string, description: string, rating: number) => {
        try {
            const academy = await prisma.ieltsAcademy.create({
                data: {
                    name,
                    description,
                    rating
                }
            });
            return academy;
        } catch (error) {
            throw new CustomException(500, `Error creating academy: ${error.message}`);
        }
    }

    public  getAcademies = async() => {
        try {
            const academies = await prisma.ieltsAcademy.findMany();
            return academies;
        } catch (error) {
            throw new CustomException(500, `Error retrieving academies: ${error.message}`);
        }
    }

    public getAcademyById = async(id: number) => {
        try {
            const academy = await prisma.ieltsAcademy.findUnique({
                where: {
                    id
                }
            });
            if(!academy){
                throw new CustomException(404, `Academy not found`);
            }
            return academy;
        } catch (error) {
            if (error instanceof CustomException) {
                throw error;
            } else {
                throw new CustomException(500, `Error updating academy with ID ${id}: ${error.message}`);
            }
        }
    }

    public updateAcademy = async (id: number, data: { description?: string; rating?: number }) => {
        try {
            const existingAcademy = await prisma.ieltsAcademy.findUnique({
                where: { id },
            });
            if (!existingAcademy) {
                throw new CustomException(404, `Academy not found`);
            }
            const academy = await prisma.ieltsAcademy.update({
                where: { id },
                data: { ...data },
            });
            return academy;
        } catch (error) {
            if (error instanceof CustomException) {
                throw error;
            } else {
                throw new CustomException(500, `Error updating academy with ID ${id}: ${error.message}`);
            }
        }   
    }
    

    public deleteAcademy = async(id: number) => {
        try {
            const existingAcademy = await prisma.ieltsAcademy.findUnique({
                where: { id },
            });
            if (!existingAcademy) {
                throw new CustomException(404, `Academy not found`);
            }
            await prisma.ieltsAcademy.delete({
                where: {
                    id
                }
            });
        } catch (e) {
            if (e instanceof CustomException) {
                throw e;
            } else {
                throw new CustomException(500, `Error updating academy with ID ${id}: ${e.message}`);
            }
        }
    }
}

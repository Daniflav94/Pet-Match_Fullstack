import { Request, Response } from "express";
import { Admin, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

interface Req extends Request {
    user?: User | Admin | null;
  }

export const registerPet = async(req: Req, res: Response) => {
    const data = req.body;
    const photo = req.file?.filename;

    const idAdmin = req.user?.id;

    const newPet = await prisma.pet.create({
        data: {
            ...data,
            photo,
            organizationId: idAdmin
        }
    })

    if (!newPet) {
        res
          .status(500)
          .json({ errors: ["Houve um erro, tente novamente mais tarde."] });
        return;
      }

      res.status(201).json({
        data: newPet
      });
}
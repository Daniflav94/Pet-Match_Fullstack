import { Admin, PrismaClient, User } from "@prisma/client";
import { Request, Response } from "express";

interface Req extends Request {
  user?: User | Admin | null;
}

const prisma = new PrismaClient();

export const getCurrentUser = async (req: Req, res: Response) => {
  const user = req.user;

  res.status(200).json({
    data: user,
  });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;
  const photo = req.file?.filename;
    console.log(data)
  if (data.type === "user") {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      res.status(500).json({ errors: ["Usuário não encontrado."] });
      return;
    }

    const update = await prisma.user.update({
      where: { id },
      data: { ...data },
    });

    res.status(201).json({
      data: update,
    });
  }else {
    const admin = await prisma.admin.findUnique({ where: { id } });
    if (!admin) {
      res.status(500).json({ errors: ["Usuário não encontrado."] });
      return;
    }

    const update = await prisma.admin.update({
      where: { id },
      data: photo ? { ...data, photo: photo as string} : { ...data},
    });

    res.status(201).json({
      data: update,
    });
  }
};

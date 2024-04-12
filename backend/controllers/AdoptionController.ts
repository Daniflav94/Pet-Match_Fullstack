import { Request, Response } from "express";
import { Admin, PrismaClient, User } from "@prisma/client";
import { createNotification } from "./NotificationsController";

const prisma = new PrismaClient();

interface Req extends Request {
  user?: User | Admin | null;
}

export const registerFormAdoption = async (req: Req, res: Response) => {
  const data = req.body;

  const idUser = req.user?.id;

  const newFormAdoption = await prisma.formAdoption.create({
    data: {
      liveIn: data.liveIn,
      children: data.children,
      isFirstPet: data.isFirstPet,
      pets: data.pets,
      describePets: data.describePets,
      petId: data.petId,
      userId: idUser as string,
    },
  });

  if (!newFormAdoption) {
    res
      .status(500)
      .json({ errors: ["Houve um erro, tente novamente mais tarde."] });
    return;
  }

  const findPet = await prisma.pet.findUnique({ where: { id: data.petId } });

  await prisma.notifications.create({
    data: {
      idReceiver: findPet?.organizationId as string,
      type: "request_adoption",
      formAdoptionId: newFormAdoption.id,
    },
  });

  res.status(201).json({
    data: newFormAdoption,
  });
};

export const getFormsAdoptionUser = async (req: Req, res: Response) => {
  const userId = req.user?.id;

  const formsAdoption = await prisma.formAdoption.findMany({
    where: { userId },
    include: { pet: { include: { organization: true }} },
  });

  res.status(201).json({
    data: formsAdoption,
  });
};

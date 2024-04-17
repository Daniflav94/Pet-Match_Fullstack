import { Request, Response } from "express";
import { Admin, Notifications, PrismaClient, User } from "@prisma/client";
import { sendEmailAdoption } from "./MailController";

const prisma = new PrismaClient();

interface Req extends Request {
  user?: User | Admin | null;
}

export const createNotification = async (req: Request, res: Response) => {
  const data = req.body;

  const newNotification = await prisma.notifications.create({
    data: {
      idReceiver: data.idReceiver as string,
      type: data.type as string,
      formAdoptionId: data.formAdoptionId as string,
      wasApproved: data.wasApproved,
      message: data.message
    },
  });

  sendEmailAdoption(data.mailTo, data.type)

  if (!newNotification) {
    return new Error(
      "Houve um erro ao gerar notificação. Tente novamente mais tarde"
    );
  }

  res.status(201).json({
    data: newNotification,
  });
};

export const getNotifications = async (req: Req, res: Response) => {
  const idUser = req.user?.id;

  const notifications = await prisma.notifications.findMany({
    where: { idReceiver: idUser },
    include: {
      formAdoption: {
        include: { user: true, pet: { include: { organization: true }}},
      },
    },
    orderBy: {createdAt: "asc"}
  });

  res.status(201).json({
    data: notifications,
  });
};

export const updateNotification = async (req: Req, res: Response) => {
  const { id } = req.params;
  const idUser = req.user?.id;
  const data = req.body;

  const notification = await prisma.notifications.findUnique({
    where: { idReceiver: idUser, id },
  });

  if (!notification) {
    res.status(400).json({ errors: ["Notificação não encontrada."] });
  }

  let editNotification;

  if (data.isViewed === true) {
    editNotification = {
      isViewed: true,
    };
  }

  if (data.wasApproved === true) {
    editNotification = {
      wasApproved: true,
    };
  } else if (data.wasApproved === false) {
    editNotification = {
      wasApproved: false,
      message: data.message,
    };
  }

  const update = await prisma.notifications.update({
    where: { id },
    data: {
      ...editNotification,
    },
  });

  if (!update) {
    res
      .status(500)
      .json({ errors: ["Ocorreu um erro ao atualizar notificação."] });
  }

  res.status(201).json({
    data: update,
  });
};

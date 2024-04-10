import { Request, Response } from "express";
import { Admin, Notifications, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

interface Req extends Request {
  user?: User | Admin | null;
}

export const createNotification = async (
  notification: Partial<Notifications>
) => {
  const newNotification = await prisma.notifications.create({
    data: {
      idReceiver: notification.idReceiver as string,
      type: notification.type as string,
      formAdoptionId: notification.formAdoptionId as string,
    },
  });

  if (!newNotification) {
    return new Error(
      "Houve um erro ao gerar notificação. Tente novamente mais tarde"
    );
  }

  return newNotification;
};

export const getNotifications = async (req: Req, res: Response) => {
  const idUser = req.user?.id;

  const notifications = await prisma.notifications.findMany({
    where: { idReceiver: idUser },
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

  if (data.isViewed) {
    editNotification = {
      isViewed: data.isViewed,
    };
  }

  if (data.wasApproved) {
    editNotification = {
      wasApproved: data.wasApproved,
    };
  }

  const update = await prisma.notifications.update({ where: { id }, data: {
    ...editNotification
  } });

  if(!update){
    res.status(500).json({ errors: ["Ocorreu um erro ao atualizar notificação."]})
  }

  res.status(201).json({
    data: update
  })
};

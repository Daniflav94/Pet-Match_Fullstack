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

export const getNotifications = (req: Req, res: Response) => {
    const idUser = req.user?.id;
  
    const notifications = prisma.notifications.findMany()
  }

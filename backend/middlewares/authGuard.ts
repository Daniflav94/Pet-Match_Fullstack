import jwt, { JwtPayload } from "jsonwebtoken";
import { Admin, PrismaClient, User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET as string;

interface Req extends Request {
  user?: User | Admin | null;
}

export const authGuard = async (
  req: Req,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;
  const token = (authorization ?? "").split(" ")[1];
  const cleanToken = token.replace(/"/g, '');

  if (!token) {
    return res.status(403).json({ errors: ["Acesso negado."] });
  }

  try {
    const verified = jwt.verify(cleanToken, jwtSecret);

    const user = await prisma.user.findUnique({
      where: { id: (verified as JwtPayload).id },
    });

    req.user = user;

    if (!user) {
      req.user = await prisma.admin.findUnique({
        where: { id: (verified as JwtPayload).id },
      });
    }

    next();
  } catch (error) {
    res.status(403).json({ errors: ["Token inválido."] });
  }
};

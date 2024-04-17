import { Request, Response } from "express";
import { Admin, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendEmailResetPassword } from "./MailController";

const jwtSecret = process.env.JWT_SECRET as string;

interface Req extends Request {
  user?: User | Admin | null;
}

const generateToken = (id: string) => {
  return jwt.sign({ id }, jwtSecret,);
};

const verifyUserExist = async (email: string, type?: string) => {
  if (type === "user") {
    const user = await prisma.user.findUnique({ where: { email: email } });

    return user;
  } else if (type === "admin") {
    const user = await prisma.admin.findUnique({ where: { email: email } });
    return user;
  } else {
    const user = await prisma.user.findUnique({ where: { email: email } });

    if (!user) {
      const admin = await prisma.admin.findUnique({ where: { email: email } });

      return admin;
    }

    return user;
  }
};

export const register = async (req: Request, res: Response) => {
  const data = req.body;
  const photo = req.file?.filename;

  const user = await verifyUserExist(data.email, data.type);

  if (user) {
    res.status(400).json({ errors: ["Email já cadastrado."] });
    return;
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(data.password, salt);

  let create;

  if (data.type === "user") {
    create = await prisma.user.create({
      data: {
        name: data.name,
        cpf: data.cpf,
        birthdate: new Date(data.birthdate),
        gender: data.gender,
        email: data.email,
        password: passwordHash,
        phone: data.phone,
        cep: data.cep,
        state: data.state,
        city: data.city,
        street: data.street,
        neighborhood: data.neighborhood,
        type: data.type,
      },
    });
  } else if (data.type === "admin") {
    create = await prisma.admin.create({
      data: {
        name: data.name,
        cnpj: data.cnpj,
        cellPhone: data.cellPhone,
        phone: data.phone,
        photo: photo as string,
        email: data.email,
        password: passwordHash,
        cep: data.cep,
        state: data.state,
        city: data.city,
        street: data.street,
        neighborhood: data.neighborhood,
        number: data.number,
        openingHours: data.openingHours,
        type: data.type,
      },
    });
  }

  if (!create) {
    res
      .status(500)
      .json({ errors: ["Houve um erro, tente novamente mais tarde."] });
    return;
  }

  res.status(201).json({
    data: create,
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await verifyUserExist(email);

  if (!user) {
    res.status(400).json({ errors: ["Email não cadastrado!"] });
    return;
  }

  if (!(await bcrypt.compare(password, user.password))) {
    res.status(400).json({ errors: ["Credenciais inválidas!"] });
    return;
  }

  res.status(201).json({ token: generateToken(user.id), user: user });
};

export const getCurrentUser = async (req: Req, res: Response) => {
  const user = req.user;

  res.status(200).json({
    data: user,
  });
};

export const forgetPassword = async (req: Req, res: Response) => {
  const { email } = req.body;

  const findUser = await verifyUserExist(email);

  if(!findUser){
    res.status(400).json({errors: ["Email não cadastrado."]})
    return
  }

  const code = (Math.floor(Math.random() * 900000) + 100000).toString();

  const saveCode = await prisma.codeResetPassword.create({
    data: {
      code,
      userId: findUser?.id as string
    }
  })

  if(!saveCode){
    res.status(500).json({ errors: ["Ocorreu um erro ao gerar código."]})
    return
  }

  sendEmailResetPassword(email, code);

  res.status(200).json({ userId: findUser?.id});
};

export const verifyCode = async (code: string, userId: string) => {
  const findCode = await prisma.codeResetPassword.findFirst({ where: {
    code,
    userId
  }})

  return findCode;
}

export const validateCode = async (req: Req, res: Response) => {
  const {code, userId} = req.body;

  const isValidCode = await verifyCode(code, userId);

  if(isValidCode === null){
    res.status(400).json({errors: ["Código incorreto!"]})
    return
  }

  res.status(200).json("Código válido!")
}

export const resetPassword = async (req: Req, res: Response) => {
  const {password, userId, code} = req.body;

  const isValidCode = verifyCode(code, userId);

  if(!isValidCode){
    res.status(400).json({errors: ["Código incorreto!"]})
    return
  }

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  await prisma.user.update({where: { id: userId },
    data: {
      password: passwordHash
    },})

    res.status(200).json("Senha alterada com sucesso!")

}

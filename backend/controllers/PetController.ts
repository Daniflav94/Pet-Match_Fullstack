import { Request, Response } from "express";
import { Admin, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

interface Req extends Request {
  user?: User | Admin | null;
}

interface IFilter {
  type?: string;
  size?: string;
  age?: string;
  gender?: string;
  state?: string;
  city?: string;
  ong?: string;
}

export const registerPet = async (req: Req, res: Response) => {
  const data = req.body;
  const photo = req.file?.filename;

  const idAdmin = req.user?.id;

  const newPet = await prisma.pet.create({
    data: {
      ...data,
      photo,
      organizationId: idAdmin,
    },
  });

  if (!newPet) {
    res
      .status(500)
      .json({ errors: ["Houve um erro, tente novamente mais tarde."] });
    return;
  }

  res.status(201).json({
    data: newPet,
  });
};

export const updatePet = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isAdopt } = req.body;

  const pet = await prisma.pet.findUnique({ where: { id } });

  if (!pet) {
    res.status(500).json({ errors: ["Pet não encontrado."] });
    return;
  }

  const update = await prisma.pet.update({ where: { id }, data: { isAdopt } });

  res.status(201).json({
    data: update,
  });
};

export const getAll = async (req: Request, res: Response) => {
  const pets = await prisma.pet.findMany({
    where: { isAdopt: false, deletedAt: null },
    include: { organization: true }
  });

  res.status(201).json({
    data: pets,
  });
};

export const getAllPets = async (req: Request, res: Response) => {
  const page = req.query.page || 1;
  const take = 8;
  const skip = (Number(page) - 1) * take;

  const pets = await prisma.pet.findMany({
    where: { isAdopt: false, deletedAt: null },
    orderBy: { createdAt: "asc" },
    skip,
    take,
  });

  const total = await prisma.pet.count({
    where: { isAdopt: false, deletedAt: null },
  });

  res.status(201).json({
    data: pets,
    total,
  });
};

export const getPetsAdmin = async (req: Req, res: Response) => {
  const idAdmin = req.user?.id;
  const page = req.query.page || 1;
  const take = 16;
  const skip = (Number(page) - 1) * take;

  const pets = await prisma.pet.findMany({
    where: { organizationId: idAdmin, deletedAt: null },
    orderBy: { createdAt: "desc" },
    skip,
    take,
  });

  const total = await prisma.pet.count({
    where: { organizationId: idAdmin, deletedAt: null },
  });

  res.status(201).json({
    data: pets,
    total,
  });
};

export const filterPets = async (req: Request, res: Response) => {
  const filter: IFilter = req.body;

  const pets = await prisma.pet.findMany({
    where: { isAdopt: false, deletedAt: null },
    include: {
      organization: true,
    },
  });

  let arrayPets = [];

  const keys = Object.keys(filter) as Array<keyof typeof filter>;

  if (pets) {
    for (let pet of pets) {
      let isFilteredPet: boolean[] = [];

      keys.forEach((key) => {
        if (key === "state" || key === "city") {
          isFilteredPet.push(pet.organization[key] === filter[key]);
        } else if(key === "ong"){
          isFilteredPet.push(pet.organization['name'] === filter[key]);
        } 
        else {
          isFilteredPet.push(pet[key] === filter[key]);
        }
      });

      if (!isFilteredPet.includes(false)) {
        arrayPets.push(pet);
      }
    }
  }

  res.status(201).json({
    data: arrayPets
  })
};

export const deletePet = async (req: Request, res: Response) => {
  const { id } = req.params;

  const pet = await prisma.pet.findUnique({ where: { id } });

  if (!pet) {
    res.status(400).json({ errors: ["Pet não encontrado."] });
    return;
  }

  await prisma.pet.update({ where: { id }, data: { deletedAt: new Date() } });

  res.status(201).json("Pet excluído.");
};

export const savePetAsFavorite = async (req: Req, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;

  const pet = await prisma.pet.findUnique({ where: { id } });

  if (!pet) {
    res.status(400).json({ errors: ["Pet não encontrado."] });
    return;
  }

  const favorite = await prisma.favorites.create({
    data: {
      petId: id,
      userId: userId as string,
    },
  });

  if (!favorite) {
    res
      .status(500)
      .json({ errors: ["Houve um erro, tente novamente mais tarde."] });
    return;
  }

  res.status(201).json({
    data: favorite,
  });
};

export const getMyPetsFavorites = async (req: Req, res: Response) => {
  const userId = req.user?.id;

  const favorites = await prisma.favorites.findMany({
    where: { userId },
    include: { pet: true },
  });

  res.status(201).json({
    data: favorites,
  });
};

export const deletePetFavorite = async (req: Req, res: Response) => {
  const { id } = req.params;
  const user = req.user?.id;

  const petFavorite = await prisma.favorites.findFirst({
    where: { petId: id, userId: user as string },
  });

  if (!petFavorite) {
    res.status(400).json({ errors: ["Pet favoritado não encontrado."] });
    return;
  }

  const idFavorite = petFavorite.id;

  await prisma.favorites.delete({ where: { id: idFavorite } });

  res.status(201).json("Pet desfavoritado.");
};

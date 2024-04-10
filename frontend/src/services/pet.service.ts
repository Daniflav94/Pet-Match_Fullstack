import { IPet } from "../interfaces/IPet";
import { api } from "../utils/config";

export const createPet = async (pet: IPet, token: string) => {
  try {
    const res = await fetch(`${api}/pets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(pet),
      
    });

    return res.json();
    
  } catch (error) {
    console.log(error);
  }
};

export const editPet = async (id: string, pet: Partial<IPet>, token: string) => {
  try {
    const res = await fetch(`${api}/pets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(pet),
      
    });

    return res.json();
    
  } catch (error) {
    console.log(error);
  }
};

export const deletePet = async (id: string, token: string) => {
  try {
    const res = await fetch(`${api}/pets/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },      
    });

    return res.json();
    
  } catch (error) {
    console.log(error);
  }
};

export const listMyPets = async (token: string) => {
  try {
    const res = await fetch(`${api}/pets/my-pets`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },      
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const listPetsWithPagination = async (page: number) => {
  try {
    const res = await fetch(`${api}/pets?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },      
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};


export const addPetListFavorites = async (petId: string, token: string) => {
  try {
    const res = await fetch(`${api}/pets/favorite/${petId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },      
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const removePetListFavorites = async (petId: string, token: string) => {
  try {
    const res = await fetch(`${api}/pets/favorite/${petId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },      
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getListFavorites = async (token: string) => {
  try {
    const res = await fetch(`${api}/pets/favorite/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },      
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

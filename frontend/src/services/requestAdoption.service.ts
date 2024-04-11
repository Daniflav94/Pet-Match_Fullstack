import { IFormAdoption } from "../interfaces/IFormAdoption";
import { api } from "../utils/config";

export const createRequest = async (form: IFormAdoption, token: string) => {
  try {
    const res = await fetch(`${api}/adoption/`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      body: JSON.stringify(form),
      
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getRequestsUser = async (token: string) => {
  try {
    const res = await fetch(`${api}/adoption/`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token
      },
      
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

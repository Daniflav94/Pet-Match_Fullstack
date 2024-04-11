import { ILogin } from "../interfaces/ILogin";
import { IUser } from "../interfaces/IUser";
import { IOrganization } from "../interfaces/IOrganization";
import { api } from "../utils/config";

export const register = async (data: IUser | IOrganization) => {
  try {
    const typeUser = data.type;
  
    const formData = new FormData();
   (Object.keys(data) as Array<keyof typeof data>).forEach(key => formData.append(key, data[key] as string));
    return formData;


    const res = await fetch(`${api}/auth/register/${typeUser}`, {
      method: "POST",
      body: formData
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const login = async (data: ILogin) => {
  try {
    const res = await fetch(`${api}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    localStorage.setItem("token", JSON.stringify(res));

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => {
  localStorage.clear();
};

export const getCurrentUser = async(token: string) => {
  try {
    const res = await fetch(`${api}/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },   
    });

    localStorage.setItem("user", JSON.stringify(res));

    return res.json();
  } catch (error) {
    console.log(error);
  }
}

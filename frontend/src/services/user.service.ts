import { IUser } from "../interfaces/IUser";
import { api } from "../utils/config";

export const getCurrentUser = async(token: string) => {
    try {
      const res = await fetch(`${api}/user/profile`, {
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
}

export const editUser = async(token: string, id: string, data: Partial<IUser>) => {
    try {
      console.log(data)
      const res = await fetch(`${api}/user/profile/user/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },   
        body: JSON.stringify(data),
      });
  
      return res.json();
    } catch (error) {
      console.log(error);
    }
}

export const editAdmin = async(token: string, id: string, data: FormData) => {
    try {
      const res = await fetch(`${api}/user/profile/admin/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },   
        body: data,
      });
  
      return res.json();
    } catch (error) {
      console.log(error);
    }
}
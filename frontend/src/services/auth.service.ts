import { ILogin } from "../interfaces/ILogin";
import { IUser } from "../interfaces/IUser";
import { api } from "../utils/config";

export const registerUser = async (data: IUser) => {
  try {
      const res = await fetch(`${api}/auth/register/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      return res.json(); 

    
  } catch (error) {
    console.log(error);
  }
};

export const registerAdmin = async (data: FormData) => {
  try {
    const res = await fetch(`${api}/auth/register/admin`, {
      method: "POST",
      body: data
    });

    return res.json();
  } catch (error) {
    
  }
}

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

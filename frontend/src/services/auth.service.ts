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
    
    return res.json()
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => {
  localStorage.clear();
};


export const forgetPassword = async(data: {email: string}) => {
  try {
    const res = await fetch(`${api}/auth/forget-password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },   
      body: JSON.stringify(data),
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export const validateCode = async(data: {code: string, userId: string}) => {
  try {
    const res = await fetch(`${api}/auth/validate-code`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },   
      body: JSON.stringify(data),
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
}

export const resetPassword = async(data: {code: string, userId: string, password: string}) => {
  try {
    const res = await fetch(`${api}/auth/reset-password`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },   
      body: JSON.stringify(data),
    });

    return res.json();
  } catch (error) {
    console.log(error);
  }
}

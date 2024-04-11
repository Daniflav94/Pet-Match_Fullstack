import { INotification } from "../interfaces/INotification";
import { api } from "../utils/config";

export const createNotification = async (notification: INotification, token: string) => {
  try {
    const res = await fetch(`${api}/notifications/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(notification),
    });

    return res.json();
  } catch (error) {
    console.log(error)
  }
};


export const getNotifications = async (token: string) => {
  try {
    const res = await fetch(`${api}/notifications/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    return res.json();
  } catch (error) {
    console.log(error)
  }
};

export const updateNotification = async (
  id: string,
  data: Partial<INotification>,
  token: string
) => {
  try {
    const res = await fetch(`${api}/notifications/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(data),
    });

    return res.json();
  } catch (error) {
    console.log(error)
  }
};

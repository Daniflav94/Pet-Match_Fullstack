import {
  addDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { IFormAdoption } from "../interfaces/IFormAdoption";
import { db } from "../firebase/config";
import { INotification } from "../interfaces/INotification";
import { createNotification } from "./notifications.service";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const createRequest = async (form: IFormAdoption) => {
  try {
    const save = await addDoc(collection(db, "formsAdoption"), form);

    const notification: INotification = {
      type: "request_adoption",
      formAdoption: form,
      uidReceiver: form.pet.organization.id as string,
      createdAt: new Date().toLocaleDateString("pt-BR"),
      isViewed: false
    };

    await createNotification(notification);

    return { data: save };
  } catch (error) {
    console.log(getErrorMessage(error));
    return { error: getErrorMessage(error) };
  }
};

export const getRequestsUser = async (uidUser: string) => {
  try {
    let res: any[] = [];
    const q = query(
      collection(db, "formsAdoption"),
      where("uidUser", "==", uidUser)
    );
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((item) => {
      res.push(item.data());
    });

    return { data: res };
  } catch (error) {
    console.log(getErrorMessage(error));
    return { error: getErrorMessage(error) };
  }
};

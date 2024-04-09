import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { INotification } from "../interfaces/INotification";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const createNotification = async (notification: INotification) => {
  try {
    const saveNotification = await addDoc(collection(db, "notifications"), notification);
    const docRef = doc(db, "notifications", saveNotification.id);
    await updateDoc(docRef, { uid: saveNotification.id });

    return { data: saveNotification };
  } catch (error) {
    console.log(getErrorMessage(error));
    return { error: getErrorMessage(error) };
  }
}


export const getNotifications = async (uidUser: string) => {
  try {
    let res: any[] = [];
    const q = query(
      collection(db, "notifications"),
      where("uidReceiver", "==", uidUser),
      orderBy("createdAt", "asc")
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

export const updateNotification = async (
  uid: string,
  data: Partial<INotification>
) => {
  try {
    const docRef = doc(db, "notifications", uid);
    await updateDoc(docRef, data);
  } catch (error) {
    console.log(getErrorMessage(error));
    return { error: getErrorMessage(error) };
  }
};

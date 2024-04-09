import { db } from "../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";

export const findUser = async (uidUser: string) => {
  let res: any;
  const q = query(collection(db, "users"), where("uid", "==", uidUser));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((item) => {
    res = item.data();
  });
  return res;
};

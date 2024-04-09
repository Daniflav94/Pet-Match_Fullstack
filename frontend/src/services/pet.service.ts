import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  limit,
  startAt,
} from "firebase/firestore";
import { IPet } from "../interfaces/IPet";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const createPet = async (pet: IPet) => {
  try {
    const savePet = await addDoc(collection(db, "pets"), pet);

    const docRef = doc(db, "pets", savePet.id);
    await updateDoc(docRef, { uid: savePet.id });

    return { data: savePet };
  } catch (error) {
    console.log(getErrorMessage(error));
    return { error: getErrorMessage(error) };
  }
};

export const editPet = async (uid: string, pet: Partial<IPet>) => {
  try {
    const docRef = doc(db, "pets", uid);
    const updatedPet = await updateDoc(docRef, pet);

    return { data: updatedPet };
  } catch (error) {
    console.log(getErrorMessage(error));
    return { error: getErrorMessage(error) };
  }
};

export const deletePet = async (uid: string) => {
  try {
    const docRef = doc(db, "pets", uid);
    await deleteDoc(docRef);
  } catch (error) {
    console.log(getErrorMessage(error));
    return { error: getErrorMessage(error) };
  }
};

export const listMyPets = async (uidUser: string) => {
  try {
    let res: any[] = [];
    const q = query(
      collection(db, "pets"),
      where("organization.uid", "==", uidUser)
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

export const listPetsWithPagination = async (page: number) => {
  try {
    let res: any[] = [];

    const q = query(collection(db, "pets"), where("isAdopt", "==", false));
    const firstSnapshot = await getDocs(q);
    const lastVisible = firstSnapshot.docs[page * 8];

    const next = query(
      collection(db, "pets"),
      where("isAdopt", "==", false),
      startAt(lastVisible),
      limit(8)
    );

    const querySnapshot = await getDocs(next);

    querySnapshot?.forEach((item) => {
      res.push(item.data());
    });

    return { data: res, total: firstSnapshot.size };
  } catch (error) {
    console.log(getErrorMessage(error));
    return { error: getErrorMessage(error) };
  }
};

export const listAllPets = async () => {
  try {
    let res: any[] = [];
    const q = query(collection(db, "pets"), where("isAdopt", "==", false));
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

export const addPetListFavorites = async (pet: IPet, uidUser: string) => {
  try {
    const favorite = {
      pet: pet,
      uidUser,
    };

    const addPet = await addDoc(collection(db, "favorites"), favorite);
    const docRef = doc(db, "favorites", addPet.id);
    await updateDoc(docRef, { uid: addPet.id });

    return { data: addPet };
  } catch (error) {
    console.log(getErrorMessage(error));
    return { error: getErrorMessage(error) };
  }
};

export const removePetListFavorites = async (petUid: string, uidUser: string) => {
  try {
    const q = query(
      collection(db, "favorites"),
      where("uidUser", "==", uidUser),
      where("pet.uid", "==", petUid)
    );
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach(async (item) => {
      let docs = item.data()

      const docRef = doc(db, "favorites", docs.uid);
      await deleteDoc(docRef);
    });

    
  } catch (error) {
    console.log(getErrorMessage(error));
    return { error: getErrorMessage(error) };
  }
};

export const getListFavorites = async (uidUser: string) => {
  try {
    let res: any[] = [];
    const q = query(
      collection(db, "favorites"),
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

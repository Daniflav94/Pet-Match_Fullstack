import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { db } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { IRegister } from "../interfaces/IRegister";
import { ILogin } from "../interfaces/ILogin";
import { IUser } from "../interfaces/IUser";
import { IOrganization } from "../interfaces/IOrganization";

const auth = getAuth();

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export const register = async (data: IRegister) => {
  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      data.data.email,
      data.password
    );

    await updateProfile(user, {
      displayName: data.data.name,
    });

    const userSaved = { ...data.data, uid: user.uid, type: data.type };
    await createUser(userSaved);

    return userSaved;
  } catch (error) {
    return {error: getErrorMessage(error)}
  }
};

export const login = async (data: ILogin) => {
  try {
    const signIn = await signInWithEmailAndPassword(auth, data.email, data.password);

    return {data: signIn};
  } catch (error) {
    const errorMessage = getErrorMessage(error);

    if (errorMessage.indexOf("invalid-credential") !== -1) {
      console.log(errorMessage)
      return {error: "Login / senha inválidos"};
    } else {
      return {error: "Ocorreu um erro, por favor tente mais tarde."};
    }
  }
};

export const logout = () => {  
  signOut(auth);
  localStorage.clear()
}

const createUser = async (user: IUser | IOrganization) => {
  try {
    const saveUser = await addDoc(collection(db, "users"), user);

    return saveUser;
  } catch (error) {
    return {error: getErrorMessage(error)}
  }
};

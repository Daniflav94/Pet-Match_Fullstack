import { storage } from "../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function upload(image: Blob) {
  try {
    const timestamp = new Date().getTime().toString();
    const storageRef = ref(storage, 'images/' + timestamp);
  
    const response = uploadBytes(storageRef, image);
  
    return getDownloadURL((await response).ref);
    
  } catch (error) {
    console.log(error);
  }
}

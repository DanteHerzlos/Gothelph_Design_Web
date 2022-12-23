import { uuidv4 } from "@firebase/util";
import { storage } from "firebase-config";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";



export class firebaseStorageService {
  static save = async (file: File): Promise<string> => {
    const filename = uuidv4();
    const storageRef = ref(storage, filename);
    const metadata = { contentType: file.type };
    const uploadTask = await uploadBytes(storageRef, file, metadata);
    const fileUrl = await getDownloadURL(uploadTask.ref);
    return fileUrl;
  };

  static delete = async (filename: string) => {
    const storageRef = ref(storage, filename);
    await deleteObject(storageRef);
  };
}

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase"; // use your initialized storage

export const uploadImage = async (file) => {
  if (!file) return null;

  try {
    const fileRef = ref(storage, `issue-images/${Date.now()}-${file.name}`);
    await uploadBytes(fileRef, file);
    const url = await getDownloadURL(fileRef);
    console.log("Uploaded image URL:", url);
    return url;
  } catch (err) {
    console.error("Image upload failed:", err);
    return null;
  }
};

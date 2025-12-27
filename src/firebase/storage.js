// storage.js
import { storage } from "./firebaseConfig"; // must point to your initialized firebase.js

//// storage.js
export const uploadImage = async (file) => {
  if (!file) return null;

  try {
    // Just return a string like a "fake URL"
    const fakeUrl = `issue-images/${Date.now()}-${file.name}`;
    console.log("Stored file name as URL:", fakeUrl);
    return fakeUrl;
  } catch (err) {
    console.error("Image fake upload failed:", err);
    return null;
  }
};

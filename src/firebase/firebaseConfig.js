import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDPcEFM-ngahimcJKNLFrB0gYms_h4tgtA",
  authDomain: "issue-solver-3833d.firebaseapp.com",
  projectId: "issue-solver-3833d",
  storageBucket: "issue-solver-3833d.firebasestorage.app",
  messagingSenderId: "638137384054",
  appId: "1:638137384054:web:059f19fbd36c6cd8313357",
};

// Prevent re-initialization
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

export default firebase;

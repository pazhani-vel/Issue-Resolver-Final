import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// Parse config from env
if (!process.env.REACT_APP_FIREBASE_CONFIG) {
  console.error("REACT_APP_FIREBASE_CONFIG must be defined");
}
const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE_CONFIG);

// Initialize Firebase immediately
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// ===== Authentication =====
export function attachAuthListener(handler) {
  return firebase.auth().onAuthStateChanged(user => {
    handler(user);
  });
}

export async function createNewUser(email, password) {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export async function signIn(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

export async function signOut() {
  return firebase.auth().signOut();
}

export function adminSignIn(email, password) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}

//===== Firestore Database =====
const db = firebase.firestore();
export const issuesCollection = db.collection("issues");

export async function fetchIssuesByCategory(category) {
  const snapshot = await issuesCollection.get();

  return snapshot.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(issue => {
      if (category === "All") return true;

      // include missing-category docs
      return issue.category === category || !issue.category;
    });
}


export async function addIssue(issue) {
  const docRef = await issuesCollection.add(issue);
  return docRef.id;
}

// Update issue status
export async function updateIssue(id, updatedData) {
  try {
    await issuesCollection.doc(id).update(updatedData);
  } catch (error) {
    console.error("Error updating issue:", error);
  }
}

export async function deleteIssue(id) {
  await issuesCollection.doc(id).delete();
}

// ===== Firebase Storage =====
const storage = firebase.storage();

export async function uploadImage(file, path) {
  const storageRef = storage.ref().child(path);
  await storageRef.put(file);
  const url = await storageRef.getDownloadURL();
  return url;
}

export function initialize() {
  // Dummy function, Firebase is already initialized
  return;
}
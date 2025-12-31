import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

export const addVote = async (issueId) => {
  await firebase
    .firestore()
    .collection("issues")
    .doc(issueId)
    .update({
      votes: firebase.firestore.FieldValue.increment(1),
    });
};

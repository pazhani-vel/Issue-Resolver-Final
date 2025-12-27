// import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "./firebase";

// export const fetchIssuesByCategory = async (category) => {
//   const issuesRef = collection(db, "issues");

//   const q = category === "All"
//     ? issuesRef
//     : query(issuesRef, where("category", "==", category));

//   const snapshot = await getDocs(q);

//   return snapshot.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data()
//   }));
// };

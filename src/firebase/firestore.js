import { db } from "./firebaseConfig";

/* ================= AUTH-BASED ISSUES ================= */

// Fetch issues for logged-in user
export const getUserIssues = async (email) => {
  if (!email) return [];

  const snapshot = await db
    .collection("issues")
    .where("reportedBy", "==", email)
    .get();

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

/* ================= CATEGORY FILTER ================= */

export const fetchIssuesByCategory = async (category) => {
  const snapshot = await db.collection("issues").get();

  const issues = [];
  snapshot.forEach(doc => {
    const data = doc.data();
    if (category === "All" || data.category === category) {
      issues.push({ id: doc.id, ...data });
    }
  });

  return issues;
};

/* ================= ISSUE CRUD ================= */

export const addIssue = async (issueData) => {
  await db.collection("issues").add(issueData);
};

export const updateIssue = async (issueId, updatedData) => {
  await db.collection("issues").doc(issueId).update(updatedData);
};

export const deleteIssue = async (issueId) => {
  await db.collection("issues").doc(issueId).delete();
};

/* ================= USER ================= */

export const saveUser = async (email, userData) => {
  if (!email) return;

  const cleanEmail = email.trim().toLowerCase();
  await db.collection("users").doc(cleanEmail).set(userData, { merge: true });
};


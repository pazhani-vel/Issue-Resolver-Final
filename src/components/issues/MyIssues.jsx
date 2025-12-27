import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import firebase, { db } from "../../firebase/firebaseConfig";
import IssueMap from "../map/IssueMap";
import EditIssueModal from "./EditIssueModal";

const MyIssues = () => {
  const { user } = useContext(AuthContext);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editIssue, setEditIssue] = useState(null);
  const [openImageId, setOpenImageId] = useState(null);
  const [openMapId, setOpenMapId] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchIssues = async () => {
      try {
        const snapshot = await db
          .collection("issues") // your collection name
          .where("reportedBy", "==", user.email) // filter by logged-in user email
          .get();

        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setIssues(data);
      } catch (err) {
        console.error("Error fetching issues:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchIssues();
  }, [user]);


  const handleDelete = async (id) => {
    if (!window.confirm("Delete this issue permanently?")) return;

    await db.collection("issues").doc(id).delete();
    setIssues((prev) => prev.filter((i) => i.id !== id));
  };

  const handleUpdated = (id, updatedData) => {
    setIssues((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...updatedData } : i))
    );
  };

  if (loading) return <p>Loading...</p>;
  if (issues.length === 0) return <p>No issues found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>My Reported Issues</h2>

      {issues.map((issue) => (
        <div key={issue.id} style={card}>
          <h3>{issue.category}</h3>
          <p><b>Short:</b> {issue.shortDescription}</p>
          <p><b>Description:</b> {issue.description}</p>
          <p><b>Status:</b> {issue.status}</p>

          <div style={{ display: "flex", gap: "8px" }}>
            {issue.imageUrl && (
              <button onClick={() =>
                setOpenImageId(openImageId === issue.id ? null : issue.id)
              }>
                Image
              </button>
            )}

            {issue.location && (
              <button onClick={() =>
                setOpenMapId(openMapId === issue.id ? null : issue.id)
              }>
                Map
              </button>
            )}

            <button onClick={() => setEditIssue(issue)}>Edit</button>
            <button onClick={() => handleDelete(issue.id)} style={{ color: "red" }}>
              Delete
            </button>
          </div>

          {openImageId === issue.id && (
            <img
              src={issue.imageUrl}
              alt="Issue"
              style={{ width: "100%", marginTop: "10px" }}
            />
          )}

          {openMapId === issue.id && (
            <div style={{ height: "300px", marginTop: "10px" }}>
              <IssueMap lat={issue.location.lat} lon={issue.location.lon} />
            </div>
          )}
        </div>
      ))}

      {editIssue && (
        <EditIssueModal
          issue={editIssue}
          onClose={() => setEditIssue(null)}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  );
};

const card = {
  border: "1px solid #ccc",
  padding: "15px",
  borderRadius: "8px",
  marginBottom: "15px",
};

export default MyIssues;

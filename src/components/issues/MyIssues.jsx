import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase/firebaseConfig";
import IssueMap from "../map/IssueMap";
import EditIssueModal from "./EditIssueModal";
import "./MyIssues.css";

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
          .collection("issues")
          .where("reportedBy", "==", user.email)
          .get();

        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
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

  if (loading) return <p className="loading-text">Loading...</p>;
  if (issues.length === 0) return <p className="loading-text">No issues found.</p>;

  return (
    <div className="my-issues-container">
      <h2>My Reported Issues</h2>
      <div className="issues-grid">
        {issues.map((issue) => (
          <div key={issue.id} className="issue-card">
            <h3>{issue.category}</h3>
            <p><b>Short:</b> {issue.shortDescription}</p>
            <p><b>Description:</b> {issue.description}</p>
            <p><b>Status:</b> {issue.status}</p>

            <div className="card-buttons">
              {/* Image toggle button */}
              {issue.imageUrl && (
                <button
                  className="btn btn-image"
                  onClick={() =>
                    setOpenImageId(openImageId === issue.id ? null : issue.id)
                  }
                >
                  {openImageId === issue.id ? "Hide Image" : "View Image"}
                </button>
              )}

              {/* Map toggle button */}
              {issue.location && (
                <button
                  className="btn btn-map"
                  onClick={() =>
                    setOpenMapId(openMapId === issue.id ? null : issue.id)
                  }
                >
                  {openMapId === issue.id ? "Close Map" : "Show Map"}
                </button>
              )}

              <button className="btn btn-edit" onClick={() => setEditIssue(issue)}>
                Edit
              </button>
              <button
                className="btn btn-delete"
                onClick={() => handleDelete(issue.id)}
              >
                Delete
              </button>
            </div>

            {/* Show Image */}
            {openImageId === issue.id && issue.imageUrl && (
              <div className="image-preview">
                <img
                  src={issue.imageUrl}
                  alt="Issue"
                  className="issue-image"
                />
              </div>
            )}

            {/* Show Map */}
            {openMapId === issue.id && (
              <div className="map-container">
                <IssueMap lat={issue.location.lat} lon={issue.location.lon} />
              </div>
            )}
          </div>
        ))}
      </div>

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

export default MyIssues;

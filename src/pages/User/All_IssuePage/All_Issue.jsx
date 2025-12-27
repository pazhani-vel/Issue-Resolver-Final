import React, { useState, useEffect } from "react";
import IssueGrid from "../../../components/IssueGrid/IssueGrid";
import { fetchIssuesByCategory, updateIssue } from "../../../utils/firebase";
import NavBar from "../../../components/Navbar/Navbar";
import "./All_Issue.css";

const categories = [
  { name: "All", icon: "📋" },
  { name: "Electrical", icon: "💡" },
  { name: "Plumbing", icon: "🚰" },
  { name: "Internet", icon: "🌐" },
  { name: "Cleanliness", icon: "🧹" },
  { name: "Infrastructure", icon: "🪑" },
  { name: "Security", icon: "⚠️" },
  { name: "Other", icon: "🔧" },
];

const AllIssues = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadIssues = async (category) => {
    setLoading(true);
    const data = await fetchIssuesByCategory(category);
    setIssues(data);
    setLoading(false);
  };

  useEffect(() => {
    loadIssues(selectedCategory);
  }, [selectedCategory]);

  const handleStatusChange = async (id, newStatus) => {
    await updateIssue(id, { status: newStatus });
    setIssues((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: newStatus } : i))
    );
  };

  return (
    <div className="admin-app">
      <NavBar />

      <header className="dashboard-header">
        <h1>User Dashboard</h1>
        <div className="task-count">Total Issues: {issues.length}</div>
      </header>

      <div className="category-filter">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className={`category-btn ${
              selectedCategory === cat.name ? "active" : ""
            }`}
            onClick={() => setSelectedCategory(cat.name)}
          >
            <span className="icon">{cat.icon}</span> {cat.name}
          </button>
        ))}
      </div>

      <main className="dashboard-content">
        {loading ? (
          <div className="loading">Loading issues...</div>
        ) : (
          <IssueGrid
            issues={issues}
            onStatusChange={handleStatusChange}
            isAdmin={true}
          />
        )}
      </main>
    </div>
  );
};

export default AllIssues;

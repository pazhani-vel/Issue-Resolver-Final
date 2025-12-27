import React, { useState, useEffect } from "react";
import KanbanBoard from "../../components/Kanban/KanbanBoard";
import { fetchIssuesByCategory, updateIssue } from "../../utils/firebase";
import "./AdminDashboard.css";
import AdminNavBar from "../../components/Admin_Navbar/Admin_Navbar";

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

const AdminDashboard = () => {
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
    setIssues(prev => prev.map(issue => issue.id === id ? { ...issue, status: newStatus } : issue));
  };

  return (
    <div className="admin-app">
      <AdminNavBar/>
      <header className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <div className="task-count">Total Issues: {issues.length}</div>
      </header>

      <div className="category-filter">
        {categories.map(cat => (
          <button
            key={cat.name}
            className={`category-btn ${selectedCategory === cat.name ? "active" : ""}`}
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
          <KanbanBoard
  tasks={issues}
  setTasks={setIssues}
  isAdmin={true}   // 🔥 THIS LINE IS CRITICAL
/>

        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

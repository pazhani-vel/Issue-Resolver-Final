import React from "react";
import TaskCard from "./TaskCard";
import { updateIssue } from "../../utils/firebase";
import "./Kanban.css";

const KanbanBoard = ({ tasks, setTasks, isAdmin }) => {
  const columns = ["Pending", "In Progress", "Completed"];

  // DRAG START (ADMIN ONLY)
  const handleDragStart = (e, taskId) => {
    if (!isAdmin) return;
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
  };

  // ALLOW DROP ONLY FOR ADMIN
  const handleDragOver = (e) => {
    if (isAdmin) e.preventDefault();
  };

  // DROP HANDLER (ADMIN ONLY)
  const handleDrop = async (e, newStatus) => {
    if (!isAdmin) return;
    e.preventDefault();

    const taskId = e.dataTransfer.getData("text/plain");
    if (!taskId) return;

    // Update UI
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // Update Firebase
    await updateIssue(taskId, { status: newStatus });
  };

  const getTasksByStatus = (status) =>
    tasks.filter((task) => task.status === status);

  return (
    <div className="kanban-board">
      {columns.map((col) => (
        <div
          key={col}
          className={`kanban-column ${!isAdmin ? "readonly" : ""}`}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, col)}
        >
          <h3>{col}</h3>

          {getTasksByStatus(col)
          .slice() // avoid mutating original array
  .sort((a, b) => b.votes - a.votes)
  .map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={handleDragStart}
              isAdmin={isAdmin}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;

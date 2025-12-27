import React from "react";
import TaskCard from "./TaskCard.jsx";
import { updateIssue } from "../../utils/firebase.js";
import "./Kanban.css";

const KanbanBoard = ({ tasks, setTasks }) => {
const columns = ["Pending", "In Progress", "Completed"];


  // DRAG START
  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
    console.log("DRAG START:", taskId);
  };

  // MUST allow drop
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // DROP HANDLER
  const handleDrop = async (e, newStatus) => {
    e.preventDefault();

    const taskId = e.dataTransfer.getData("text/plain");
    console.log("DROP:", taskId, newStatus);

    if (!taskId) return;

    // 🔥 Update UI
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );

    // 🔥 Update Firebase
    try {
      await updateIssue(taskId, { status: newStatus });
      console.log("Firebase updated");
    } catch (err) {
      console.error("Firebase update failed", err);
    }
  };

  const getTasksByStatus = (status) =>
    tasks.filter((task) => task.status === status);

  return (
    <div className="kanban-board">

      {columns.map((col) => (
        <div
          key={col}
          className="kanban-column"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, col)}
        >
          
          <h3>{col}</h3>

          {getTasksByStatus(col).map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDragStart={handleDragStart}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;

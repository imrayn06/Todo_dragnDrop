import React from "react";
import "./TaskColumn.css";
import TaskCard from "./TaskCard";
import { useDroppable } from '@dnd-kit/core';

const TaskColumn = ({ title, icon, tasks, status, handleDelete }) => {
  const { setNodeRef } = useDroppable({ id: status });

  return (
    <section className="task_column" ref={setNodeRef}>
      <h2 className="task_column_heading">
        <img className="task_column_icon" src={icon} alt={title} />
        {title}
      </h2>
      {tasks.filter(task => task.status === status).map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.task}
          tags={task.tags}
          handleDelete={handleDelete}
        />
      ))}
    </section>
  );
};

export default TaskColumn;

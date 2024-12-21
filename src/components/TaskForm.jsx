import React, { useState } from "react";
import "./TaskForm.css";
import Tag from "./Tag";
import { v4 as uuidv4 } from "uuid"; 


const TaskForm = ({ setTasks }) => {
  const [error, setError] = useState(""); 
  const [taskData, setTaskData] = useState({
    task: "",
    status: "todo",
    tags: [],
  });

  const checkTag = (tag) => {
    return taskData.tags.some((item) => item === tag);
  };

  const selectTag = (tag) => {
    if (checkTag(tag)) {
      setTaskData((prev) => ({
        ...prev,
        tags: prev.tags.filter((item) => item !== tag),
      }));
    } else {
      setTaskData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (taskData.task.trim() === "") {
      alert("Task cannot be empty.")
      setError("Task title cannot be empty."); 
      return; 
    }
    const newTask = {
      id: uuidv4(),
      ...taskData,
    };

    setTasks((prev) => [...prev, newTask]);
    setTaskData({ task: "", status: "todo", tags: [] });
    
  };

  return (
    <header className="app_header">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={taskData.task}
          name="task"
          className="task_input"
          placeholder="Enter your task"
          onChange={handleChange}
        />
        <div className="task_form_bottom_line">
          <div>
            <Tag tagName="HTML" selectTag={selectTag} selected={checkTag("HTML")} />
            <Tag tagName="CSS" selectTag={selectTag} selected={checkTag("CSS")} />
            <Tag tagName="JavaScript" selectTag={selectTag} selected={checkTag("JavaScript")} />
            <Tag tagName="React" selectTag={selectTag} selected={checkTag("React")} />
          </div>
          <div>
            <select
              name="status"
              value={taskData.status}
              className="task_status"
              onChange={handleChange}
            >
              <option value="todo">New</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Complete</option>
            </select>
            <button type="submit" className="task_submit">
              + Add task
            </button>
          </div>
        </div>
      </form>
    </header>
  );
};

export default TaskForm;

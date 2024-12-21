import { useState, useEffect } from "react";
import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";
import { DndContext, closestCenter } from '@dnd-kit/core';

const oldTasks = localStorage.getItem("tasks");

function App() {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskId) => {
    const newTasks = tasks.filter(task => task.id !== taskId);
    setTasks(newTasks);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over) {
      const activeTask = tasks.find(task => task.id === active.id);
      const updatedTasks = tasks.filter(task => task.id !== activeTask.id);
      activeTask.status = over.id; // column ID
      setTasks([...updatedTasks, activeTask]);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
      <div className="app">
        <TaskForm setTasks={setTasks} />
        <main className="app_main">
          <TaskColumn
            title="Todo"
            icon={todoIcon}
            tasks={tasks}
            status="todo"
            handleDelete={handleDelete}
          />
          <TaskColumn
            title="In Progress"
            icon={doingIcon}
            tasks={tasks}
            status="inprogress"
            handleDelete={handleDelete}
          />
          <TaskColumn
            title="Finished"
            icon={doneIcon}
            tasks={tasks}
            status="done"
            handleDelete={handleDelete}
          />
        </main>
      </div>
    </DndContext>
  );
}

export default App;

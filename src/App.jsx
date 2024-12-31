import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import TaskForm from "./components/TaskForm";
import TaskColumn from "./components/TaskColumn";
import todoIcon from "./assets/direct-hit.png";
import doingIcon from "./assets/glowing-star.png";
import doneIcon from "./assets/check-mark-button.png";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor
} from "@dnd-kit/core";
import { DragOverlay } from "@dnd-kit/core";

const oldTasks = localStorage.getItem("tasks");

function App() {
  const [tasks, setTasks] = useState(JSON.parse(oldTasks) || []);
  const [activeTask, setActiveTask] = useState(null);
  const [isDragging, setIsDragging] = useState(false); // Track drag

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200, // Delay
        tolerance: 5, // Drag starts when i move by 5px
      },
    }),
    useSensor(TouchSensor)
  );

  useEffect(() => {
    const preventTouch = (event) => {
      if (isDragging) {
        event.preventDefault(); // prevent touch during the drag is happening
      }
    };

    document.addEventListener("touchstart", preventTouch, { passive: false });

    return () => {
      document.removeEventListener("touchstart", preventTouch);
    };
  }, [isDragging]); // Re-run ifdragging state changes

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  };

  const handleDragStart = (event) => {
    const task = tasks.find((task) => task.id === event.active.id);
    setActiveTask(task);
    setIsDragging(true); // when i stratdragging
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over) {
      const activeTask = tasks.find((task) => task.id === active.id);
      const updatedTasks = tasks.filter((task) => task.id !== activeTask.id);
      activeTask.status = over.id; // Column ID
      setTasks([...updatedTasks, activeTask]);
    }

    setActiveTask(null); // Reset todo
    setIsDragging(false); // End draging
  };

  return (
    <div className="container-fluid py-4">
      <h1 className="main-heading" >Add tasks</h1>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <div className="text-center mb-4">
          <TaskForm setTasks={setTasks} />
        </div>
        <main className="row justify-content-center">
          <div className="col-12 col-md-4 mb-3">
            <div className="card shadow-sm  bg-primary-">
              <TaskColumn
                title="Todo"
                icon={todoIcon}
                tasks={tasks}
                status="todo"
                handleDelete={handleDelete}
              />
            </div>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <div className="card shadow-sm">
              <TaskColumn
                title="In Progress"
                icon={doingIcon}
                tasks={tasks}
                status="inprogress"
                handleDelete={handleDelete}
              />
            </div>
          </div>
          <div className="col-12 col-md-4 mb-3">
            <div className="card shadow-sm">
              <TaskColumn
                title="Finished"
                icon={doneIcon}
                tasks={tasks}
                status="done"
                handleDelete={handleDelete}
              />
            </div>
          </div>
        </main>

        <DragOverlay>
          {activeTask ? (
            <div className="p-2 bg-light border rounded shadow-sm">
              {activeTask.task}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default App;

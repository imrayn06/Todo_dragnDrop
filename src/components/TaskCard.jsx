import React from "react";
import "./TaskCard.css";
import Tag from "./Tag";
import deleteIcon from "../assets/delete.png";
import { useDraggable } from '@dnd-kit/core';

const TaskCard = ({ id, title, tags, handleDelete }) => {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id });

  return (
    <article
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        opacity: isDragging ? 0.5 : 1,
        border: isDragging ? '2px dashed #000' : '1px solid rgb(224, 215, 215)',
        borderRadius: '10px',
        transition: 'border 0.2s ease',
        width: '100%',
        minHeight: '100px',
        padding: '15px',
        margin: '15px 0',
      }}
    >
      <p className='task_text'>{title}</p>
      <div className="task_card_bottom_line">
        <div className="task_card_tags">
          {tags.map((tag, index) => (
            <Tag key={index} tagName={tag} selected />
          ))}
        </div>
        <div className="task_delete" onClick={() => handleDelete(id)}>
          <img src={deleteIcon} className='delete_icon' alt="Delete icon" />
        </div>
      </div>
    </article>
  );
};

export default TaskCard;

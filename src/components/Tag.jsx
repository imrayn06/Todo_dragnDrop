import React from "react";
import "./Tag.css";

const Tag = ({ tagName, selectTag, selected }) => {
  const tagStyle = {
    New: { backgroundColor: "#00b894", color: "#ffffff" },
    Low: { backgroundColor: "#55efc4", color: "#2d3436" },
    Medium: { backgroundColor: "#ffeaa7", color: "#2d3436" },
    High: { backgroundColor: "#d63031", color: "#ffffff" },
    default: { backgroundColor: "#b2bec3", color: "#2d3436" },
  };

  return (
    <button
      type="button"
      className="tag"
      style={selected ? tagStyle[tagName] : tagStyle.default}
      onClick={() => selectTag(tagName)}
    >
      {tagName}
    </button>
  );
};

export default Tag;

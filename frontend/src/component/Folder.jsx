import React, { useState, useEffect } from "react";
import File from "./File";
import "./Folder.css";

const Folder = ({ folderImage, folderName, files }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Positions
  const [iconPos, setIconPos] = useState({ x: 50, y: 50 });
  const [windowPos, setWindowPos] = useState({ x: 150, y: 150 });

  // Drag States
  const [isDraggingIcon, setIsDraggingIcon] = useState(false);
  const [isDraggingWindow, setIsDraggingWindow] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDraggingIcon) {
        setIconPos({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        });
      } else if (isDraggingWindow) {
        setWindowPos({
          x: e.clientX - offset.x,
          y: e.clientY - offset.y,
        });
      }
    };

    const handleMouseUp = () => {
      setIsDraggingIcon(false);
      setIsDraggingWindow(false);
    };

    if (isDraggingIcon || isDraggingWindow) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingIcon, isDraggingWindow, offset]);

  // Fix: Stop the browser from trying to drag the image as a "file"
  const preventDefaultDrag = (e) => e.preventDefault();

  return (
    <>
      {/* 1. THE FOLDER ICON - Consolidated Wrapper */}
      <div
        className="folder-container"
        onMouseDown={(e) => {
          setIsDraggingIcon(true);
          setOffset({ x: e.clientX - iconPos.x, y: e.clientY - iconPos.y });
        }}
        style={{
          position: "absolute",
          left: iconPos.x,
          top: iconPos.y,
          zIndex: isDraggingIcon ? 2000 : 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100px", // Fixed width keeps name centered under icon
          cursor: isDraggingIcon ? "grabbing" : "grab",
        }}
      >
        <img
          src={folderImage}
          alt={folderName}
          className="folder-image"
          onDragStart={preventDefaultDrag} // Stops ghost image drag
          onClick={() => setIsOpen(true)}
          style={{ width: "80px", pointerEvents: "auto" }} 
        />
        <span style={{ 
          fontSize: "13px", 
          marginTop: "4px", 
          textAlign: "center",
          userSelect: "none" 
        }}>
          {folderName}
        </span>
      </div>

      {/* 2. THE WINDOW - Completely independent layer */}
      {isOpen && (
        <div className="folder-popup-backdrop" onClick={() => setIsOpen(false)}>
          <div
            className="folder-popup"
            style={{
              position: "fixed",
              left: windowPos.x,
              top: windowPos.y,
              margin: 0,
              zIndex: 3000,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 
              onMouseDown={(e) => {
                setIsDraggingWindow(true);
                setOffset({ x: e.clientX - windowPos.x, y: e.clientY - windowPos.y });
              }}
              style={{ cursor: "move", userSelect: "none" }}
            >
              {folderName}
            </h3>

            <div className="files-grid">
              {files.map((file, index) => (
                <File
                  key={index}
                  fileName={file.name}
                  content={file.content}
                  draggable={false} 
                />
              ))}
            </div>

            <button className="folder-close-btn" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Folder;
import React, { useState, useEffect } from "react";
import "./File.css";

const File = ({ fileName, content,password, draggable = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Icon Position
  const [iconPos, setIconPos] = useState({ x: 50, y: 50 });
  const [isDraggingIcon, setIsDraggingIcon] = useState(false);
  
  // Popup Position
  const [popupPos, setPopupPos] = useState({ x: 100, y: 100 });
  const [isDraggingPopup, setIsDraggingPopup] = useState(false);
  
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDraggingIcon) {
        setIconPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
      } else if (isDraggingPopup) {
        setPopupPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
      }
    };

    const handleMouseUp = () => {
      setIsDraggingIcon(false);
      setIsDraggingPopup(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDraggingIcon, isDraggingPopup, offset]);

  const startIconDrag = (e) => {
    if (!draggable) return;
    setIsDraggingIcon(true);
    setOffset({ x: e.clientX - iconPos.x, y: e.clientY - iconPos.y });
  };

  const startPopupDrag = (e) => {
    setIsDraggingPopup(true);
    setOffset({ x: e.clientX - popupPos.x, y: e.clientY - popupPos.y });
  };

  const handleFileClick = () => {
  // 1. If there is no password, just open it
  if (!password) {
    setIsOpen(true);
    return;
  }

  // 2. If there is a password, ask the user for it
  const userInput = prompt(`Enter password for ${fileName}:`);

  // 3. Check if the password is correct
  if (userInput === password) {
    setIsOpen(true);
  } else if (userInput !== null) { 
    // If userInput is null, they clicked "Cancel". 
    // Otherwise, it's the wrong password.
    alert("Wrong password!");
  }
};

  return (
    <>
      {/* THE ICON */}
      <div
        className="file-container"
        style={{
          position: draggable ? "absolute" : "relative",
          left: draggable ? iconPos.x : 0,
          top: draggable ? iconPos.y : 0,
          zIndex: isDraggingIcon ? 2000 : 1,
        }}
        onMouseDown={startIconDrag}
      >
        <div className="file-item" onClick={handleFileClick}>
          <div className="file-icon-placeholder">📄</div>
          <span className="file-name">{fileName}</span>
        </div>
      </div>

      {/* THE POPUP */}
      {isOpen && (
        <div className="file-popup-backdrop" onClick={() => setIsOpen(false)}>
          <div 
            className="file-popup" 
            style={{ left: popupPos.x, top: popupPos.y, position: 'fixed' }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* DRAG HANDLE - THE TITLE BAR */}
            <h3 onMouseDown={startPopupDrag} style={{ cursor: 'move' }}>
              {fileName}
            </h3>
            <div className="file-popup-content">
              <div className="word-page">{content}</div>
            </div>
            <div className="file-popup-note">(View-only Word document)</div>
            <button className="file-close-btn" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default File;
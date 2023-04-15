import React from "react";

const CurrentTimeBar = () => {
  const date = new Date();
  const position = (date.getHours() - 9) * 380 + date.getMinutes() * 6.33 + 23;
  return date.getHours() >= 9 && date.getHours() <= 18 ? (
    <div
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        position: "absolute",
        top: position,
        left: 0,
      }}
    >
      <div
        style={{
          width: "12px",
          height: "12px",
          background: "red",
          borderRadius: "50%",
        }}
      ></div>
      <div style={{ width: "100%", height: "2px", background: "red" }}></div>
    </div>
  ) : null;
};

export default CurrentTimeBar;

import React from "react";
import { OneMinuteToPixels } from "./AppointementsWrapper";

const CurrentTimeBar = () => {
  const date = new Date();
  const position =
    (date.getHours() - 9) * 240 + date.getMinutes() * OneMinuteToPixels;
  return date.getHours() >= 9 && date.getHours() < 18 ? (
    <div
      style={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        position: "absolute",
        top: position,
        left: 0,
        transform: `translateY(-50%)`,
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

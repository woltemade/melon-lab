import React from "react";

const MaybeLoading = ({ children }) =>
  children === "..." ? (
    <span className="blink-loading">
      <span>.</span>
      <span>.</span>
      <span>.</span>
    </span>
  ) : (
    <span>{children}</span>
  );

export default MaybeLoading;

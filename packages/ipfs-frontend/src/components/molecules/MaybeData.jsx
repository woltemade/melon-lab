import React from "react";

const MaybeData = ({ children, dataAvailable }) =>
  dataAvailable ? (
    <span>{children}</span>
  ) : (
    <span style={{ color: "rgb(209, 102, 102)" }}>{children}</span>
  );

export default MaybeData;

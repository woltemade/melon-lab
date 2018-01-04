import React from "react";
import displayNumber from "../../utils/displayNumber";

const shortenAddress = address =>
  `${address.slice(0, 6)}…${address.substr(-4)}`;

export const statusTypes = {
  NEUTRAL: "NEUTRAL",
  WARNING: "WARNING",
  ERROR: "ERROR",
  GOOD: "GOOD",
};

const colorTypeMap = {
  [statusTypes.WARNING]: "#f29954",
  [statusTypes.ERROR]: "#d16666",
  [statusTypes.GOOD]: "#5da05d",
};

export const ConnectionInfo = ({
  account,
  mlnBalance,
  ethBalance,
  statusMessage,
  statusType,
}) => (
  <div
    style={{
      position: "fixed",
      top: 20,
      right: 20,
      backgroundColor: "#fffdf3",
      border: "1px solid black",
    }}
  >
    <a href={`https://kovan.etherscan.io/address/${account}`}>
      {shortenAddress(account)}
    </a>{" "}
    | Ⓜ {displayNumber(mlnBalance)} | Ξ {displayNumber(ethBalance)} |{" "}
    <span style={{ color: colorTypeMap[statusType] }}>{statusMessage}</span>
  </div>
);

export default ConnectionInfo;

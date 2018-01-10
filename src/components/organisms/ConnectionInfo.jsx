import React from "react";
import Link from "redux-first-router-link";
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

export const ConnectionInfoComponent = ({
  account,
  mlnBalance,
  ethBalance,
  statusMessage,
  statusType,
  myAccount,
}) => (
  <div
    style={{
      position: "fixed",
      top: 20,
      right: 20,
      backgroundColor: "#fffdf3",
      fontSize: "0.8em",
      zIndex: 100,
      padding: 5,
    }}
  >
    <Link to={myAccount()}>{shortenAddress(account || "")}</Link>
    |{" "}
    <a href={`https://faucet.melon.network/${account}`} target="_blank">
      Ⓜ {displayNumber(mlnBalance)} | Ξ {displayNumber(ethBalance)}
    </a>{" "}
    | <span style={{ color: colorTypeMap[statusType] }}>{statusMessage}</span>
  </div>
);

export default ConnectionInfoComponent;

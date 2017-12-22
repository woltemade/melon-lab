import React from "react";
import { Card, Button } from "semantic-ui-react";

const InsufficientFunds = ({ mlnBalance, ethBalance, walletAddress }) => (
  <div>
    <Card centered>
      <Card.Content>
        <Card.Header>Welcome to the future of investment funds</Card.Header>
        <br />
        <br />
        <p>
          {" "}
          You don't have enough MLN or ETH. Current balances: {
            mlnBalance
          } MLN, {ethBalance} ETH
        </p>
        <p className="App-intro">
          To get started, head to our{" "}
          <strong>
            <a
              href={`https://faucet.melon.network/${walletAddress}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              faucet
            </a>
          </strong>{" "}
          to receive Kovan Ether and Kovan Melon
        </p>
        <p className="App-intro">
          Once you have received k-ETH and k-MLN, go ahead and create your Melon
          fund.
        </p>
        <Button
          basic
          color="black"
          style={{ width: "100%" }}
          href={`https://faucet.melon.network/${walletAddress}`}
          rel="noopener noreferrer"
          target="_blank"
        >
          Go to faucet
        </Button>
      </Card.Content>
    </Card>
  </div>
);

export default InsufficientFunds;

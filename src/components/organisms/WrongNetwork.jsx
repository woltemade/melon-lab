import React from "react";
import { Card } from "semantic-ui-react";

const WrongNetwork = () => (
  <div>
    <Card centered>
      <Card.Content>
        <Card.Header>Welcome to the future of investment funds</Card.Header>
        <br />
        <br />
        <p>
          {" "}
          <strong>
            {" "}
            In order to interact with the Melon protocol, please switch to Kovan
            Network in Metamask and refresh the page. The page should load
            within few seconds.{" "}
          </strong>
        </p>
        <p className="App-intro">
          Also make sure to unlock your account by entering your password.
        </p>
        <br />
      </Card.Content>
    </Card>
  </div>
);

export default WrongNetwork;

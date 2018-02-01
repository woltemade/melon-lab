import React from "react";
import { Card } from "semantic-ui-react";

const NoConnection = () => (
  <div>
    <Card centered>
      <Card.Content>
        <Card.Header>Welcome to the future of investment funds</Card.Header>
        <br />
        <br />
        <p>
          {" "}
          <strong>
            It seems like you are not connected to the ethereum network. Check
            your internet connection. If you are running your own node, make
            sure you are running on Kovan and you are syncend and have enough
            peers connected.
          </strong>
        </p>
        <br />
      </Card.Content>
    </Card>
  </div>
);

export default NoConnection;

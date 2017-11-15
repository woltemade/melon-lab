import React from "react";
import { Card } from "semantic-ui-react";

const LockedAccount = props => (
  <div>
    <Card centered>
      <Card.Content>
        <Card.Header>Welcome to the future of investment funds</Card.Header>
        <br />
        <br />
        <p>
          You are almost ready to use Melon! It seems like you have Metamask set
          on the Kovan Network: that's wonderful!{" "}
        </p>
        <p>
          <strong>
            Last thing you need to do is unlock your account by entering your
            password.{" "}
          </strong>
        </p>

        <br />
      </Card.Content>
    </Card>
  </div>
);

export default LockedAccount;

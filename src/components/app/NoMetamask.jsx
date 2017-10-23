import React from "react";
import { Card } from "semantic-ui-react";

const NoMetamask = props => (
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
            In order to interact with the Melon protocol, you need to install
            the{" "}
            <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en">
              Metamask Chrome extension
            </a>.{" "}
          </strong>
        </p>
        <p className="App-intro">
          Set your Metamask to Kovan Network and make sure to unlock your
          account by entering your password.
        </p>
        <br />
      </Card.Content>
    </Card>
  </div>
);

export default NoMetamask;

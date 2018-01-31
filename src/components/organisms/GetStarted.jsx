import React from "react";
import Link from "redux-first-router-link";
import { Card } from "semantic-ui-react";

const GetStarted = ({ usersFund, getFundLinkAction, setupLinkAction }) => (
  <Card centered>
    <Card.Content>
      <p>
        <b>Melon</b>, [méllō], μέλλω; Greek for <b>"destined to be"</b>:
      </p>
      <p>
        {" "}
        Blockchain software that seeks to enable participants to set up, manage
        and invest in technology regulated digital investment funds.
      </p>

      <p>
        Set up your own technology regulated fund and discover the future of
        asset management.
      </p>
      <div style={{ textAlign: "left" }}>
        <h3>
          {usersFund ? (
            <Link to={getFundLinkAction(usersFund)}>Go to your fund</Link>
          ) : (
            <Link to={setupLinkAction}>Get Started</Link>
          )}
        </h3>
      </div>
    </Card.Content>
  </Card>
);

export default GetStarted;

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
      <br />
      <div style={{ fontSize: 10, lineHeight: 1 }}>
        <a
          href="https://en.wikipedia.org/wiki/Do_Not_Track"
          target="_blank"
          rel="noopener noreferrer"
        >
          We detected that you have the browser flag "Do Not Track"{" "}
          {window.doNotTrack ? (
            <span>enabled and wont track you.</span>
          ) : (
            <span>disabled and will collect anonymous usage data.</span>
          )}
        </a>
      </div>
    </Card.Content>
  </Card>
);

export default GetStarted;

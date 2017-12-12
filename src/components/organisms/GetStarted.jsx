import React from "react";
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";

const GetStarted = () => (
  <Card centered>
    <Card.Content>
      <p>
        <b>Melon</b> ([méllō], <b>μέλλω; Greek for "destined to be"</b>) is a
        blockchain software that seeks to enable participants to set up, manage
        and invest in technology regulated digital investment funds.
      </p>

      <p>
        Set up your own technology regulated fund and discover the future of
        asset management.
      </p>
      <div style={{ textAlign: "right" }}>
        <h3>
          <Link to={`/newuser`}>Enter Melon</Link>
        </h3>
      </div>
      <br />
    </Card.Content>
  </Card>
);

export default GetStarted;

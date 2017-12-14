import React from "react";
import Link from "redux-first-router-link";
import { Card } from "semantic-ui-react";

const GetStarted = () => (
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
          <Link to={`/newuser`}>Enter Melon</Link>
        </h3>
      </div>
      <br />
    </Card.Content>
  </Card>
);

export default GetStarted;

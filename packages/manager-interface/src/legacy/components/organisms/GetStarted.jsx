import React from "react";
import Link from "redux-first-router-link";
import { Card } from "semantic-ui-react";

const GetStarted = ({
  usersFund,
  getFundLinkAction,
  setupLinkAction,
  networkId,
}) => (
  <Card centered>
    <Card.Content>
      {networkId === "1" ? (
        <div>
          <h2> You are accessing Melon on the Ethereum main network.</h2>
          <p>
            AT THE END OF THE TESTING PERIOD OR AT ANY ARBITRARY POINT IN TIME
            AS DEFINED BY MELONPORT AG, THE SMART CONTRACT SYSTEM WILL BE CLOSED
            DOWN. THIS IS EXPECTED TO HAPPEN IN A MATTER OF DAYS OR WEEKS FROM
            DEPLOYMENT DATE. AT THIS POINT, THE USERS WON’T BE ABLE TO INTERACT
            WITH THE THE SMART CONTRACT SYSTEM ANYMORE THROUGH EXECUTING MAKE OR
            TAKE ORDERS, OR THROUGH THE INVEST FUNCTIONS.
          </p>
        </div>
      ) : (
        <div>
          <p>
            <b>Melon</b>, [méllō], μέλλω; Greek for <b>"destined to be"</b>:
          </p>
          <p>
            {" "}
            Blockchain software that seeks to enable participants to set up,
            manage and invest in technology regulated digital investment funds.
          </p>

          <p>
            Set up your own technology regulated fund and discover the future of
            asset management.
          </p>
        </div>
      )}
      <div style={{ textAlign: "left", marginTop: 15 }}>
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

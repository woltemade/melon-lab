import React from "react";
import { Card, Header, Button } from "semantic-ui-react";

const CompetitionRegistration = ({
  fundAddress,
  doneWithRegistration,
  redirectToSignCompetitionTerms,
}) => (
  <Card centered>
    <Card.Content>
      <Header as="h2">Competition registration</Header>
      <div>
        <p>
          If you want to take part into the Melon Managers Competition, you need
          to register on our competition registration website.
        </p>
        <p>
          If you do not register, you will not be entitled to any reward, even
          if your fund is in the top 100 of the ranking.
        </p>
        <h4>
          It is highly recommended that you register in the competition;
          otherwise, if you are in the top 100 and unregistered, it is possible
          that someone registers your fund to the competition with a payout
          address not controled by you.
        </h4>

        <p>
          If you wish to register, click the "Register" button below. After
          completing the registration, come back here and click the "Continue"
          button.
        </p>
        <p>
          If do not wish to register now -or are already registered, click the
          "Continue" button.
        </p>
        <br />
        <Button
          basic
          color="black"
          style={{ width: "100%" }}
          onClick={redirectToSignCompetitionTerms}
        >
          {" "}
          <h4>REGISTER (Recommended) </h4>
        </Button>
        <br />
        <br />
        <p>
          <Button
            onClick={doneWithRegistration}
            basic
            color="black"
            style={{ width: "100%" }}
          >
            Continue
          </Button>
        </p>
      </div>
    </Card.Content>
  </Card>
);

export default CompetitionRegistration;

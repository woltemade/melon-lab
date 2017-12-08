import React from "react";
import { Field } from "redux-form";
import { List, Button, Card, Menu } from "semantic-ui-react";

import renderInput from "./utils/renderInput";

const ParticipationForm = ({
  loading,
  handleSubmit,
  setParticipationType,
  participationType,
}) => (
  <form onSubmit={handleSubmit}>
    <Card id="participation">
      <Card.Content>
        <Card.Header>Participation</Card.Header>
        <div>
          <Menu text style={{ display: "flex", justifyContent: "center" }}>
            <Menu.Item
              name="Invest"
              active={participationType === "Invest"}
              onClick={() => setParticipationType("Invest")}
            />
            <div style={{ marginTop: "0.7em" }}>|</div>
            <Menu.Item
              name="Redeem"
              active={participationType === "Redeem"}
              onClick={() => setParticipationType("Redeem")}
            />
          </Menu>
        </div>
        <List>
          <List.Item as="a">
            <List.Content>
              <Field name="amount" component={renderInput} />
            </List.Content>
          </List.Item>
          <List.Item as="a">
            <List.Content>
              <Field name="price" component={renderInput} />
            </List.Content>
          </List.Item>
          <List.Item as="a">
            <List.Content>
              <Field name="total" component={renderInput} />
            </List.Content>
          </List.Item>
        </List>

        <Button basic color="black" style={{ width: "100%" }}>
          Submit request
        </Button>
      </Card.Content>
      <div className={`ui ${loading ? "active" : ""} inverted dimmer`}>
        <div className="ui text loader">Processing transaction ...</div>
      </div>
    </Card>
  </form>
);

export default ParticipationForm;

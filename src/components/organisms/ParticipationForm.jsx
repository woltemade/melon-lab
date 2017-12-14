import React from "react";
import { Field } from "redux-form";
import { List, Button, Card, Menu, Label } from "semantic-ui-react";

import renderInput from "./utils/renderInput";

const ParticipationForm = ({
  setup,
  loading,
  handleSubmit,
  setParticipationType,
  participationType,
  onChange,
}) => (
  <form onSubmit={handleSubmit}>
    <Card id="participation" centered>
      <Card.Content>
        <Card.Header>Participation</Card.Header>
        {setup ? null : (
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
        )}
        <List>
          <List.Item>
            <List.Content>
              <Label>Quantity</Label>
              <Field
                name="amount"
                component={renderInput}
                onChange={onChange}
                type="number"
              />
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <Label>Price</Label>
              <Field
                name="price"
                component={renderInput}
                onChange={onChange}
                type="number"
                disabled
              />
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <Label>Total</Label>
              <Field
                name="total"
                component={renderInput}
                onChange={onChange}
                type="number"
              />
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

import React from "react";
import { List, Input, Button, Card, Menu } from "semantic-ui-react";

const ParticipationForm = ({
  amount,
  loading,
  onChange,
  onSelect,
  onSubmit,
  participationType,
  price,
  total,
}) => (
  <Card id="participation">
    <Card.Content>
      <Card.Header>Participation</Card.Header>
      <div>
        <Menu text style={{ display: "flex", justifyContent: "center" }}>
          <Menu.Item
            name="Invest"
            active={participationType === "Invest"}
            onClick={onSelect}
          />
          <div style={{ marginTop: "0.7em" }}>|</div>
          <Menu.Item
            name="Redeem"
            active={participationType === "Redeem"}
            onClick={onSelect}
          />
        </Menu>
      </div>
      <List>
        <List.Item as="a">
          <List.Content>
            <Input
              name="amount"
              placeholder="Amount"
              value={amount}
              onChange={onChange}
              label="Amount"
              style={{ width: "100%" }}
            />
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content>
            <Input
              readOnly
              name="price"
              value={price}
              label="Share Price"
              style={{ width: "100%" }}
            />
          </List.Content>
        </List.Item>
        <List.Item as="a">
          <List.Content>
            <Input
              name="total"
              placeholder="Total"
              value={total}
              onChange={onChange}
              label="Total"
              style={{ width: "100%" }}
            />
          </List.Content>
        </List.Item>
      </List>

      <Button
        basic
        color="black"
        onClick={() => onSubmit()}
        style={{ width: "100%" }}
      >
        Submit request
      </Button>
    </Card.Content>
    <div className={`ui ${loading ? "active" : ""} inverted dimmer`}>
      <div className="ui text loader">Processing transaction ...</div>
    </div>
  </Card>
);

export default ParticipationForm;

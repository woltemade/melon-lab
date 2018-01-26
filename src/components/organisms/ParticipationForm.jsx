import React from "react";
import { Field } from "redux-form";
import { List, Button, Card, Menu } from "semantic-ui-react";
import NumberInput from "../molecules/NumberInput";

const participationTypeSelector = ({ input: { onChange, value } }) => (
  <div>
    <Menu text style={{ display: "flex", justifyContent: "center" }}>
      <Menu.Item
        name="Subscribe"
        active={value === "Subscribe"}
        onClick={() => onChange("Invest")}
      />
      <div style={{ marginTop: "0.7em" }}>|</div>
      <Menu.Item
        name="Redeem"
        active={value === "Redeem"}
        onClick={() => onChange("Redeem")}
      />
    </Menu>
  </div>
);

const ParticipationForm = ({
  setup,
  handleSubmit,
  displayNumber,
  dataValid,
}) => (
  <Card id="participation" centered>
    <Card.Content>
      <Card.Header>Participation</Card.Header>
      <form onSubmit={handleSubmit} name="participation">
        {setup ? (
          <p />
        ) : (
          <Field name="type" component={participationTypeSelector} />
        )}
        <List>
          <List.Item>
            <List.Content>
              <Field
                label="Quantity"
                name="amount"
                component={NumberInput}
                type="number"
                format={displayNumber}
                disabled={!dataValid}
              />
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <Field
                label="Price"
                name="price"
                component={NumberInput}
                type="number"
                format={displayNumber}
                disabled
              />
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <Field
                label="Total"
                name="total"
                component={NumberInput}
                format={displayNumber}
                type="number"
                disabled={!dataValid}
              />
            </List.Content>
          </List.Item>
        </List>

        {!dataValid ? (
          <p style={{ color: "rgb(209, 102, 102)" }}>
            Invest/Redeem not possible when price feed down
          </p>
        ) : null}

        <Button
          basic
          color="black"
          style={{ width: "100%" }}
          disabled={!dataValid}
        >
          Submit request
        </Button>
      </form>
    </Card.Content>
  </Card>
);

export default ParticipationForm;

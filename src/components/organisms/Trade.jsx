import React from "react";
import { Field } from "redux-form";
import { List, Button, Card, Image } from "semantic-ui-react";

import renderInput from "./utils/renderInput";

const Trade = ({
  switchSymbols,
  orderType,
  theirOrderType,
  baseSymbol,
  quoteSymbol,
  handleSubmit,
  loading,
}) => (
  <form onSubmit={handleSubmit}>
    <Card centered id="trade">
      <Card.Content>
        <Card.Header>Place an order</Card.Header>
        <br />
        <br />

        <button
          style={{ textAlign: "center", cursor: "pointer" }}
          onClick={switchSymbols}
        >
          <Card.Meta>
            {orderType} <strong>{baseSymbol}</strong>
          </Card.Meta>
          <Image
            src="./switch.svg"
            width="18em"
            centered
            style={{ cursor: "pointer" }}
          />

          <Card.Meta>
            {theirOrderType} <strong>{quoteSymbol}</strong>
          </Card.Meta>
        </button>

        <br />
        <List>
          <List.Item as="a">
            <List.Content>
              <Field name="price" component={renderInput} label="Price" />
            </List.Content>
          </List.Item>
          <List.Item as="a">
            <List.Content>
              <Field name="amount" component={renderInput} label="Quantity" />
            </List.Content>
          </List.Item>
          <List.Item as="a">
            <List.Content>
              <Field name="total" component={renderInput} label="Total" />
            </List.Content>
          </List.Item>
        </List>

        <Button basic color="black" style={{ width: "100%" }}>
          {orderType}
        </Button>
      </Card.Content>
      <div className={`ui ${loading ? "active" : ""} inverted dimmer`}>
        <div className="ui text loader">Executing your order ...</div>
      </div>
    </Card>
  </form>
);

export default Trade;

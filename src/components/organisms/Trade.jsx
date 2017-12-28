import React from "react";
import { Field } from "redux-form";
import { List, Button, Card, Image } from "semantic-ui-react";

import renderInput from "../utils/renderInput";

const Trade = ({
  switchSymbols,
  orderType,
  theirOrderType,
  baseTokenSymbol,
  quoteTokenSymbol,
  handleSubmit,
  loading,
  onChange,
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
            {orderType} <strong>{baseTokenSymbol}</strong>
          </Card.Meta>
          <Image
            src="./switch.svg"
            width="18em"
            centered
            style={{ cursor: "pointer" }}
          />

          <Card.Meta>
            {theirOrderType} <strong>{quoteTokenSymbol}</strong>
          </Card.Meta>
        </button>

        <br />
        <List>
          <List.Item as="a">
            <List.Content>
              <Field
                name="price"
                component={renderInput}
                onChange={onChange}
                label="Price"
              />
            </List.Content>
          </List.Item>
          <List.Item as="a">
            <List.Content>
              <Field
                name="quantity"
                component={renderInput}
                onChange={onChange}
                label="Quantity"
              />
            </List.Content>
          </List.Item>
          <List.Item as="a">
            <List.Content>
              <Field
                name="total"
                component={renderInput}
                onChange={onChange}
                label="Total"
              />
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

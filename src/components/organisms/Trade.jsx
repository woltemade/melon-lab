import React from "react";
import { Field } from "redux-form";
import { List, Button, Card, Image, Menu } from "semantic-ui-react";

import renderInput from "../utils/renderInput";
import displayNumber from "../../utils/displayNumber";

const orderStrategySelector = ({ input }) => (
  <div>
    <Menu text style={{ display: "flex", justifyContent: "center" }}>
      <Menu.Item
        name="Market"
        active={input.value === "Market"}
        onClick={() => input.onChange("Market")}
      />
      <div style={{ marginTop: "0.7em" }}>|</div>
      <Menu.Item
        name="Limit"
        active={input.value === "Limit"}
        onClick={() => input.onChange("Limit")}
      />
    </Menu>
  </div>
);

const Trade = ({
  switchSymbols,
  orderType,
  theirOrderType,
  baseTokenSymbol,
  quoteTokenSymbol,
  handleSubmit,
  loading,
  strategy,
  selectedOrder,
}) => (
  <form onSubmit={handleSubmit}>
    <Card centered id="trade">
      <Card.Content>
        <Card.Header>Trade</Card.Header>

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
        <Field name="strategy" component={orderStrategySelector} />
        {strategy === "Market" ? <p>Select from the orderbook</p> : null}
        <List>
          <List.Item>
            <List.Content>
              <Field
                disabled={strategy === "Market"}
                format={displayNumber}
                name="price"
                component={renderInput}
                label="Price"
                type="number"
                step="0.01"
                min={0}
              />
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <Field
                disabled={strategy === "Market" && !selectedOrder}
                format={displayNumber}
                name="quantity"
                component={renderInput}
                label="Quantity"
                type="number"
                step="0.01"
                min={0}
              />
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <Field
                disabled={strategy === "Market" && !selectedOrder}
                format={displayNumber}
                name="total"
                component={renderInput}
                label="Total"
                type="number"
                step="0.01"
                min={0}
              />
            </List.Content>
          </List.Item>
        </List>

        <Button
          basic
          color="black"
          style={{ width: "100%" }}
          disabled={strategy === "Market" && !selectedOrder}
        >
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

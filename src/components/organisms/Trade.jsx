import React from "react";
import { Field } from "redux-form";
import { List, Button, Card, Image, Menu } from "semantic-ui-react";

import NumberInput from "../molecules/NumberInput";
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

const orderTypeSelector = ({
  input,
  baseTokenSymbol,
  quoteTokenSymbol,
  theirOrderType,
  disabled,
}) => (
  <button
    id="switchButton"
    disabled={disabled}
    style={{ textAlign: "center", cursor: "pointer" }}
    onClick={event => {
      event.preventDefault();
      input.onChange(theirOrderType);
    }}
  >
    <Card.Meta>
      {input.value} <strong>{baseTokenSymbol}</strong>
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
);

const Trade = ({
  orderType,
  theirOrderType,
  baseTokenSymbol,
  quoteTokenSymbol,
  handleSubmit,
  loading,
  strategy,
  selectedOrder,
  dataValid,
}) => (
  <Card centered id="trade">
    <Card.Content>
      <Card.Header>Trade</Card.Header>
      <form onSubmit={handleSubmit}>
        <Field
          name="type"
          component={orderTypeSelector}
          baseTokenSymbol={baseTokenSymbol}
          quoteTokenSymbol={quoteTokenSymbol}
          theirOrderType={theirOrderType}
          disabled={strategy === "Market"}
        />
        <br />
        <Field name="strategy" component={orderStrategySelector} />
        {strategy === "Market" ? <p>Select from the orderbook</p> : null}
        <List>
          <List.Item>
            <List.Content>
              <Field
                id="trade-price"
                disabled={strategy === "Market" || !dataValid}
                format={displayNumber}
                name="price"
                component={NumberInput}
                label="Price"
              />
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <Field
                id="trade-quantity"
                disabled={
                  (strategy === "Market" && !selectedOrder) || !dataValid
                }
                format={displayNumber}
                name="quantity"
                component={NumberInput}
                label="Quantity"
              />
            </List.Content>
          </List.Item>
          <List.Item>
            <List.Content>
              <Field
                id="trade-total"
                disabled={
                  (strategy === "Market" && !selectedOrder) || !dataValid
                }
                format={displayNumber}
                name="total"
                component={NumberInput}
                label="Total"
              />
            </List.Content>
          </List.Item>
        </List>

        {!dataValid ? (
          <p style={{ color: "rgb(209, 102, 102)" }}>
            Trading not possible when price feed down
          </p>
        ) : null}

        <Button
          basic
          id="tradeButton"
          color="black"
          style={{ width: "100%" }}
          disabled={(strategy === "Market" && !selectedOrder) || !dataValid}
        >
          {orderType}
        </Button>
      </form>
    </Card.Content>
    <div className={`ui ${loading ? "active" : ""} inverted dimmer`}>
      <div className="ui text loader">Executing your order ...</div>
    </div>
  </Card>
);

export default Trade;

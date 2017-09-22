import React from "react";
import { List, Button, Card } from "semantic-ui-react";
import Countdown from "react-cntdwn";

const ExecuteRequest = props => (
  <div>
    <div className="ui segment">
      <br />
      <p className="App-intro">
        Now, time to execute your subscription request!
      </p>
      <div className={`ui ${props.loading ? "active" : ""} inverted dimmer`}>
        <div className="ui text loader">ExecuteRequesting in your fund ...</div>
      </div>
      <Card centered>
        <Card.Content>
          <Card.Header>Execute request</Card.Header>
          <br />
          <List>
            <List.Item as="a">
              <List.Content />
            </List.Item>
          </List>
        </Card.Content>
        <Card.Content extra>
          {props.readyToExecute ? (
            <div className="ui two buttons">
              <Button basic color="black" onClick={props.onExecute}>
                Execute my request!
              </Button>
            </div>
          ) : (
            <Countdown
              targetDate={new Date(Date.now() + 180000)}
              startDelay={100}
              interval={1000}
              timeSeparator={":"}
              leadingZero
              onFinished={props.handleFinish}
            />
          )}
        </Card.Content>
      </Card>
    </div>
  </div>
);

export default ExecuteRequest;

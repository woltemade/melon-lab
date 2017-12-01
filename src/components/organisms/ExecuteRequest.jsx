import React from "react";
import { List, Button, Card } from "semantic-ui-react";
import Countdown from "react-cntdwn";

const ExecuteRequest = ({
  handleFinish,
  loading,
  onExecute,
  readyToExecute,
}) => (
  <div>
    <div className="ui segment">
      <br />

      <div className={`ui ${loading ? "active" : ""} inverted dimmer`}>
        <div className="ui text loader">Loading...</div>
      </div>
      <Card>
        <Card.Content>
          <Card.Header>Waiting time required</Card.Header>
          <br />
          <List>
            <List.Item
              as="a"
              href="https://medium.com/melonport-blog/protecting-participants-ee55a752287"
              target="_blank"
            >
              <p>
                To prevent information advantage of any economic agent over
                another, we enforce a waiting period before any subscription or
                redemption can be executed.
              </p>
              <List.Content />
            </List.Item>
          </List>
        </Card.Content>
        <Card.Content extra>
          {readyToExecute ? (
            <div className="ui two buttons">
              <Button basic color="black" onClick={onExecute}>
                Execute my request!
              </Button>
            </div>
          ) : (
            <div>
              Remaining waiting time before request execution:
              <Countdown
                targetDate={new Date(Date.now() + 180000)}
                startDelay={100}
                interval={1000}
                timeSeparator={":"}
                leadingZero
                onFinished={handleFinish}
              />
            </div>
          )}
        </Card.Content>
      </Card>
    </div>
  </div>
);

export default ExecuteRequest;

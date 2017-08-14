import React from "react";
import {
  Table,
  List,
  Input,
  Button,
  Card,
  Icon,
  Divider,
} from "semantic-ui-react";

const Setup = props =>
  (<div>
    <br />
    <div>
      <p className="App-intro">What is your fund's name ?</p>
      <Input size="huge" placeholder="Name" />
    </div>
    <div>
      <br />
      <p className="App-intro">Set your management fee</p>
      <Input size="huge" placeholder="2%" />
    </div>
    <div>
      <br />
      <p className="App-intro">Set your performance fee</p>
      <Input size="huge" placeholder="5%" />
    </div>
    <div>
      <br />
      <Button>Create and deploy my fund </Button>
    </div>
    <br />
  </div>);

export default Setup;

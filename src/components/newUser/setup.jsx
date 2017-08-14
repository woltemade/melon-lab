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
import { Link } from "react-router-dom";

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
      <Button>
        <Link to="/welcome/invest">Create and deploy my fund </Link>
      </Button>
    </div>
    <br />
  </div>);

export default Setup;

import React from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Welcome = () =>
  (<div>
    <h2>Welcome to the Melon Protocol.</h2>
    <p className="App-intro">To get started, let's create your Melon fund.</p>
    <Button>
      <Link to="/getstarted/setup">Get started </Link>
    </Button>
  </div>);

export default Welcome;

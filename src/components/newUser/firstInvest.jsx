import React from "react";
import { Input, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const FirstInvest = () =>
  (<div>
    <br />
    <p className="App-intro">Now, it's time to invest in your fund.</p>
    <div>
      <br />
      <Input size="huge" placeholder="Amount" />
    </div>
    <div>
      <br />
      <Input size="huge" placeholder="Share Price" />
    </div>
    <div>
      <br />
      <Input size="huge" placeholder="Total" />
    </div>
    <div>
      <br />
      <Button>
        <Link to="/getstarted/trade">Invest</Link>
      </Button>
    </div>
  </div>);

export default FirstInvest;

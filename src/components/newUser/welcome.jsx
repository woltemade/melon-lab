import React from "react";
import { Button } from "semantic-ui-react";
import { Route, Link, Switch } from "react-router-dom";
import Setup from "./setup";
import getStarted from "./getStarted";
import FirstInvest from "./firstInvest";
import FirstTrade from "./firstTrade";

const Welcome = props =>
  (<Switch>
    <Route exact path="/welcome" component={getStarted} />
    <Route path="/welcome/setup" component={Setup} />
    <Route path="/welcome/invest" component={FirstInvest} />
    <Route path="/welcome/trade" component={FirstTrade} />
  </Switch>);

export default Welcome;

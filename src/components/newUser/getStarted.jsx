import React from "react";
import { Route, Switch } from "react-router-dom";
import Welcome from "./welcome";

import Setup from "./setup";
import FirstInvest from "./firstInvest";
import FirstTrade from "./firstTrade";

const GetStarted = () =>
  (<div>
    <Switch>
      <Route exact path="/getstarted" component={Welcome} />
      <Route path="/getstarted/setup" component={Setup} />
      <Route path="/getstarted/invest" component={FirstInvest} />
      <Route path="/getstarted/trade" component={FirstTrade} />
    </Switch>
  </div>);

export default GetStarted;

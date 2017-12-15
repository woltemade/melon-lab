import React from "react";
import { Button } from "semantic-ui-react";
import Link from "redux-first-router-link";

const Done = ({ setupAction }) => (
  <div>
    <p>
      Well done. Your wallet is created and you are now ready to create your
      fund.
    </p>
    <Button basic color="black" style={{ width: "100%" }}>
      <Link to={setupAction}>Get started with Melon</Link>
    </Button>
  </div>
);

export default Done;

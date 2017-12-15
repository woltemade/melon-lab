import React from "react";
import { Field } from "redux-form";
import { Card, Header, Button } from "semantic-ui-react";

import renderInput from "../../utils/renderInput";

const Restore = ({ handleSubmit, error }) => (
  <Card centered>
    <Card.Content>
      <Header as="h2">From mnemonic</Header>
    </Card.Content>
    <form onSubmit={handleSubmit}>
      <p>Please type your 12-words mnemonic:</p>
      {error ? <div className="error">{error}</div> : null}
      <p>
        <Field name="mnemonic" type="text" component={renderInput} />
      </p>
      <p>
        <Button basic color="black" style={{ width: "100%" }}>
          Import
        </Button>
      </p>
    </form>
  </Card>
);

export default Restore;

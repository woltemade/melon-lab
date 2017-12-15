import React from "react";
import { Field } from "redux-form";
import { Button } from "semantic-ui-react";

import renderInput from "../../utils/renderInput";

const Encrypt = ({ handleSubmit, error, submitting }) => (
  <form onSubmit={handleSubmit}>
    <p>
      Now it is time to encrypt your wallet with a password of your choice. The
      encrypted wallet will be stored in the local storage of your browser.
    </p>
    <h5>
      Make sure to remember your password. Everytime you will send a
      transaction, you will need to type in your password.
    </h5>
    <h5>Enter a password: Do not forget it!</h5>
    {error ? <div className="error">{error}</div> : null}
    <p>
      <Field
        label="Password"
        name="password"
        component={renderInput}
        type="password"
      />

      <Field
        label="Repeat"
        name="repeat"
        component={renderInput}
        type="password"
      />
    </p>
    <Button basic disabled={submitting} color="black" style={{ width: "100%" }}>
      Encrypt my wallet
    </Button>
  </form>
);

export default Encrypt;

import React from "react";
import { Field } from "redux-form";
import { Button } from "semantic-ui-react";

import renderInput from "../../utils/renderInput";

const Encrypt = ({ handleSubmit, error, loading }) => (
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
    <div>
      <Field
        disabled={loading}
        label="Password"
        name="password"
        component={renderInput}
        type="password"
      />

      <Field
        disabled={loading}
        label="Repeat"
        name="repeat"
        component={renderInput}
        type="password"
      />
    </div>
    <Button
      basic
      disabled={loading}
      color="black"
      style={{ width: "100%" }}
      loading={loading}
    >
      Encrypt my wallet
    </Button>
  </form>
);

export default Encrypt;

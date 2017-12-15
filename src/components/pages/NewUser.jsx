import React from "react";
import { Field } from "redux-form";
import { Card, Header, Button } from "semantic-ui-react";
import Link from "redux-first-router-link";

import renderInput from "../utils/renderInput";

const generationPath = {
  Generate: generateWallet => (
    <div>
      <p>Before you can set up your fund, you need to create a wallet.</p>
      <p>
        The standard bip39 is used to generate a mnemonic phrase, from which
        your wallet will be cryptographically derived.
      </p>
      <Button
        basic
        color="black"
        style={{ width: "100%" }}
        onClick={generateWallet}
      >
        Generate my wallet!
      </Button>
    </div>
  ),
  WriteDown: (mnemonic, address, iSaved) => (
    <div>
      <p>Generated Mnemonic:</p>
      <p>
        <strong id="mnemonic">{mnemonic}</strong>
      </p>
      <p>
        Associated Public Address: <strong>{address}</strong>
      </p>
      <h5>
        It is of utmost importance that you write down your mnemonic phrase
        (displayed above) and store it in a secure place. It will be impossible
        to recover this mnemonic phrase after this step. If you wish to access
        your account and fund from another device, you will need to have access
        to your mnemonic phrase.
      </h5>
      <Button basic color="black" style={{ width: "100%" }} onClick={iSaved}>
        I wrote down my mnemonic phrase in a safe place.
      </Button>
    </div>
  ),
  Encrypt: ({ handleSubmit, error, submitting }) => (
    <form onSubmit={handleSubmit}>
      <p>
        Now it is time to encrypt your wallet with a password of your choice.
        The encrypted wallet will be stored in the local storage of your
        browser.
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
      <Button
        basic
        disabled={submitting}
        color="black"
        style={{ width: "100%" }}
      >
        Encrypt my wallet
      </Button>
    </form>
  ),
  Done: setupAction => (
    <div>
      <p>
        Well done. Your wallet is created and you are now ready to create your
        fund.
      </p>
      <Button basic color="black" style={{ width: "100%" }}>
        <Link to={setupAction}>Get started with Melon</Link>
      </Button>
    </div>
  ),
};

const renderContent = ({
  generateWallet,
  iSaved,
  hasGenerated,
  hasSavedMnemonic,
  hasEncrypted,
  newAddress,
  mnemonic,
  setupAction,
  handleSubmit,
  error,
  submitting,
}) => {
  if (!hasGenerated) {
    return generationPath.Generate(generateWallet);
  } else if (!hasSavedMnemonic) {
    return generationPath.WriteDown(mnemonic, newAddress, iSaved);
  } else if (!hasEncrypted) {
    return generationPath.Encrypt({
      handleSubmit,
      error,
      submitting,
    });
  }

  return generationPath.Done(setupAction);
};

const NewUser = props => (
  <Card centered>
    <Card.Content>
      <Header as="h2">Welcome to Melon</Header>
      {renderContent(props)}
    </Card.Content>
  </Card>
);

export default NewUser;

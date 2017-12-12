import React from "react";
import { Container, Header, Button } from "semantic-ui-react";
import { Field } from "redux-form";
import renderInput from "./utils/renderInput";

const NewUser = () => (
  <Container text>
    <Header as="h2">Welcome to Melon</Header>
    <p>Before you can set up your fund, you need to create a wallet.</p>
    <p>
      The standard bip39 is used to generate a mnemonic phrase, from which your
      wallet will be cryptographically derived.
    </p>
    <Button basic color="black" style={{ width: "100%" }}>
      Generate my wallet!
    </Button>
    <br />
    <br />

    <div>
      <p>Generated Mnemonic: MNEMONIC</p>
      <p>Associated Public Address: PUBLICADDRESS</p>
      <h5>
        It is of utmost importance that you write down your mnemonic phrase
        (displayed above) and store it in a secure place. It will be impossible
        to recover this mnemonic phrase after this step. If you wish to access
        your account and fund from another device, you will need to have access
        to your mnemonic phrase.
      </h5>
      <Button basic color="black" style={{ width: "100%" }}>
        I wrote down my mnemonic phrase in a safe place.
      </Button>
    </div>
    <br />
    <br />
    <div>
      <p>
        Now it is time to encrypt your wallet with a password of your choice.
        The encrypted wallet will be stored in the local storage of your
        browser.{" "}
      </p>
      <h5>
        Make sure to remember your password. Everytime you will send a
        transaction, you will need to type in your password.
      </h5>
      <h5>TYPE PASSWORD</h5>
      <Button basic color="black" style={{ width: "100%" }}>
        Encrypt my wallet
      </Button>
    </div>
  </Container>
);

export default NewUser;

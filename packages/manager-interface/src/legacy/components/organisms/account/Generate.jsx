import React from "react";
import { Button } from "semantic-ui-react";

const Generate = ({ generateWallet, restoreWallet }) => (
  <div>
    <p>
      Before you can set up your fund, you need to create or restore a wallet.
    </p>
    <p>
      The standard bip39 is used to generate a mnemonic phrase, from which your
      wallet will be cryptographically derived.
    </p>
    <p>
      <Button
        basic
        color="black"
        style={{ width: "100%" }}
        onClick={generateWallet}
      >
        Generate my wallet!
      </Button>
    </p>
    <p>
      <Button
        basic
        color="black"
        style={{ width: "100%" }}
        onClick={restoreWallet}
      >
        Restore wallet with mnemonic
      </Button>
    </p>
  </div>
);

export default Generate;

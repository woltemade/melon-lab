import React from 'react';
import { Button } from 'semantic-ui-react';

const WriteDown = ({ mnemonic, newAddress, iSaved }) => (
  <div>
    <p>Generated Mnemonic:</p>
    <p>
      <strong id="mnemonic">{mnemonic}</strong>
    </p>
    <p>
      Associated Public Address: <strong>{newAddress}</strong>
    </p>
    <h5>
      It is of utmost importance that you write down your mnemonic phrase
      (displayed above) and store it in a secure place. It will be impossible to
      recover this mnemonic phrase after this step. If you wish to access your
      wallet and fund from another device, you will need to have access to your
      mnemonic phrase.
    </h5>
    <Button basic color="black" style={{ width: '100%' }} onClick={iSaved}>
      I wrote down my mnemonic phrase in a safe place.
    </Button>
  </div>
);

export default WriteDown;

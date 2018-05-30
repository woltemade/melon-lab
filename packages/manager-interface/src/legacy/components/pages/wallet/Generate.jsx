import React from 'react';
import { Button, Card, Header } from 'semantic-ui-react';

const Generate = ({ restore, mnemonic }) => (
  <Card centered>
    <Card.Content>
      <Header as="h2">Generate Account</Header>
      <p>
        The standard bip39 is used to generate a mnemonic phrase, from which
        your wallet will be cryptographically derived.
      </p>
      <p style={{ fontSize: '1.2em', color: 'orange' }}>
        Please write down the following mnemonic and store it in a safe place!
        If you loose your mnemonic you will not be able to access your fund
        again. If someone else gets a copy of this, they can take over your
        wallet &amp; fund and steal your price!
      </p>
      <p
        style={{
          fontSize: '1.5em',
          fontFamily: 'monospace',
          fontWeight: 'bold',
        }}
      >
        {mnemonic}
      </p>
      <p>
        <Button basic color="black" style={{ width: '100%' }} onClick={restore}>
          I have written down the mnemonic
        </Button>
      </p>
    </Card.Content>
  </Card>
);

export default Generate;

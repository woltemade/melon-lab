import React from 'react';
import Dropzone from 'react-dropzone';
import { Card, Header, Button, Input } from 'semantic-ui-react';

import renderInput from '../../utils/renderInput';

const Restore = ({ goToAccount, parseWallet }) => (
  <Card centered>
    <Card.Content>
      <Header as="h2">Import wallet</Header>
    </Card.Content>

    <div style={{ marginBottom: '1em' }}>
      <Dropzone
        accept="application/json"
        onDrop={parseWallet}
        style={{
          width: '100%',
          border: '1px dotted black',
          padding: 10,
          textAlign: 'center',
          cursor: 'pointer',
        }}
      >
        <p>Select a wallet JSON file from your computer</p>
      </Dropzone>
    </div>
    <p>
      <Button
        basic
        color="black"
        style={{ width: '100%' }}
        onClick={goToAccount}
      >
        Cancel
      </Button>
    </p>
  </Card>
);

export default Restore;

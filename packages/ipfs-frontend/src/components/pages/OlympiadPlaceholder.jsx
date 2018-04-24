import React from 'react';
import { Field } from 'redux-form';
import { Image, Table, Card, Button } from 'semantic-ui-react';
import Link from 'redux-first-router-link';
import Highlight from 'react-highlighter';
import GetStarted from '../../containers/GetStarted';
import renderInput from '../utils/renderInput';

const OlympiadPlaceholder = ({
  generateWallet,
  mnemonic,
  newAddress,
  hasGenerated,
  iSaved,
}) => (
  <div>
    <h2 id="history" className="App-intro" centered>
      Melon Olympiad
    </h2>

    {hasGenerated ? (
      <div>
        <h4 style={{ color: 'red' }}>
          PLEASE MAKE SURE YOU SAVE THE FOLLOWING MNEMONIC PHRASE AND THE WALLET
          ADDRESS ASSOCIATED WITH IT (BOTH WRITTEN IN ORANGE BELOW). YOU WILL
          NEED TO PROVIDE THIS WALLET ADDRESS TO BITCOIN SUISSE AND YOU WILL
          NEED YOUR MNEMONIC TO GET STARTED IN THE COMPETITION.
        </h4>
        <h4>Generated Mnemonic:</h4>
        <h3>
          <strong id="mnemonic" style={{ color: 'orange' }}>
            {mnemonic}
          </strong>
        </h3>
        <h4>Associated Public Address: </h4>
        <h3 style={{ color: 'orange' }}>{newAddress}</h3>

        <h4>
          It is of utmost importance that you write down your mnemonic phrase
          (displayed above) and store it in a secure place. It will be
          impossible to recover this mnemonic phrase if you loose it.
        </h4>
      </div>
    ) : (
      <div>
        <p>
          Before you can set up your fund, you need to create or restore a
          wallet.
        </p>
        <p>
          The standard bip39 is used to generate a mnemonic phrase, from which
          your wallet will be cryptographically derived.
        </p>
        <p>
          <Button
            basic
            color="black"
            style={{ width: '100%' }}
            onClick={generateWallet}
          >
            Generate my wallet!
          </Button>
        </p>
      </div>
    )}
  </div>
);

export default OlympiadPlaceholder;

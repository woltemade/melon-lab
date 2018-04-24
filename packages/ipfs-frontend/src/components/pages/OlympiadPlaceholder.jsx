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
    <h1 id="history" className="App-intro">
      Welcome to the Melon Olympiad
    </h1>
    <h5>
      <a
        href="https://medium.com/@zenkjenna/introducing-melon-olympiad-861687d0703b"
        target="_blank"
      >
        [Click here to read blog post introducing the Melon Olympiad]
      </a>
    </h5>
    <p>
      <i>([méllō], μέλλω; Greek for “destined to be”)</i> is blockchain software
      that seeks to enable participants to set up, manage and invest in
      technology regulated investment funds in a way that reduces barriers to
      entry, while minimizing the requirements for trust.{' '}
    </p>
    <p>
      An Olympiad <i>([əˈlɪmpɪad], Ὀλυμπιάς)</i> is a period of four years
      associated with the Olympic Games of the Ancient Greeks. During the
      Hellenistic period, beginning with Ephorus, it was used as a calendar
      epoch.
    </p>
    <p>
      {' '}
      <strong>
        The Melon Olympiad is a series of blockchain-based asset management
        challenges composed of several rounds. Each of the rounds will set a
        clear goal for participants, and will issue a defined number of Melon
        tokens.
      </strong>{' '}
      At the end of the Melon Olympiad, all remaining Melon tokens shall have
      been issued to the public or burned. {' '}
    </p>
    <p>
      <i> The first round of the Melon Olympiad is referred to as Paros.</i>
    </p>
    <h2>Melon Olympiad, first round: Paros</h2>
    <p>
      A participant who wishes to contribute efforts in testing the software and
      be rewarded for this effort will have to create a fund on this website and
      contribute ether to participate to the Olympiad contract. In return, the
      Olympiad contract will invest the equivalent amount in MLN (+ a bonus)
      into the participant’s fund. The participant will have to manage his fund
      for a defined period of time (1 month) with the goal being capital
      appreciation. At the end of the defined management period, the participant
      will be able to trigger the redemption of the fund’s assets, thus
      receiving the fund’s AUM as a reward for his effort.{' '}
    </p>
    <h2> Instructions on how to participate</h2>
    <p>
      Melonport AG is required to issue tokens via a regulated financial
      intermediary which is subject to KYC/AML procedures. To perform the
      KYC/AML processes, our chosen partner is Bitcoin Suisse. Each individual
      willing to participate will have to register with Bitcoin Suisse.
    </p>
    <h4>Step 1</h4> <p>
      Generate a wallet on this website (below instructions). Make sure your
      write down the mnemonic, and store it in a safe (and accessible) place.
      Make sure you remember the password you use to encrypt the wallet. If you
      forget your password and you loose access to the mnemonic phrase, you
      won’t be able to participate in the challenge. Save the wallet address as
      you will need to provide this address to Bitcoin Suisse in step 3. In
      order to guarantee the compatibility of your mnemonic phrase, it is
      extremely important that you generate your wallet on this website. {' '}
    </p>
    <h4>Step 2 </h4> <p>
      KYC with Bitcoin Suisse: create an account with Bitcoin Suisse. Follow the
      steps on the Bitcoin Suisse platform to get the KYC clearance. Make sure
      you upload all required documents.  Bitcoin Suisse will inform you with an
      email once your KYC is approved. Once it is approved, you can move on to
      Step 3.{' '}
    </p>
    <h4>Step 3 </h4> <p>
       Apply for the Melon Olympiad Whitelist on the Bitcoin Suisse platform.
      You will need to provide an Ethereum address (the one created in Step 1)
      and the amount you wish to contribute with. It is of utmost importance
      that you provide an Ethereum address that was generated on this website.
      Bitcoin Suisse will inform you once your address is whitelisted. They will
      also inform you of the maximum amount you can contribute with.
    </p>
    <h4>Step 4  </h4>
    <p>
       Get ready before the start of the competition. Fund your wallet
      (generated in Step 1) with the amount of Ether you would like to
      contribute with.  After this point, you need to wait until the official
      beginning of the challenge which will be announced shortly.
    </p>
    <h4>Step 5 </h4>{' '}
    <p>
       Official start of the Melon Olympiad, PAROS. Come back to this website
      olympiad.melon.fund. You will be guided to create your fund.
    </p>
    <h4>Step 6  </h4>{' '}
    <p>
       After creating your fund, you will be asked to enter the amount you wish
      to contribute with. Once you confirm that transaction, the amount of Ether
      will be transferred from you wallet to the Olympiad contract. In return,
      the Olympiad contract will invest the equivalent amount in MLN into your
      fund.
    </p>
    <h4>Step 7 </h4>{' '}
    <p>
      Congratulations. You made it here. Now is time to show off your asset
      management skills. You have 1 month to manage your fund and grow your
      capital.
    </p>
    <h4>Step 8  </h4>{' '}
    <p>
       At the end of the round, and only at the end, you will have the option on
      your fund’s page to trigger the redemption of the shares and therefore to
      retrieve your earned assets. This will trigger the redemption of the
      shares owned by the Olympiad contract into your fund, and will transfer
      the assets under management to your wallet address .{' '}
    </p>
    <p>
      The terms and conditions are being finalized and will be published on this
      page as soon as ready. Please make sure you read carefully the terms and
      conditions. When you will create a fund, you will be prompted to
      cryptographically sign those terms and conditions to show your
      understanding and agreement.
    </p>
    <h2>Generate your wallet</h2>
    <p>
      The wallet you generate here will be the wallet you will use to create a
      fund when the challenge starts (referred to as manager address). It will
      be the wallet you will use to contribute ether to the Olympiad contract.
      It is also the wallet to which your compensation will be transferred to at
      the end of the period. Please make sure you carefully read the warnings
      below.
    </p>
    {hasGenerated ? (
      <div>
        <h2 style={{ color: 'red' }}>
          PLEASE MAKE SURE YOU SAVE THE FOLLOWING MNEMONIC PHRASE AND THE WALLET
          ADDRESS ASSOCIATED WITH IT (BOTH WRITTEN IN ORANGE BELOW). YOU WILL
          NEED TO PROVIDE THIS WALLET ADDRESS TO BITCOIN SUISSE AND YOU WILL
          NEED YOUR MNEMONIC TO GET STARTED IN THE COMPETITION.
        </h2>
        <h4>Generated Mnemonic:</h4>
        <h2>
          <strong id="mnemonic" style={{ color: 'orange' }}>
            {mnemonic}
          </strong>
        </h2>
        <h4>Associated Public Address: </h4>
        <h2 style={{ color: 'orange' }}>{newAddress}</h2>

        <h4>
          It is of utmost importance that you write down your mnemonic phrase
          (displayed above) and store it in a secure place. It will be
          impossible to recover this mnemonic phrase if you loose it.
        </h4>
      </div>
    ) : (
      <div>
        <p>
          The first step to perform if you wish to participate is to generate
          your wallet. Please click on the "Generate my wallet" button below
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

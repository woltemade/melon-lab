import React from 'react';
import { Field } from 'redux-form';
import { Image, Table, Card, Button } from 'semantic-ui-react';
import Link from 'redux-first-router-link';
import Highlight from 'react-highlighter';
import GetStarted from '../../containers/GetStarted';
import renderInput from '../utils/renderInput';

const OlympiadPlaceholder = ({ goToGenerateAccount, goToAccount, address }) => (
  <div style={{ maxWidth: '35em', margin: '0 auto' }}>
    <h1 id="history" className="App-intro">
      Welcome to the Melon Olympiad
    </h1>
    {/*<h5>
      <a
        href="https://medium.com/@zenkjenna/introducing-melon-olympiad-861687d0703b"
        target="_blank"
      >
        [Click here to read blog post introducing the Melon Olympiad]
      </a>
    </h5>*/}
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
        competitions composed of several rounds. Each of the rounds will set a
        clear goal for participants, and will issue a defined number of Melon
        tokens.
      </strong>
    </p>
    <p>
      Following a successful token sale in 2017, Melonport AG is left with
      500,600 Melon (MLN) tokens to distribute. Rather than distribute these in
      a traditional manner, Melonport has created a series of sub-contribution
      periods called Melon Olympiad. This will ensure that tokens are allocated
      to active community members who engage and use the Melon asset management
      ecosystem. The distribution of up to half a million Melon tokens will
      largely occur via a public contribution period is in keeping with
      Melonport’s commitment to creating a diverse and decentralized ecosystem
      in which there are as many participants as possible. By awarding tokens to
      testers who have put their time and energy into scrutinizing the Melon
      software, it will also ensure adoption and help to further improve the
      codebase. The contribution period will be split into rounds referred to as
      Melon Olympiad capsules, with a portion of tokens allocated for each
      stage. Upon completion of the Melon Olympiad, all 500,600 tokens will have
      been issued. In keeping with the mythology and provenance of the Olympic
      Games, each round will be named after a Greek island, commencing with
      Paros. Participants will be obliged to create a fund and send Ether to the
      relevant Olympiad smart-contract, which will then be matched with an
      equivalent amount of MLN tokens plus an additional incentive amount. It is
      then up to the participant to manage the fund for a period of one month
      with a view to maximizing capital appreciation. The Melon Protocol intends
      to present a decentralized, public, permissionless, robust infrastructure
      for the secure management of digital assets on the Ethereum blockchain. It
      aims to be a viable, low-cost alternative to the current fund management
      ecosystem which has evolved similarly across most legal jurisdictions. The
      protocol itself is a collection of smart-contracts written in the Solidity
      programming language. Supporting functionality that allows browsers to
      freely interact with the protocol is provided by the javascript library
      Melon.js. For more information visit: https://docs.melonport.com and our
      github https://github.com/melonproject/. Participants interested in taking
      part in the Melon Olympiad Paros can register by following the
      instructions provided below.
    </p>
    <h2>Melon Olympiad, first round: Paros</h2>
    <p>
      For the Paros round, the participant compensation is as follows: for each
      ether contributed, the participant will receive 20 MLN (subject to change
      prior to the start of the Paros Olympiad in the event of price
      volatility).
    </p>
    <h2>Instructions on how to participate</h2>
    <p>
      Melonport AG is required to issue tokens via a regulated financial
      intermediary which is subject to KYC/AML procedures. To perform the
      KYC/AML processes, our chosen partner is Bitcoin Suisse. Each individual
      willing to participate will have to register with Bitcoin Suisse.
    </p>
    <h4>Step 1</h4> <p>
      Generate a wallet on this website (see instructions below).. Make sure
      your write down the mnemonic, and store it in a safe (and accessible)
      place. Make sure you remember the password you use to encrypt the wallet.
      If you forget your password and you loose access to the mnemonic phrase,
      you won't be able to participate in the challenge. Make sure you download
      your wallet as a JSON file and store it in a safe place. Save the wallet
      address as you will need to provide this address to Bitcoin Suisse in step
      3.
    </p>
    <h4>Step 2 </h4> <p>
      The registration with Bitcoin Suisse opens today 28/05/2018 and will last
      until 18/06/2018. KYC with Bitcoin Suisse: go to
      https://ico.bitcoinsuisse.ch/ and create an account with Bitcoin Suisse.
      Follow the steps on the Bitcoin Suisse platform to get the KYC clearance.
      Make sure you upload all required documents. Bitcoin Suisse will inform
      you with an email once your KYC is approved. Once it is approved, you can
      move on to Step 3.{' '}
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
      contribute with. After this point, you need to wait until the official
      beginning of the challenge which will be announced shortly.
    </p>
    <h4>Step 5 </h4>{' '}
    <p>
       Official start of the Melon Olympiad, PAROS. Date will be announced in
      June.
    </p>
    <h4>Step 6  </h4>{' '}
    <p>
      Come back to this website olympiad.melon.fund. You will be guided to
      create your fund.
    </p>
    <h4>Step 7  </h4>{' '}
    <p>
      After creating your fund, you will be asked to enter the amount you wish
      to contribute with. Once you confirm that transaction, the amount of Ether
      will be transferred from your wallet to the Olympiad contract. In return,
      the Olympiad contract will transfer (via the requestInvestment function)
      the equivalent amount in MLN into your fund.
    </p>
    <h4>Step 8 </h4>{' '}
    <p>
      Congratulations. You made it here. Now its time to prove your asset
      management skills. You have 2 weeks to manage your fund and grow your
      capital.
    </p>
    <h4>Step 9  </h4>{' '}
    <p>
       At the end of the round, and only at the end, you, and only you, will
      have the option on your fund’s page to trigger the redemption of the
      shares and therefore to retrieve your earned assets using the wallet you
      generated in step 1.
    </p>
    <p>
      The terms and conditions must be read by all participants.{' '}
      <a
        href="https://ipfs.io/ipfs/QmbTsKQgACY9DzaW3SVSnLuCTo6f4H24SiXXfAyAGrTYTz"
        target="_blank"
      >
        Click here to read the terms and conditions for the second contribution
        period{' '}
      </a>.{' '}
      <a
        href="https://ipfs.io/ipfs/Qme4yLq3vFD2hiSyyJR3oukQYWMR9vBsducrNipWXLFnug"
        target="_blank"
      >
        {' '}
        Click here to read the terms and conditions for the Paros Olympiad
        (first capsule).{' '}
      </a>Please make sure you read carefully both documents. When you will
      create a fund, you will be prompted to cryptographically sign those terms
      and conditions to show your understanding and agreement.
    </p>
    <h2>Generate your wallet</h2>
    {!address ? (
      <div>
        <p>
          The wallet you generate here will be the wallet you will use to create
          a fund when the competition starts (referred to as manager address).
          It will be the wallet you will use to contribute ether to the Olympiad
          contract. It is also the wallet to which your compensation will be
          transferred to at the end of the period. Please make sure you
          carefully read the warnings below.
        </p>
        <p>
          The first step to perform if you wish to participate is to generate
          your wallet. Please click on the "Generate my wallet" button below:
        </p>
        <p>
          <Button
            basic
            color="black"
            style={{ width: '100%' }}
            onClick={goToGenerateAccount}
          >
            Generate my wallet!
          </Button>
          <br />
          <br />
          or
          <br />
          <br />
          <Button
            basic
            color="grey"
            style={{ width: '100%', padding: 5 }}
            onClick={goToAccount}
          >
            Import existing wallet
          </Button>
        </p>
      </div>
    ) : (
      <div>
        <p>
          You have already created a wallet with the address:{' '}
          <strong>{address}</strong>. Use this for white listing on{' '}
          <a href="https://ico.bitcoinsuisse.ch/" target="_blank">
            ico.bitcoinsuisse.ch
          </a>
          <Button
            basic
            color="grey"
            style={{ width: '100%', padding: 5 }}
            onClick={goToAccount}
          >
            Manage your account
          </Button>
        </p>
      </div>
    )}
  </div>
);

export default OlympiadPlaceholder;

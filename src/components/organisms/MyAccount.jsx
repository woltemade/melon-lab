import React from "react";
import { Button, Card, Header } from "semantic-ui-react";
import Link from "redux-first-router-link";

const MyAccount = ({
  currentAddress,
  associatedFund,
  deleteWallet,
  gotoAccount,
}) => (
  <div>
    <Card centered>
      <Card.Content>
        <Header as="h2">Account Management</Header>
        <p>
          Your ethereum address:{" "}
          <strong>
            <a
              href={`https://kovan.etherscan.io/address/${currentAddress}`}
              target="_blank"
            >
              {" "}
              {currentAddress}{" "}
            </a>
          </strong>
        </p>
        <p>
          Associated fund address:{" "}
          <strong>
            <a
              href={`https://kovan.etherscan.io/address/${associatedFund}`}
              target="_blank"
            >
              {associatedFund}
            </a>
          </strong>
        </p>
        <br />
        <p>
          <strong> [IMPORTANT] - Please read carefully</strong>{" "}
        </p>
        <br />
        <p>
          Careful, both below actions have <strong> irreversible</strong>{" "}
          effects. If you do not have a backup of the mnemonic phrase that
          generated your current address,
          <strong>
            {" "}
            you will never be able to access your current account again{" "}
          </strong>{" "}
          after performing one of the below actions.
        </p>
        <p>
          If you do not wish to continue,{" "}
          <Link to="/">click here to go back to your fund's page</Link>.
        </p>
        <br />
        <p>
          <Button
            basic
            color="black"
            style={{ width: "100%" }}
            onClick={gotoAccount}
          >
            Create new wallet or restore existing one
          </Button>
        </p>
        <p>
          <Button
            basic
            color="black"
            style={{ width: "100%" }}
            onClick={deleteWallet}
          >
            Delete account
          </Button>
        </p>
      </Card.Content>
    </Card>
  </div>
);

export default MyAccount;

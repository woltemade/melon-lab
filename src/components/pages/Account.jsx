import React from "react";
import { Card, Header } from "semantic-ui-react";
import Done from "../organisms/account/Done";
import Encrypt from "../../containers/Encrypt";
import Generate from "../organisms/account/Generate";
import WriteDown from "../organisms/account/WriteDown";

const renderContent = props => {
  const { hasGenerated, hasSavedMnemonic, hasEncrypted } = props;

  if (!hasGenerated) {
    return <Generate {...props} />;
  } else if (!hasSavedMnemonic) {
    return <WriteDown {...props} />;
  } else if (!hasEncrypted) {
    return <Encrypt {...props} />;
  }

  return <Done {...props} />;
};

const Account = props => (
  <Card centered>
    <Card.Content>
      <Header as="h2">Welcome to Melon</Header>
      {renderContent(props)}
    </Card.Content>
  </Card>
);

export default Account;

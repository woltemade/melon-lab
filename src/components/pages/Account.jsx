import React from "react";
import { Card, Header } from "semantic-ui-react";
import Encrypt from "../../containers/Encrypt";
import Generate from "../organisms/account/Generate";
import WriteDown from "../organisms/account/WriteDown";

const renderContent = props => {
  const { hasGenerated, hasSavedMnemonic } = props;

  if (!hasGenerated) {
    return <Generate {...props} />;
  } else if (!hasSavedMnemonic) {
    return <WriteDown {...props} />;
  }

  return <Encrypt {...props} />;
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

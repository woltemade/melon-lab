import React from "react";
import { Button } from "semantic-ui-react";
import PropTypes from "prop-types";

const MyButton = props =>
  (<Button>
    {props.buttonName}
  </Button>);

MyButton.propTypes = {
  buttonName: PropTypes.string,
};

MyButton.defaultProps = {
  buttonName: "Create my fund",
};

export default MyButton;

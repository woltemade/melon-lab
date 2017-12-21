import React from "react";
import {
  Segment,
  Container,
  Card,
  Header,
  Loader,
  Button
} from "semantic-ui-react";
import { Field } from "redux-form";
import ReactModal from "react-modal";
import renderInput from "../utils/renderInput";

export const types = {
  ERROR: "ERROR",
  LOADING: "LOADING",
  CONFIRM: "CONFIRM",
  INFO: "INFO"
};

const style = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)"
  },
  content: {
    position: "absolute",
    top: "40px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    border: "none",
    background: "transparent",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "4px",
    outline: "none",
    padding: "20px"
  }
};

const markError = {
  color: "rgb(201, 88, 88)"
};

const errorStyle = {
  ...style,
  content: {
    ...style.content,
    ...markError
  }
};

const renderButtons = (
  primaryAction,
  primaryActionText,
  secondaryAction,
  secondaryActionText
) =>
  secondaryActionText && secondaryAction ? (
    <div>
      <Button style={{ width: "46%" }} onClick={primaryAction}>
        {primaryActionText}
      </Button>
      <Button
        style={{ width: "46%", float: "right" }}
        onClick={secondaryAction}
      >
        {secondaryActionText}
      </Button>
    </div>
  ) : (
    <Button style={{ width: "100%" }} onClick={primaryAction}>
      {primaryActionText}
    </Button>
  );

const Modal = ({
  isOpen,
  type,
  title,
  body,
  primaryAction,
  primaryActionText,
  secondaryAction,
  secondaryActionText
}) => (
  <ReactModal isOpen={isOpen} style={type === types.ERROR ? errorStyle : style}>
    <Container>
      <Card centered style={{ backgroundColor: "#fffdf3", padding: 10 }}>
        <Card.Content>
          {" "}
          <form>
            <Header as="h2" style={type === types.ERROR ? markError : {}}>
              {title}
            </Header>
            <p>{body}</p>

            {type === types.CONFIRM ? (
              <p>
                <Field
                  name="password"
                  component={renderInput}
                  type="password"
                />
              </p>
            ) : null}

            {type !== types.LOADING ? (
              renderButtons(
                primaryAction,
                primaryActionText,
                secondaryAction,
                secondaryActionText
              )
            ) : (
              <Segment
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  boxShadow: "none"
                }}
              >
                <Loader active={type === types.LOADING} />
              </Segment>
            )}
          </form>
        </Card.Content>
      </Card>
    </Container>
  </ReactModal>
);

export default Modal;

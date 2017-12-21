import React from "react";
import { Image, Container } from "semantic-ui-react";
import ReactModal from "react-modal";

export const types = {
  ERROR: "ERROR",
  LOADING: "LOADING",
  CONFIRM: "CONFIRM",
  INFO: "INFO"
};

const Modal = ({ isOpen, type }) => (
  <ReactModal isOpen>
    <Container>
      <div className="App-header" style={{ margin: "2em" }}>
        <Image src="./melon-logo.png" size="small" centered />
      </div>
    </Container>
  </ReactModal>
);

export default Modal;

import { types as modalTypes } from "../components/pages/Modal";

export const types = {
  OPEN: "OPEN:modal:melon.fund",
  CLOSE: "CLOSE:modal:melon.fund",
  CANCEL: "CANCEL:modal:melon.fund",
  CONFIRM: "CONFIRM:modal:melon.fund",
  CONFIRMED: "CONFIRMED:modal:melon.fund",
  ERROR: "ERROR:modal:melon.fund",
  LOADING: "LOADING:modal.melon.fund"
};

export const actions = {
  open: ({ title, body, primaryActionText, secondaryActionText }) => ({
    type: types.OPEN,
    isOpen: true,
    modalType: modalTypes.INFO,
    title,
    body,
    primaryActionText,
    secondaryActionText
  }),
  close: () => ({
    type: types.CLOSE,
    isOpen: false
  }),
  cancel: () => ({
    type: types.CANCEL,
    isOpen: false
  }),
  confirm: body => ({
    type: types.CONFIRM,
    isOpen: true,
    modalType: modalTypes.CONFIRM,
    title: "Confirm transaction",
    body,
    primaryActionText: "Confirm",
    secondaryActionText: "Cancel"
  }),
  confirmed: password => ({
    type: types.CONFIRMED,
    isOpen: false,
    password
  }),
  error: body => ({
    type: types.ERROR,
    isOpen: true,
    modalType: modalTypes.ERROR,
    title: "Transaction error",
    body,
    primaryActionText: "Ok"
  }),
  loading: (body = "Sending transaction ...") => ({
    type: types.LOADING,
    isOpen: true,
    modalType: modalTypes.LOADING,
    title: "Please wait",
    body
  })
};

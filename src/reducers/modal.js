import { types as modalTypes } from "../components/pages/Modal";

export const initialState = {
  isOpen: false,
  modalType: modalTypes.INFO,
  title: "",
  body: "",
  primaryActionText: "Ok",
  secondaryActionText: ""
};

export const reducer = (state = initialState, action = {}) => {
  const { type, ...params } = action;

  return {
    ...state,
    ...params
  };
};

export default reducer;

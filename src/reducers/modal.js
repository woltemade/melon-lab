import { types as actionTypes } from "../actions/modal";
import { types as modalTypes } from "../components/pages/Modal";

export const initialState = {
  isOpen: false,
  modalType: modalTypes.INFO,
  title: "",
  body: "",
  primaryAction: "Ok",
  secondaryAction: "",
};

export const reducer = (state = initialState, action = {}) => {
  const { type, ...params } = action;

  return Object.values(actionTypes).includes(type)
    ? {
        ...state,
        ...params,
      }
    : state;
};

export default reducer;

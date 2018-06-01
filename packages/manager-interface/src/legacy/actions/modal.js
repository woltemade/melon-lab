import { types as modalTypes } from '../components/pages/Modal';

export const types = {
  OPEN: 'OPEN:modal:melon.fund',
  CLOSE: 'CLOSE:modal:melon.fund',
  CANCEL: 'CANCEL:modal:melon.fund',
  CONFIRM: 'CONFIRM:modal:melon.fund',
  CONFIRMED: 'CONFIRMED:modal:melon.fund',
  ERROR: 'ERROR:modal:melon.fund',
  LOADING: 'LOADING:modal.melon.fund',
  PASSWORD: 'PASSWORD:modal.melon.fund',
  PASSWORD_ENTERED: 'PASSWORD_ENTERED:modal:melon.fund',
};

// Actions bound to the buttons
export const interactions = {
  OK: 'Ok',
  CANCEL: 'Cancel',
  CONFIRM: 'Confirm',
  PASSWORD: 'Password',
  RETRY: 'Retry',
};

export const actions = {
  open: ({ title, body, primaryInteraction, secondaryInteraction }) => ({
    type: types.OPEN,
    isOpen: true,
    modalType: modalTypes.INFO,
    title,
    body,
    primaryInteraction,
    secondaryInteraction,
  }),

  close: () => ({
    type: types.CLOSE,
    isOpen: false,
  }),
  cancel: () => ({
    type: types.CANCEL,
    isOpen: false,
  }),
  confirm: body => ({
    type: types.CONFIRM,
    isOpen: true,
    modalType: modalTypes.CONFIRM,
    title: 'Confirm',
    body,
    primaryInteraction: interactions.CONFIRM,
    secondaryInteraction: interactions.CANCEL,
  }),
  confirmed: () => ({
    type: types.CONFIRMED,
    isOpen: false,
  }),
  password: body => ({
    type: types.PASSWORD,
    isOpen: true,
    modalType: modalTypes.PASSWORD,
    title: 'Enter password',
    body,
    primaryInteraction: interactions.PASSWORD,
    secondaryInteraction: interactions.CANCEL,
  }),
  passwordEntered: password => ({
    type: types.PASSWORD_ENTERED,
    isOpen: false,
    password,
  }),
  error: body => ({
    type: types.ERROR,
    isOpen: true,
    modalType: modalTypes.ERROR,
    title: 'Error',
    body,
    primaryInteraction: interactions.OK,
    secondaryInteraction: '',
  }),
  loading: (body = 'Sending transaction ...') => ({
    type: types.LOADING,
    isOpen: true,
    modalType: modalTypes.LOADING,
    title: 'Please wait',
    body,
  }),
};

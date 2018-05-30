export const types = {
  GENERATE_WALLET_REQUESTED: 'GENERATE_WALLET_REQUESTED:newuser:melon.fund',
  GENERATE_WALLET_SUCCEEDED: 'GENERATE_WALLET_SUCCEEDED:newuser:melon.fund',
  GENERATE_WALLET_FAILED: 'GENERATE_WALLET_FAILED:newuser:melon.fund',
  ENCRYPT_WALLET_REQUESTED: 'ENCRYPT_WALLET_REQUESTED:newuser:melon.fund',
  ENCRYPT_WALLET_SUCCEEDED: 'ENCRYPT_WALLET_SUCCEEDED:newuser:melon.fund',
  RESTORE_FROM_MNEMONIC_REQUESTED:
    'RESTORE_FROM_MNEMONIC_REQUESTED:newuser:melon.fund',
  RESTORE_FROM_MNEMONIC_SUCCEEDED:
    'RESTORE_FROM_MNEMONIC_SUCCEEDED:newuser:melon.fund',
  RESTORE_FROM_MNEMONIC_FAILED:
    'RESTORE_FROM_MNEMONIC_FAILED:newuser:melon.fund',
  DELETE_WALLET_REQUESTED: 'DELETE_WALLET_REQUESTED:newuser:melon.fund',
  DO_DELETE_WALLET: 'DO_DELETE_WALLET:newuser:melon.fund',
  DOWNLOAD_JSON: 'DOWNLOAD_JSON:newuser:melon.fund',
  IMPORT_JSON: 'IMPORT_JSON:newuser:melon.fund',
  IMPORT_WALLET_REQUESTED: 'IMPORT_WALLET_REQUESTED:newuser:melon.fund',
  IMPORT_WALLET_SUCCEEDED: 'IMPORT_WALLET_SUCCEEDED:newuser:melon.fund',
  IMPORT_WALLET_FAILED: 'IMPORT_WALLET_FAILED:newuser:melon.fund',
};

export const actions = {
  generateWallet: () => ({
    type: types.GENERATE_WALLET_REQUESTED,
    loading: false,
  }),
  generateWalletFailed: reason => ({
    type: types.GENERATE_WALLET_FAILED,
    reason,
  }),
  generateWalletSucceeded: mnemonic => ({
    type: types.GENERATE_WALLET_SUCCEEDED,
    hasGenerated: true,
    mnemonic,
  }),
  importWallet: encryptedWalletString => ({
    type: types.IMPORT_WALLET_REQUESTED,
    loading: false,
    encryptedWalletString,
  }),
  importWalletFailed: reason => ({
    type: types.IMPORT_WALLET_FAILED,
    reason,
  }),
  importWalletSucceeded: wallet => ({
    type: types.IMPORT_WALLET_SUCCEEDED,
    hasGenerated: true,
    address: wallet.address,
    privateKey: wallet.privateKey,
  }),
  encryptWallet: password => ({
    type: types.ENCRYPT_WALLET_REQUESTED,
    password,
    loading: true,
  }),
  encryptWalletSucceeded: () => ({
    type: types.ENCRYPT_WALLET_SUCCEEDED,
    hasEncrypted: true,
  }),
  restoreFromMnemonic: mnemonic => ({
    type: types.RESTORE_FROM_MNEMONIC_REQUESTED,
    mnemonic,
  }),
  restoreFromMnemonicSucceeded: wallet => ({
    type: types.RESTORE_FROM_MNEMONIC_SUCCEEDED,
    hasGenerated: true,
    hasSavedMnemonic: true,
    address: wallet.address,
    privateKey: wallet.privateKey,
  }),
  restoreFromMnemonicFailed: reason => ({
    type: types.RESTORE_FROM_MNEMONIC_FAILED,
    reason,
  }),
  deleteWallet: () => ({
    type: types.DELETE_WALLET_REQUESTED,
  }),
  doDeleteWallet: () => ({
    type: types.DO_DELETE_WALLET,
    hasGenerated: false,
    hasSavedMnemonic: false,
    hasEncrypted: false,
    address: '',
    mnemonic: '',
    loading: false,
    privateKey: '',
  }),
  downloadJSON: () => ({
    type: types.DOWNLOAD_JSON,
  }),
};

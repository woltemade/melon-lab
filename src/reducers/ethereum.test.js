import { providers, networks, reducer } from "./ethereum";
import { creators } from "../actions/ethereum";

const expectObservedStateToBeUnchanged = (oldState, newState) => {
  Object.entries(oldState).map(([key, value]) =>
    expect(newState[key]).toBe(value),
  );
};

it("Not ready on main net", () => {
  const oldState = {
    account: "0xDEADBEEF",
    balance: "1.2",
    blockNumber: 1000,
    lastUpdate: new Date(),
    network: networks.MAIN,
    provider: providers.METAMASK,
    isConnected: true,
    syncing: false,
  };

  const newState = reducer(oldState);

  expectObservedStateToBeUnchanged(oldState, newState);
  expect(newState.networkName).toBe("MAIN");
});

it("Ready to trade on Kovan with account", () => {
  const oldState = {
    account: "0xDEADBEEF",
    balance: "1.2",
    blockNumber: 1000,
    lastUpdate: new Date(),
    network: networks.KOVAN,
    provider: providers.PARITY,
    isConnected: true,
  };

  const newState = reducer(oldState);

  expectObservedStateToBeUnchanged(oldState, newState);
  expect(newState.networkName).toBe("KOVAN");
});

it("Ready to visit", () => {
  const oldState = {
    blockNumber: 1000,
    lastUpdate: new Date(),
    network: networks.KOVAN,
    provider: providers.HOSTED,
    isConnected: true,
  };

  const newState = reducer(oldState);

  expectObservedStateToBeUnchanged(oldState, newState);
});

it("Not ready while syncing to trade on Kovan with account", () => {
  const oldState = {
    account: "0xDEADBEEF",
    balance: "1.2",
    blockNumber: 1000,
    lastUpdate: new Date(),
    network: networks.KOVAN,
    provider: providers.PARITY,
    syncing: true,
  };

  const newState = reducer(oldState);

  expectObservedStateToBeUnchanged(oldState, newState);
});

it("setProvider", () => {
  const initialState = reducer();
  const action = creators.setProvider(providers.PARITY);
  const newState = reducer(initialState, action);

  expect(newState.provider).toBe(providers.PARITY);
});

it("unknown action", () => {
  const initialState = reducer();
  const newState = reducer(initialState, { type: "ASDF", provider: "asfd" });

  expectObservedStateToBeUnchanged(initialState, newState);
});

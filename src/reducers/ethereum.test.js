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
  };

  const newState = reducer(oldState);

  expectObservedStateToBeUnchanged(oldState, newState);

  expect(newState.isConnected).toBe(true);
  expect(newState.isReadyToVisit).toBe(false);
  expect(newState.isReadyToTrade).toBe(false);
});

it("Ready to trade on Kovan with account", () => {
  const oldState = {
    account: "0xDEADBEEF",
    balance: "1.2",
    blockNumber: 1000,
    lastUpdate: new Date(),
    network: networks.KOVAN,
    provider: providers.PARITY,
  };

  const newState = reducer(oldState);

  expectObservedStateToBeUnchanged(oldState, newState);

  expect(newState.isConnected).toBe(true);
  expect(newState.isReadyToVisit).toBe(true);
  expect(newState.isReadyToTrade).toBe(true);
});

it("Ready to visit", () => {
  const oldState = {
    blockNumber: 1000,
    lastUpdate: new Date(),
    network: networks.KOVAN,
    provider: providers.HOSTED,
  };

  const newState = reducer(oldState);

  expectObservedStateToBeUnchanged(oldState, newState);

  expect(newState.isConnected).toBe(true);
  expect(newState.isReadyToVisit).toBe(true);
  expect(newState.isReadyToTrade).toBe(false);
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

  expect(newState.isConnected).toBe(true);
  expect(newState.isReadyToVisit).toBe(false);
  expect(newState.isReadyToTrade).toBe(false);
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

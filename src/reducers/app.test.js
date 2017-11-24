import { providers, networks } from "@melonproject/melon.js";
import { actions } from "../actions/ethereum";
import { reducer, onboardingPath } from "./app";

it("Sets provider", () => {
  const initialState = reducer();
  const newState = reducer(initialState, actions.setProvider(providers.PARITY));
  expect(newState.onboardingState).toBe(onboardingPath.NO_CONNECTION);
});

it("Set right network: Kovan", () => {
  const initialState = reducer();
  const newState = reducer(initialState, actions.hasConnected(networks.KOVAN));
  expect(newState.onboardingState).toBe(onboardingPath.LOCKED_ACCOUNT);
});

it("Set wrong network: Main", () => {
  const initialState = reducer();
  const newState = reducer(initialState, actions.hasConnected(networks.MAIN));
  expect(newState.onboardingState).toBe(onboardingPath.WRONG_NETWORK);
});

it("New block: Ready to transact", () => {
  const initialState = reducer();
  initialState.onboardingState = onboardingPath.NO_FUND_CREATED;

  const newState = reducer(
    initialState,
    actions.newBlock({
      blockNumber: 1234,
      syncing: false,
      balance: "10.2",
      account: "0xDEADBEEF",
      network: networks.KOVAN,
    }),
  );
  expect(newState.isReadyToVisit).toBe(true);
  expect(newState.isReadyToInteract).toBe(true);
  expect(newState.onboardingState).toBe(onboardingPath.NO_FUND_CREATED);
});

it("New block: Out of ETH", () => {
  const initialState = reducer();
  const newState = reducer(
    initialState,
    actions.newBlock({
      blockNumber: 1234,
      syncing: false,
      account: "0xDEADBEEF",
      network: networks.KOVAN,
    }),
  );
  expect(newState.isReadyToVisit).toBe(true);
  expect(newState.isReadyToInteract).toBe(false);
  expect(newState.onboardingState).toBe(onboardingPath.INSUFFICENT_ETH);
});

it("New block: Wrong network", () => {
  const initialState = reducer();
  const newState = reducer(
    initialState,
    actions.newBlock({
      blockNumber: 1234,
      syncing: false,
      balance: "10.2",
      account: "0xDEADBEEF",
      network: networks.MAIN,
    }),
  );
  expect(newState.isReadyToVisit).toBe(false);
  expect(newState.isReadyToInteract).toBe(false);
  expect(newState.onboardingState).toBe(onboardingPath.WRONG_NETWORK);
});

it("New block: Locked account", () => {
  const initialState = reducer();
  const newState = reducer(
    initialState,
    actions.newBlock({
      blockNumber: 1234,
      syncing: false,
      network: networks.KOVAN,
    }),
  );
  expect(newState.isReadyToVisit).toBe(true);
  expect(newState.isReadyToInteract).toBe(false);
  expect(newState.onboardingState).toBe(onboardingPath.LOCKED_ACCOUNT);
});

it("New block: Syncing", () => {
  const initialState = reducer();
  const newState = reducer(
    initialState,
    actions.newBlock({
      blockNumber: 1234,
      syncing: true,
      balance: "10.2",
      account: "0xDEADBEEF",
      network: networks.KOVAN,
    }),
  );
  expect(newState.isReadyToVisit).toBe(true);
  expect(newState.isReadyToInteract).toBe(false);
  expect(newState.onboardingState).toBe(onboardingPath.NO_FUND_CREATED);
});

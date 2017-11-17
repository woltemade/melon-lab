import { creators } from "../actions/ethereum";
import { providers, networks } from "./ethereum";
import { reducer, onboardingPath } from "./app";

it("Sets provider", () => {
  const initialState = reducer();
  const newState = reducer(
    initialState,
    creators.setProvider(providers.PARITY),
  );
  expect(newState.onboardingState).toBe(onboardingPath.NO_CONNECTION);
});

it("Set right network: Kovan", () => {
  const initialState = reducer();
  const newState = reducer(initialState, creators.hasConnected(networks.KOVAN));
  expect(newState.onboardingState).toBe(onboardingPath.LOCKED_ACCOUNT);
});

it("Set wrong network: Main", () => {
  const initialState = reducer();
  const newState = reducer(initialState, creators.hasConnected(networks.MAIN));
  expect(newState.onboardingState).toBe(onboardingPath.WRONG_NETWORK);
});

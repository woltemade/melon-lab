import { creators } from "../actions/ethereum";
import { providers } from "./ethereum";
import { reducer, onboardingPath } from "./app";

it("Sets provider", () => {
  const initialState = reducer();
  const newState = reducer(
    initialState,
    creators.setProvider(providers.PARITY),
  );
  expect(newState.onboardingState).toBe(onboardingPath.NO_CONNECTION);
});

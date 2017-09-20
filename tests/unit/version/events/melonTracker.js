import melonTracker from "../../../../lib/version/events/melonTracker";

/* eslint-disable global-require */
jest.mock("truffle-contract", () => require("../../../mocks/truffle-contract"));
/* eslint-enable */

it("tracker", done => {
  const tracker = melonTracker.on("DataUpdated");
  tracker(data => {
    tracker.stop();
    expect(data.id).toBe(1);
    done();
  });
});

// TODO: Activate those two. They work stand alone, but not together
xit("await next emit", async () => {
  const nextEmit = await melonTracker.on("DataUpdated").next();
  expect(nextEmit.id).toBe(1);
});

xit("await a number of emits", async () => {
  const secondEmit = await melonTracker.on("DataUpdated").times(2);
  expect(secondEmit).toBeTruthy();
});

it("stop watching", async () =>
  new Promise((resolve, reject) => {
    let timesTriggered = 0;

    const tracker = melonTracker.on("DataUpdated");
    tracker(() => {
      tracker.stop();
      timesTriggered += 1;
      if (timesTriggered > 1) reject("Tracker wasnt stopped");
    });

    global.setTimeout(() => resolve(), 10);
  }));

it("global off", async () =>
  new Promise((resolve, reject) => {
    const tracker = melonTracker.on("DataUpdated");
    tracker(() => {
      reject("Tracker wasnt stopped");
    });
    melonTracker.off();
    global.setTimeout(() => resolve(), 10);
  }));

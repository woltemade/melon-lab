// @flow
import trace from "./trace";

function EnsureError(message) {
  this.name = "EnsureError";
  this.message = message || "Ensure failed";
  this.stack = new Error().stack;
}
EnsureError.prototype = Object.create(Error.prototype);
EnsureError.prototype.constructor = EnsureError;

/**
 * Similar to asset but throws on runtime if `condition` isn't met.
 * Possibility to add a `message` and some `data` to trace.
 * @throws {EnsureError}
 */
const ensure = (condition: boolean, message: string, data: any): void => {
  if (condition !== true) {
    trace({ message, category: "ensureFailed", data: { condition, data } });
    throw new EnsureError(message);
  }
};

export default ensure;

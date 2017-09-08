// @flow
import trace from "./trace";

function EnsureError(message) {
  this.name = "EnsureError";
  this.message = message || "Ensure failed";
  this.stack = new Error().stack;
}
EnsureError.prototype = Object.create(Error.prototype);
EnsureError.prototype.constructor = EnsureError;

const ensure = (condition: boolean, message: string, data: object): void => {
  if (condition !== true) {
    trace({ message, category: "ensureFailed", data: { condition, data } });
    throw new EnsureError(message);
  }
};

export default ensure;

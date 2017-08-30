import trace from "./trace";

function EnsureError(message) {
  this.name = "EnsureError";
  this.message = message || "Assure failed";
  this.stack = new Error().stack;
}
EnsureError.prototype = Object.create(Error.prototype);
EnsureError.prototype.constructor = EnsureError;

const ensure = (condition, message, data) => {
  if (!condition) {
    trace({ message, category: "ensureFailed", data });
    throw new EnsureError(message);
  }
};

export default ensure;

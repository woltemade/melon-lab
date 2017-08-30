import setup from "./setup";

const traces = new Set();

const trace = ({ message, category = "trace", data }) => {
  const newTrace = { timestamp: new Date(), message, category, data };
  traces.add(newTrace);
  setup.tracer({ ...newTrace, traces });
};

export default trace;

import getEnvironment from './getEnvironment';

const setEnvironment = environment => {
  const currentEnvironment = getEnvironment();
  Object.assign(currentEnvironment, environment);
};

export default setEnvironment;

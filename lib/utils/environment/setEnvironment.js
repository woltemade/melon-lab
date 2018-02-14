import { environment } from './getEnvironment';

const setEnvironment = newEnvironment => {
  Object.assign(environment, newEnvironment);
};

export default setEnvironment;

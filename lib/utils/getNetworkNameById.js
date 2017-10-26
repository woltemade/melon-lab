// @flow
/**
 * `id` to name mapping helper
 */
const getNetworkNameById = (id: number): string => {
  const networkMapping = {
    4: "Rinkeby",
    3: "Ropsten",
    42: "Kovan",
    1: "Main",
    null: "Private",
  };
  return (
    networkMapping[id] ||
    (() => {
      throw new Error(`Network with id ${id} not recognized`);
    })()
  );
};

export default getNetworkNameById;

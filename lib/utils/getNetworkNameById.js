const getNetworkNameById = id => {
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

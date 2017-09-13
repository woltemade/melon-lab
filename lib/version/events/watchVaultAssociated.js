import setup from "../../utils/setup";
import getConfig from "../../universe/calls/getConfig";

const watchVaultAssociated = async (vaultAddress, onChange) => {
  const universeConfig = await getConfig();

  console.log(universeConfig);

  setup.web3.eth.filter(
    { address: [vaultAddress, universeConfig.exchangeAddress] },
    (err, res) => {
      console.log({ err, res });
    },
  );
};

export default watchVaultAssociated;

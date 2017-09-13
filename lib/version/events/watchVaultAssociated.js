import setup from "../../utils/setup";
import getConfig from "../../universe/calls/getConfig";
import exchangeEventMap from "../../exchange/events/exchangeEventMap";

const watchVaultAssociated = async (vaultAddress, onChange) => {
  const universeConfig = await getConfig();

  console.log(exchangeEventMap);

  setup.web3.eth.filter(
    { address: [vaultAddress, universeConfig.exchangeAddress] },
    (err, res) => {
      console.log({ err, res });
    },
  );
};

export default watchVaultAssociated;

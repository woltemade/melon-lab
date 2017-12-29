import moment from "moment";
import { connect } from "react-redux";

import Factsheet from "../components/organisms/Factsheet";
import displayNumber from "../utils/displayNumber";

const buildTwitterUrl = (isOwner, fundAddress, fundName, sharePrice) => {
  const text = isOwner
    ? `My #MelonFund "${fundName}" has a share price currently of ${displayNumber(
        sharePrice,
      )}. Have a look:`
    : `The #MelonFund "${fundName}" has a share price currently of ${displayNumber(
        sharePrice,
      )}. Have a look:`;

  const url = `https://ipfs.io/ipns/melon.fund/#${fundAddress}`;
  const hashtags = "TechnologyRegulatedFunds,Melon";
  const via = "melonport";
  const related = "melonport";

  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text,
  )}&url=${encodeURIComponent(url)}&hashtags=${encodeURIComponent(
    hashtags,
  )}&via=${encodeURIComponent(via)}&related=${encodeURIComponent(related)}`;
};

const mapStateToProps = state => ({
  aum: displayNumber(state.fund.gav),
  creationDate: moment(state.fund.creationDate).format("D. MMM YYYY HH:mm"),
  loading: state.app.transactionInProgress,
  managementReward: displayNumber(state.fund.managementReward),
  name: state.fund.name,
  performanceReward: displayNumber(state.fund.performanceReward),
  personalStake: displayNumber(state.fund.personalStake),
  sharePrice: displayNumber(state.fund.sharePrice),
  totalSupply: displayNumber(state.fund.totalSupply),
  tweetHref: buildTwitterUrl(
    state.fund.owner === state.ethereum.account,
    state.fund.address,
    state.fund.name,
    state.fund.sharePrice,
  ),
});

const FactsheetContainter = connect(mapStateToProps)(Factsheet);

export default FactsheetContainter;

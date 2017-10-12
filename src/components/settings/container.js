import BigNumber from "bignumber.js";
import { connect } from "react-redux";
import Settings from "./settings";
import { creators } from "./duck";

const mapStateToProps = state => ({
  ...state.settings,
});

const mapDispatchToProps = dispatch => ({
  onRequest: () => {
    dispatch(creators.requestSettings());
  },
  onUpdate: event => {
    dispatch(
      creators.updateSettings({ [event.target.name]: event.target.value }),
    );
  },
  onToggle: toggleType => {
    dispatch(creators.toggle(toggleType));
  },
  convertUnclaimedRewards: () => {
    dispatch(creators.convertUnclaimedRewards());
  },
  shutDown: () => {
    dispatch(creators.shutDown());
  },
});

const SettingsContainer = connect(mapStateToProps, mapDispatchToProps)(
  Settings,
);

export default SettingsContainer;

import { connect } from 'react-redux'
import Waiting from '../components/Waiting'
import dotty from 'dotty'

const mapStateToProps = (state) => {
  return {
  	group: dotty.get(state, "game.group"),
    player: dotty.get(state, "game.player")
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const WaitingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Waiting);

export default WaitingContainer;

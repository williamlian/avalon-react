import { connect } from 'react-redux'
import Game from '../components/Game'
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

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

export default GameContainer;

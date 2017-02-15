import { connect } from 'react-redux'
import App from '../components/App'
import {receivePlayerView, abandon, unsubscribe, quit} from '../actions'
import dotty from 'dotty'

const mapStateToProps = (state) => {
  return {
  	playerId: dotty.get(state, 'game.player.id'),
  	gameStatus: dotty.get(state, 'game.group.status'),
    group: dotty.get(state, 'game.group'),
    player: dotty.get(state, 'game.player'),
    error: state.error,
    errorMessage: state.errorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  	receivePlayerViewAction: (playerView) => {
  		dispatch(receivePlayerView(playerView));
  	},
    abandonAction: () => {
      dispatch(abandon());
    },
    unsubscribeAction: () => {
      dispatch(unsubscribe());
    },
    quitAction: () => {
      dispatch(quit());
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;

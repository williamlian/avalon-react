import { connect } from 'react-redux'
import App from '../components/App'
import {getPlayerView, abandon, unsubscribe} from '../actions'
import dotty from 'dotty'

const mapStateToProps = (state) => {
  return {
  	playerId: dotty.get(state, 'game.player.id'),
  	gameStatus: dotty.get(state, 'game.group.status'),
    player: dotty.get(state, 'game.player'),
    error: state.error,
    errorMessage: state.errorMessage
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  	getPlayerViewAction: (playerId) => {
  		dispatch(getPlayerView(playerId));
  	},
    abandonAction: () => {
      dispatch(abandon());
    },
    unsubscribeAction: () => {
      dispatch(unsubscribe());
    }
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;

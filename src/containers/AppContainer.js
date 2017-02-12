import { connect } from 'react-redux'
import App from '../components/App'
import {getPlayerView} from '../actions'
import dotty from 'dotty'

const mapStateToProps = (state) => {
  return {
  	playerId: dotty.get(state, 'game.player.id'),
  	status: dotty.get(state, 'game.group.status')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  	getPlayerViewAction: (playerId) => {
  		dispatch(getPlayerView(playerId));
  	}
  };
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

export default AppContainer;

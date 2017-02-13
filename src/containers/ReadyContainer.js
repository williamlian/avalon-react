import { connect } from 'react-redux'
import Ready from '../components/Ready'
import {ready} from '../actions'
import dotty from 'dotty'

const mapStateToProps = (state) => {
  return {
  	groupId: dotty.get(state, "game.group.id")
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  	readyAction: (name, photo) => {
  		dispatch(ready(name, photo));
  	}
  };
};

const ReadyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Ready);

export default ReadyContainer;

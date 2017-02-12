import { connect } from 'react-redux'
import Entry from '../components/Entry'
import {createGroup, joinGroup} from '../actions'

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
  	createAction: (groupSize) => {
  		dispatch(createGroup(groupSize));
  	},
  	joinAction: (groupId) => {
  		dispatch(joinGroup(groupId));
  	},
  };
};

const EntryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Entry);

export default EntryContainer;

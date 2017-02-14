import dotty from 'dotty'
import { connect } from 'react-redux'
import CharacterList from '../components/CharacterList'
import {getCharacterList, submitCharacterList} from '../actions'

const mapStateToProps = (state) => {
  return {
  	characters: dotty.get(state, 'characters'),
    setting: dotty.get(state, 'game.group.setting')
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  	getCharacterListAction: () => {
  		dispatch(getCharacterList());
  	},
    submitAction: (characters) => {
      dispatch(submitCharacterList(characters));
    }
  };
};

const CharacterListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterList);

export default CharacterListContainer;

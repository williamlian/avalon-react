import { combineReducers } from 'redux'

const AppReducer = combineReducers({
	game: (state = {}, action) => {
    switch (action.type) {
      case 'CREATE_GROUP_SUCCESS':
      case 'JOIN_GROUP_SUCCESS':
      case 'RECEIVE_PLAYER_VIEW':
        return Object.assign({}, state, action.game);
      case 'CLEAN_UP':
        return {};
      default:
        return state;
    }
  },
  characters: (state = [], action) => {
    switch (action.type) {
      case 'RECEIVE_CHARACTER_LIST':
        return action.characters;
      default:
        return state;
    }
  },
  error: (state = false, action) => {
    switch (action.type) {
      case 'ERROR':
        return true;
      default:
        return false;
    }
  },
  errorMessage: (state = '', action) => {
    switch (action.type) {
      case 'ERROR':
        return action.message;
      default:
        return '';
    }
  }
});

export default AppReducer;

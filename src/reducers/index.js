import { combineReducers } from 'redux'

const AppReducer = combineReducers({
	game: (state = {}, action) => {
    switch (action.type) {
      case 'CREATE_GROUP_SUCCESS':
      case 'JOIN_GROUP_SUCESS':
      case 'RECEIVE_PLAYER_VIEW':
        return Object.assign({}, state, action.game);
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
  }
});

export default AppReducer;

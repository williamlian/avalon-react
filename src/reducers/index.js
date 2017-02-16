import { combineReducers } from 'redux'

const defaultState = {
  group: {
    setting: {}
  },
  player: {
    name: 'unknown'
  }
}

const AppReducer = combineReducers({
	game: (state = defaultState, action) => {
    switch (action.type) {
      case 'CREATE_GROUP_SUCCESS':
      case 'JOIN_GROUP_SUCCESS':
      case 'RECEIVE_PLAYER_VIEW':
        return Object.assign({}, state, action.game);
      case 'CLEAN_UP':
        return defaultState;
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
  },
  updated: (state = new Date(), action) => {
    switch (action.type) {
      case 'RECEIVE_PLAYER_VIEW':
      case 'ERROR':
        return new Date();
      default:
        return state;
    }
  }
});

export default AppReducer;

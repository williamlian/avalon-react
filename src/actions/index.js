import fetch from 'isomorphic-fetch'
import AppConstants from '../AppConstants'

export const createGroupSuccess = (groupJson) => {
  return {
    type: 'CREATE_GROUP_SUCCESS',
    game: groupJson
  };
};

export const createGroup = (groupSize) => {
  return function (dispatch) {
    return fetch(`${AppConstants.server}/api/group`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        size: groupSize
      })
    })
    .then(response => response.json())
    .then(json => dispatch(createGroupSuccess(json)));
  }
};

export const joinGroupSuccess = (groupJson) => {
  return {
    type: 'JOIN_GROUP_SUCCESS',
    game: groupJson
  };
};

export const joinGroup = (groupId) => {
  return function (dispatch) {
    return fetch(`${AppConstants.server}/api/group/${groupId}/join`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(json => dispatch(joinGroupSuccess(json)));
  }
};

export const receiveCharacterList = (characters) => {
  return {
    type: 'RECEIVE_CHARACTER_LIST',
    characters: characters
  };
}

export const getCharacterList = () => {
  return function(dispatch) {
    return fetch(`${AppConstants.server}/api/characters`)
      .then(response => response.json())
      .then(json => dispatch(receiveCharacterList(json.characters)));
  }
}

export const submitCharacterList = (characters) => {
  return function (dispatch, getState) {
    const state = getState();
    const groupId = state.game.group.id;
    const playerId = state.game.player.id;
    return fetch(`${AppConstants.server}/api/group/${groupId}/characters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        player_id: playerId,
        characters: characters
      })
    })
    .then(response => response.json())
  }
}

export const receivePlayerView = (gameView) => {
  return {
    type: 'RECEIVE_PLAYER_VIEW',
    game: gameView
  };
}

export const getPlayerView = () => {
  return function(dispatch, getState) {
    return fetch(`${AppConstants.server}/api/player_view?player_id=${getState().game.player.id}`)
      .then(response => response.json())
      .then(json => dispatch(receivePlayerView(json)));
  }
}

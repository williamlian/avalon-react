import dotty from 'dotty'
import fetch from 'isomorphic-fetch'
import AppConstants from '../AppConstants'

export const receiveError = (message) => {
  return {
    type: 'ERROR',
    message: message
  };
}

export const createGroupSuccess = (groupJson) => {
  return {
    type: 'CREATE_GROUP_SUCCESS',
    game: groupJson
  };
};

export const createGroup = (groupSize) => {
  return function (dispatch) {
    return buildRequest('POST', '/group', {
      size: groupSize
    })
    .then(response => handleResponse(response, dispatch, createGroupSuccess));
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
    return buildRequest('POST', `/group/${groupId}/join`, {})
    .then(response => handleResponse(response, dispatch, joinGroupSuccess));
  }
};

export const receiveCharacterList = (json) => {
  return {
    type: 'RECEIVE_CHARACTER_LIST',
    characters: json.characters
  };
}

export const getCharacterList = () => {
  return function(dispatch) {
    return fetch(`${AppConstants.server}/api/characters`)
      .then(response => handleResponse(response, dispatch, receiveCharacterList));
  }
}

export const submitCharacterList = (characters) => {
  return function (dispatch, getState) {
    const state = getState();
    const groupId = state.game.group.id;
    const playerId = state.game.player.id;
    return buildRequest('POST', `/group/${groupId}/characters`, {
      player_id: playerId,
      characters: characters
    })
    .then(response => handleResponse(response, dispatch, null));
  }
}

export const ready = (name, photo) => {
  return function (dispatch, getState) {
    const playerId = getState().game.player.id;
    return buildRequest('POST', '/ready', {
      player_id: playerId,
      name: name,
      photo: photo
    })
    .then(response => handleResponse(response, dispatch, null));
  };
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
      .then(response => handleResponse(response, dispatch, receivePlayerView));
  }
}

export const cleanup = () => {
  return {
    type: 'CLEAN_UP'
  };
}

export const unsubscribe = () => {
  return function(dispatch, getState) {
    const playerId = dotty.get(getState(), 'game.player.id');
    if (playerId) {
      return fetch(`${AppConstants.server}/api/unsubscribe/${playerId}`)
        .then(json => dispatch(cleanup()));
    }
  }
}

// set action to null to ignore response but only handle errors.
function handleResponse(response, dispatch, action) {
  if (response.ok) {
    response.json().then(json => {
      if (json.success) {
        if (action) {
          dispatch(action(json));
        }
      } else {
        dispatch(receiveError(json.message));
      }
    });
  } else {
    response.text().then(text => dispatch(receiveError(text)));
  }
}

function buildRequest(method, endpoint, body) {
  return fetch(`${AppConstants.server}/api${endpoint}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

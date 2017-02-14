import dotty from 'dotty'
import fetch from 'isomorphic-fetch'
import cookie from 'react-cookie';
import AppConstants from '../AppConstants'

export const receiveError = (message) => {
  return {
    type: 'ERROR',
    message: message
  };
}

export const createGroupSuccess = (groupJson) => {
  cookie.save('playerId', groupJson.player.id);
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
  cookie.save('playerId', groupJson.player.id);
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

export const nominate = (knights) => {
  return function (dispatch, getState) {
    const playerId = getState().game.player.id;
    return buildRequest('POST', '/nominate', {
      player_id: playerId,
      knights: knights
    })
    .then(response => handleResponse(response, dispatch, null)); 
  }
}

export const startVote = () => {
  return function (dispatch, getState) {
    const playerId = getState().game.player.id;
    return buildRequest('POST', '/start_vote', {
      player_id: playerId
    })
    .then(response => handleResponse(response, dispatch, null)); 
  }
}

export const vote = (approve) => {
  return function (dispatch, getState) {
    const playerId = getState().game.player.id;
    return buildRequest('POST', '/vote', {
      player_id: playerId,
      vote: approve
    })
    .then(response => handleResponse(response, dispatch, null));
  }
}

export const startQuest = () => {
  return function (dispatch, getState) {
    const playerId = getState().game.player.id;
    return buildRequest('POST', '/start_quest', {
      player_id: playerId
    })
    .then(response => handleResponse(response, dispatch, null));
  };
}

export const endTurn = () => {
  return function (dispatch, getState) {
    const playerId = getState().game.player.id;
    return buildRequest('POST', '/end_turn', {
      player_id: playerId
    })
    .then(response => handleResponse(response, dispatch, null));
  };
}

export const submitQuest = (success) => {
  return function (dispatch, getState) {
    const playerId = getState().game.player.id;
    return buildRequest('POST', '/submit_quest', {
      player_id: playerId,
      quest_result: success
    })
    .then(response => handleResponse(response, dispatch, null));
  };
}

/* ---------------------------------------------------------------- */

export const receivePlayerView = (gameView) => {
  return {
    type: 'RECEIVE_PLAYER_VIEW',
    game: gameView
  };
}

export const cleanup = () => {
  return {
    type: 'CLEAN_UP'
  };
}

export const getPlayerView = () => {
  return function(dispatch, getState) {
    return fetch(`${AppConstants.server}/api/player_view?player_id=${getState().game.player.id}`)
      .then(response => handleResponse(response, dispatch, receivePlayerView, cleanup));
  }
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

export const loadCookie = () => {
  const playerId = cookie.load('playerId');
  if (playerId) {
    return function(dispatch) {
      return fetch(`${AppConstants.server}/api/player_view?player_id=${playerId}`)
        .then(response => handleResponse(response, dispatch, receivePlayerView, error => {
          console.log('Cookie invalid, reset player ID');
          cookie.save('playerId', null);
          return {type: 'LOAD_COOKIE'};
        }));
    };
  }
  return {
    type: 'LOAD_COOKIE'
  };
}

export const abandon = () => {
  return function (dispatch, getState) {
    const playerId = getState().game.player.id;
    return buildRequest('POST', '/abandon', {
      player_id: playerId
    })
    .then(response => handleResponse(response, dispatch, null));
  };
}

/* ---------------------------------------------------------------- */

// set action to null to ignore response but only handle errors.
function handleResponse(response, dispatch, action, errorAction = receiveError) {
  if (response.ok) {
    response.json().then(json => {
      if (json.success) {
        if (action) {
          dispatch(action(json));
        }
      } else {
        if (errorAction) {
          dispatch(errorAction(json.message));
        }
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

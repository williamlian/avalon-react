import React, { Component, PropTypes } from 'react';
import AppConstants from '../AppConstants'

import EntryContainer from '../containers/EntryContainer'
import CharacterListContainer from '../containers/CharacterListContainer'
import ReadyContainer from '../containers/ReadyContainer'
import WaitingContainer from '../containers/WaitingContainer'
import GameConatainer from '../containers/GameContainer'

class App extends Component {

  constructor(props) {
    super(props);
    this.subscription = null;
  }

  componentWillReceiveProps(nextProps) {
    console.log('App Props', nextProps);
    const oldPlayerId = this.props.playerId;
    const newPlayerId = nextProps.playerId;
    
    if (oldPlayerId !== newPlayerId) {
      if (this.subscription) {
        console.log(`close existing subscription for player ${oldPlayerId}`);
        this.subscription.onmessage = null;
        this.subscription.close();
      }
      if (newPlayerId) {
        console.log(`start subsription for player ${newPlayerId}`)
        this.subscription = new window.EventSource(`${AppConstants.server}/api/subscribe/${newPlayerId}`);
        this.subscription.onmessage = (message) => {
          this.props.getPlayerViewAction();
        };
      }
    }
  }

  render() {
    var page;
    const gameStatus = this.props.gameStatus;
    const player = this.props.player;
    if (this.props.error) {
      alert(this.props.errorMessage);
    }
    if (gameStatus === 'created') {
      page = <CharacterListContainer/>;
    } else if (gameStatus === 'open') {
      if (player.status !== 'ready') {
        page = <ReadyContainer/>;
      } else {
        page = <WaitingContainer/>;
      }
    } else if (gameStatus === 'started') {
      page = <GameConatainer/>;
    } else if (gameStatus === 'voting') {
      page = 'voting' 
    } else if (gameStatus === 'quest') {
      page = 'quest'  
    } else {
      page = <EntryContainer/>;
    }

    return (
      <div>
        {page}
      </div>
    );
  }
}

App.propTypes = {
  playerId: PropTypes.string,
  gameStatus: PropTypes.string,
  player: PropTypes.object
};

export default App;

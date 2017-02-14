import React, { Component, PropTypes } from 'react';
import AppConstants from '../AppConstants'

import EntryContainer from '../containers/EntryContainer'
import CharacterListContainer from '../containers/CharacterListContainer'
import ReadyContainer from '../containers/ReadyContainer'
import WaitingContainer from '../containers/WaitingContainer'
import GameConatainer from '../containers/GameContainer'
import Toolbar from './widget/Toolbar'

class App extends Component {

  constructor(props) {
    super(props);
    this.subscription = null;
  }

  componentWillReceiveProps(nextProps) {
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
          if (message === 'abandon') {
            this.props.unsubscribeAction();
          } else {
            this.props.getPlayerViewAction();
          }
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
    } else if (gameStatus === 'started' || gameStatus === 'voting' || gameStatus === 'quest') {
      page = <GameConatainer/>;
    } else {
      page = <EntryContainer/>;
    }

    return (
      <div>
        <Toolbar player={player} abandonAction={this.props.abandonAction}/>
        {page}
      </div>
    );
  }
}

App.propTypes = {
  playerId: PropTypes.string,
  gameStatus: PropTypes.string,
  player: PropTypes.object,

  abandonAction: PropTypes.func,
  unsubscribeAction: PropTypes.func
};

export default App;

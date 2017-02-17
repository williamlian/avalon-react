import React, { Component, PropTypes } from 'react';
import AppConstants from '../AppConstants'

import EntryContainer from '../containers/EntryContainer'
import CharacterListContainer from '../containers/CharacterListContainer'
import ReadyContainer from '../containers/ReadyContainer'
import WaitingContainer from '../containers/WaitingContainer'
import GameConatainer from '../containers/GameContainer'
import Toolbar from './widget/Toolbar'
import Box from 'grommet/components/Box';

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
          const json = JSON.parse(message.data);
          console.log("Receive from push", json);
          if (json.type === 'abandon') {
            this.props.unsubscribeAction();
          } else {
            this.props.receivePlayerViewAction(json.data);
          }
        };
      }
    }
  }

  render() {
    var page;
    const {gameStatus, group, player} = this.props;

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
    } else if (gameStatus === 'started' || 
               gameStatus === 'voting' || 
               gameStatus === 'quest' ||
               gameStatus === 'assassination' ||
               gameStatus === 'end') {
      page = <GameConatainer/>;
    } else {
      page = <EntryContainer/>;
    }

    return (<Box full={true} style={{overflow:'hidden'}}>
      <Toolbar
        player={player}
        group={group}
        abandonAction={this.props.abandonAction}
        quitAction={this.props.quitAction}/>
      
      {page}
    </Box>);
  }
}

App.propTypes = {
  playerId: PropTypes.string,
  gameStatus: PropTypes.string,
  group: PropTypes.object,
  player: PropTypes.object,

  abandonAction: PropTypes.func,
  quitAction: PropTypes.func,
  unsubscribeAction: PropTypes.func,
  receivePlayerViewAction: PropTypes.func
};

export default App;

import React, { Component, PropTypes } from 'react';
import PlayerList from './widget/PlayerList';

class Game extends Component {

  render() {
    const {group, player} = this.props;

    return (<div>
      <p>Group {group.id}</p>
      <p>{player.name} - {player.character}</p>
      <hr/>
      <PlayerList 
        players={group.players}
        kingView={player.is_king}
        startVoteAction={()=>null}/>
    </div>);
  }

}

Game.propTypes = {
  group: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired
};

export default Game;

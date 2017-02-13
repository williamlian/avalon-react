import React, { Component, PropTypes } from 'react';
import Player from './Player';

class PlayerList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: {}
    };

    this.onToggleKnight = this.onToggleKnight.bind(this);
    this.onStartVote = this.onStartVote.bind(this);
  }

  onStartVote() {
    if (this.props.kingView && this.props.startVoteAction) {
      const selected = this.state.selected;
      const seq = Object.keys(selected).filter(x => selected[x]);
      this.props.startVoteAction(seq);
    }
  }

  onToggleKnight(sequence, isKnight) {
    const selected = this.state.selected;
    selected[sequence] = isKnight;
    this.setState(selected);
  }
  
  render() {
    const self = this;
    
    const list = this.props.players.map(
      player => <Player 
        player={player} 
        key={player.player_sequence}
        kingView={self.props.kingView}
        selected={self.state.selected[player.player_sequence]}
        onToggleKnight={self.onToggleKnight}
      />);

    var startVoteButton = '';
    if (this.props.kingView) {
      startVoteButton = <input type="button" value="Start Voting" onClick={this.onStartVote}/>
    }

    return <div>
      <div>{list}</div>
      <div>{startVoteButton}</div>
    </div>
  }
}

PlayerList.propTypes = {
  players: PropTypes.array.isRequired,

  kingView: PropTypes.bool,
  startVoteAction: PropTypes.func
};

export default PlayerList;

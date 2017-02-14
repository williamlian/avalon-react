import React, { Component, PropTypes } from 'react';
import Player from './Player';

class PlayerList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: {}
    };

    this.onToggleKnight = this.onToggleKnight.bind(this);
  }

  onToggleKnight(sequence, isKnight) {
    const selected = this.state.selected;
    selected[sequence] = isKnight;
    this.setState(selected);

    if (this.props.kingView && this.props.nominate) {
      const seq = Object.keys(selected).filter(x => selected[x]);
      if (seq.length === 0) {
        seq.push(-1);
      }
      this.props.nominate(seq);
    }
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

    return <div>
      <div>{list}</div>
    </div>
  }
}

PlayerList.propTypes = {
  players: PropTypes.array.isRequired,
  isVoting: PropTypes.bool.isRequired,

  kingView: PropTypes.bool,
  nominate: PropTypes.func
};

export default PlayerList;

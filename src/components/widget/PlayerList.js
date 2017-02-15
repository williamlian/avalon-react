import React, { Component, PropTypes } from 'react';
import Player from './Player';

class PlayerList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selected: {}
    };

    this.onToggle = this.onToggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // reset selection if vote completes
    if (nextProps.viewType === 'normal') {
      this.setState({selected: {}});
    } else if (nextProps.viewType === 'assassination') {
      var target = -1;
      nextProps.players.forEach(player => {
        if (player.assassination_target) {
          target = player.player_sequence;
        }
      });
      if (target > 0) {
        this.setState({
          selected: {[target]: true}
        });
      }
    }
  }

  onToggle(sequence, checked) {
    var selected = this.state.selected;

    if (this.props.viewType === "king") {
      selected[sequence] = checked;
      this.setState({selected: selected});
      const seq = Object.keys(selected).filter(x => selected[x]);
      if (seq.length === 0) {
        seq.push(-1);
      }
      this.props.nominate(seq);

    } else if (this.props.viewType === 'assassination') {
      selected = {};
      selected[sequence] = true;
      this.setState({selected: selected});
      this.props.nominateAssassination(sequence);
    }
  }
  
  render() {
    const self = this;
    
    const list = this.props.players.map(
      player => <Player 
        player={player} 
        key={player.player_sequence}
        viewType={self.props.viewType}
        selected={self.state.selected[player.player_sequence]}
        toggle={self.onToggle}
      />);

    return <div>
      <div>{list}</div>
    </div>
  }
}

PlayerList.propTypes = {
  players: PropTypes.array.isRequired,
  viewType: PropTypes.string.isRequired,

  nominate: PropTypes.func,
  nominateAssassination: PropTypes.func
};

export default PlayerList;

import React, { Component, PropTypes } from 'react';

class Player extends Component {

  constructor(props) {
    super(props);

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(event) {
    this.props.toggle(event.target.value, event.target.checked);
  }
  
  render() {
    const player = this.props.player;
    var knightToggle = player.is_knight ? '*' : '-';
    if (this.props.viewType === 'king') {
      knightToggle = <input 
        type="checkbox"
        value={this.props.player.player_sequence}
        checked={this.props.selected}
        onChange={this.onToggle}/>;
    }

    var assassinationToggle = player.assassination_target ? '*' : '-';
    if (this.props.viewType === 'assassination') {
      assassinationToggle = <input 
        type="checkbox"
        value={this.props.player.player_sequence}
        checked={this.props.selected}
        onChange={this.onToggle}/>;
    }

    var vote = '';
    if (player.voted) {
      if (player.last_vote === null) {
        vote = <p>Vote: - </p>
      } else {
        vote = <p>Vote: {player.last_vote ? 'Approved' : 'Rejected'}</p>
      }
    }
    return (<div style={ {border:'solid 1px black'} }>
      <p>{player.name} - {player.character}</p>
      <p>King: {player.is_king ? '*' : '-'} | Knight: {knightToggle} | Assassinate: {assassinationToggle}</p>
      {vote}
    </div>)
  }
}

Player.propTypes = {
  player: PropTypes.object.isRequired,
  viewType: PropTypes.string.isRequired,

  selected: PropTypes.bool,
  toggle: PropTypes.func
}

export default Player;

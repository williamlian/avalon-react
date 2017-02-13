import React, { Component, PropTypes } from 'react';

class Player extends Component {

  constructor(props) {
    super(props);

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(event) {
    this.props.onToggleKnight(event.target.value, event.target.checked);
  }
  
  render() {
    const player = this.props.player;
    var knightToggle = player.is_knight ? '*' : '-';
    if (this.props.kingView) {
      knightToggle = <input 
        type="checkbox"
        value={this.props.player.player_sequence}
        checked={this.props.selected}
        onChange={this.onToggle}/>;
    }

    return (<div style={ {border:'solid 1px black'} }>
      <p>{player.name} - {player.character}</p>
      <p>King: {player.is_king ? '*' : '-'} | Knight: {knightToggle}</p>
    </div>)
  }
}

Player.propTypes = {
  player: PropTypes.object.isRequired,

  kingView: PropTypes.bool,
  selected: PropTypes.bool,
  onToggleKnight: PropTypes.func
}

export default Player;

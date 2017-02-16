import React, { Component, PropTypes } from 'react';
import Badge from './Badge';
import AppConstants from '../../AppConstants';

class PlayerBadge extends Component {
  render() {
    const player = this.props.player || {};
    return (
      <Badge 
        value={player.player_sequence}
        size={this.props.size}
        margin={this.props.margin}
        color={player.is_king ? AppConstants.colors.king : AppConstants.colors.light}/>
    );
  }
}

PlayerBadge.propTypes = {
  player: PropTypes.object.isRequired,
  size: PropTypes.string,
  margin: PropTypes.number,
};

export default PlayerBadge;
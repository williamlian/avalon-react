import React, { Component, PropTypes } from 'react';

import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

class Waiting extends Component {
  render() {
    const {group, player} = this.props;
    return (<Box pad="large">
      <div>
        <p>Group ID: {group.id}</p>
      </div>
      <div>
        <p>Waiting: {group.player_count} / {group.size}</p>
      </div>
      <div>
        <p>Name: {player.name}</p>
      </div>
      <div>
        <p>Player Number: {player.player_sequence}</p>
      </div>
      <div>
        <p>Character: {player.character}</p>
      </div>
    </Box>);
  }
}

Waiting.propTypes = {
  group: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired
};

export default Waiting;

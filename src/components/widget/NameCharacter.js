import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

class NameCharacter extends Component {
  render() {
    const player = this.props.player || {};
    return (
      <Box direction="row" responsive={false}>
        <Box flex={true}>
          <Heading tag="h4" strong={true}>{player.name}</Heading>
        </Box>
        <Box>
          <Heading tag="h5" truncate={true}>{player.character_name}</Heading>
        </Box>
      </Box>
    );
  }
}

NameCharacter.propTypes = {
  player: PropTypes.object.isRequired
}

export default NameCharacter;
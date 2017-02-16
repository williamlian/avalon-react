import React, { Component, PropTypes } from 'react';
import NameCharacter from './NameCharacter';
import PlayerBadge from './PlayerBadge';

import Card from 'grommet/components/Card';
import Box from 'grommet/components/Box';
import Vulnerability from 'grommet/components/icons/base/Vulnerability';
import Like from 'grommet/components/icons/base/Like';
import UserExpert from 'grommet/components/icons/base/UserExpert';
import CheckBox from 'grommet/components/CheckBox';

class Player extends Component {

  constructor(props) {
    super(props);

    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(event) {
    this.props.toggle(event.target.id, event.target.checked);
  }
  
  render() {
    const player = this.props.player;
    var knightToggle = <UserExpert colorIndex={player.is_knight ? "grey-1" : 'light-2'}/>;
    if (this.props.viewType === 'king') {
      knightToggle = <CheckBox
        checked={this.props.selected}
        id={player.player_sequence}
        onChange={this.onToggle}/>;
    }

    var assassinationToggle = <Vulnerability colorIndex={player.assassination_target ? 'grey-1' : 'light-2'}/>;
    if (this.props.viewType === 'assassination') {
      assassinationToggle = <CheckBox
        id={player.player_sequence}
        checked={this.props.selected}
        onChange={this.onToggle}/>;
    }

    var vote = <Like colorIndex="light-2"/>;
    if (player.voted) {
      if (player.last_vote === null) {
        vote = <Like colorIndex="unknown"/>
      } else {
        vote = <Like colorIndex={player.last_vote ? 'ok' : 'critical'}/>
      }
    }
    return (<Card contentPad="medium">
      <Box direction="row" responsive={false} pad={{horizontal:'none', vertical:'none', between:'large'}}>
  
        <Box alignSelf="center">
          <PlayerBadge size="medium" player={player}/>
        </Box>

        <Box direction="column" flex={true} pad={{between:'small'}}>
          <NameCharacter player={player} />

          <Box direction="row" responsive={false} pad={{between: "small"}}>
            {knightToggle} {vote} {assassinationToggle}
          </Box>
        </Box>
      </Box>
    </Card>)
  }
}

Player.propTypes = {
  player: PropTypes.object.isRequired,
  viewType: PropTypes.string.isRequired,

  selected: PropTypes.bool,
  toggle: PropTypes.func
}

export default Player;

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

    this.state = {
      isKnight: false,
      isTarget: false,
    }

    this.onToggle = this.onToggle.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const player = nextProps.player;
    var isKnight = player.is_knight;
    if (nextProps.viewType === 'king') {
      isKnight = nextProps.selected;
    }

    var isTarget = player.assassination_target;
    if (nextProps.viewType === 'assassination') {
      isTarget = nextProps.selected;
    }

    this.setState({
      isKnight: isKnight,
      isTarget: isTarget
    });
  }

  onToggle() {
    this.props.toggle(this.props.player.player_sequence, !this.props.selected);
  }
  
  render() {
    const player = this.props.player;

    var vote = <Like colorIndex="light-2"/>;
    if (player.voted) {
      if (player.last_vote === null) {
        vote = <Like colorIndex="unknown"/>
      } else {
        vote = <Like colorIndex={player.last_vote ? 'ok' : 'critical'}/>
      }
    }

    var cardColor = '';
    if (this.state.isKnight) {
      cardColor = 'knight';
    } else if (this.state.isTarget) {
      cardColor = 'assassinated';
    }

    return (<Box pad="medium" onClick={this.onToggle} separator="bottom"
        className={cardColor}>
      <Box direction="row" responsive={false} 
        pad={{horizontal:'none', vertical:'none', between:'large'}}>
        <Box alignSelf="center">
          <PlayerBadge size="medium" player={player}/>
        </Box>

        <Box direction="column" flex={true} pad={{between:'small'}}>
          <NameCharacter player={player} />

          <Box direction="row" responsive={false} pad={{between: "small"}}>
            <UserExpert colorIndex={this.state.isKnight ? "grey-1" : 'light-2'}/>
             {vote}
            <Vulnerability colorIndex={this.state.isTarget ? 'grey-1' : 'light-2'}/>
          </Box>
        </Box>
      </Box>
    </Box>);
  }
}

Player.propTypes = {
  player: PropTypes.object.isRequired,
  viewType: PropTypes.string.isRequired,

  selected: PropTypes.bool,
  toggle: PropTypes.func
}

export default Player;

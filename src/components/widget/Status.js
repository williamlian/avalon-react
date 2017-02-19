import React, { Component, PropTypes } from 'react';
import NameCharacter from './NameCharacter';
import PlayerBadge from './PlayerBadge';
import Badge from './Badge';
import AppConstants from '../../AppConstants';

import Box from 'grommet/components/Box';
import StatusIcon from 'grommet/components/icons/Status';
import Label from 'grommet/components/Label';

class Status extends Component {

  voteStatus() {
    const group = this.props.group;
    var voteStatus = [];
    if (group) {
      for (var i = 0; i < group.setting.max_vote; i++) {
        if (i < group.vote_count - 1) {
          voteStatus.push(<StatusIcon key={`${i}-voted`} value='critical'/>);
        } else if (i === group.vote_count - 1) {
          voteStatus.push(<StatusIcon key={`${i}-voting`} value='disabled'/>);
        } else {
          voteStatus.push(<StatusIcon key={i} value='unknown'/>);
        }
      }
    }
    return voteStatus;
  }

  questStatus() {
    const group = this.props.group;
    var questStatus = [];
    if (group) {
      for (var j = 0; j < group.setting.knights.length; j++) {
        const knights = group.setting.knights[j];
        const quest = group.quests[j];
        var color = AppConstants.colors.light;
        if (quest !== undefined) {
          color = quest.result ? AppConstants.colors.ok : AppConstants.colors.critical;
        }
        questStatus.push(<Badge key={j} value={knights} size="small" color={color} margin={0}/>);
      }
    }
    return questStatus;
  }

  render() {
    const player = this.props.player;

    var baseColor = '';
    if (player.is_knight) {
      baseColor = 'knight';
    } else if (player.assassination_target) {
      baseColor = 'assassinated';
    }

    return (
      <Box className={baseColor}
           direction="row" 
           responsive={false} 
           pad={{horizontal:'large', vertical:'medium', between:'large'}}>
  
        <Box alignSelf="center">
          <PlayerBadge player={player} size="xlarge"/>
        </Box>

        <Box direction="column" flex={true} pad={{between:'small'}}>
          <NameCharacter player={player} />
          <Box direction="row" responsive={false} justify="between">
            <Label margin="none">Vote</Label>{this.voteStatus()}
          </Box>
          <Box direction="row" responsive={false} justify="between">{this.questStatus()}</Box>
        </Box>
      </Box>
    );
  }
}

Status.propTypes = {
  player: PropTypes.object,
  group: PropTypes.object
}

export default Status;

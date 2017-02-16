import React, { Component, PropTypes } from 'react';
import PlayerList from './widget/PlayerList';
import Status from './widget/Status';

import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Label from 'grommet/components/Label';
import Notification from 'grommet/components/Notification';

class Game extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isVoted: props.player.voted && !props.error,
      isVoting: props.group.status === 'voting' && !props.error,
      actionTaken: props.group.status !== 'voting' && !props.error,
      questDone: props.player.status !== 'quest' && !props.error,
      assassinated: props.group.status !== 'assassination' && !props.error
    };

    this.nominate = this.nominate.bind(this);
    this.vote = this.vote.bind(this);
    this.startVote = this.startVote.bind(this);
    this.startQuest = this.startQuest.bind(this);
    this.endTurn = this.endTurn.bind(this);
    this.nominateAssassination = this.nominateAssassination.bind(this);
    this.assassinate = this.assassinate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isVoted: nextProps.player.voted && !nextProps.error,
      isVoting: nextProps.group.status === 'voting' && !nextProps.error,
      actionTaken: nextProps.group.status !== 'voting' && !nextProps.error,
      questDone: nextProps.player.status !== 'quest' && !nextProps.error,
      assassinated: nextProps.group.status !== 'assassination' && !nextProps.error
    });
  }

  nominate(knights) {
    this.props.nominateAction(knights);
  }

  vote(approve) {
    this.setState({ isVoted: true });
    this.props.voteAction(approve);
  }

  startVote() {
    this.setState({ isVoting: true });
    this.props.startVoteAction();
  }

  startQuest() {
    this.setState({ actionTaken: true });
    this.props.startQuestAction();
  }

  endTurn() {
    this.setState({ actionTaken: true });
    this.props.endTurnAction();
  }

  quest(success) {
    this.setState({ questDone: true });
    this.props.submitQuestAction(success);
  }

  nominateAssassination(target) {
    this.props.nominateAssassinationAction(target);
  }

  assassinate() {
    this.setState({ assassinated: true})
    this.props.assassinateAction();
  }

  render() {
    const {group, player} = this.props;
    
    var groupStatus = 'Nominating Knights';
    if (group.status === 'voting') {
      if (group.last_vote_result === null) {
        groupStatus = 'Voting';
      } else {
        var approve = 0;
        Object.keys(group.players).forEach(id => {
          if (group.players[id].last_vote) {
            approve += 1;
          }
        });
        groupStatus = `Vote Result: ${group.last_vote_result ? 'Approved' : 'Rejected'} [${approve}/${group.size}]`
      }
    } else if (group.status === 'quest') {
      groupStatus = 'Doing Quest';
    } else if (group.status === 'assassination') {
      groupStatus = 'Assassination';
    } else if (group.status === 'end') {
      groupStatus = 'Game Over';
    }

    var actionButtons = '';
    if (group.status === 'started') {
      if (player.is_king) {
        actionButtons = [
          <Label key="label" margin="none">Select {group.knights_required} Knigts</Label>,
          <Button key="button" label="Start Voting" onClick={this.startVote} disabled={this.props.isVoting}/>
        ];
      } else {
        actionButtons = 'please wait for king to nominate knights';
      }
    }
    if (group.status === 'voting') {
      if (group.last_vote_result === null) {
        actionButtons = [
          <Button key="approve" label="Approve" onClick={this.state.isVoted ? null : () => this.vote(true)}/>,
          <Button key="reject" label="Reject" onClick={this.state.isVoted ? null : () => this.vote(false)}/>
        ];
      } else if (player.is_king) {
        if (group.last_vote_result) {
          actionButtons = 
            <Button label="Start Quest" onClick={this.startQuest} disabled={this.state.actionTaken}/>;
        } else {
          actionButtons =
            <Button label="End Turn" onClick={this.endTurn} disabled={this.state.actionTaken}/>;
        }
      } else {
        if (group.last_vote_result) {
          actionButtons = 'Please wait for king to start quest'
        } else {
          actionButtons = 'Please wait for next turn';
        }
      }
    } else if (group.status === 'quest') {
      if (player.status === 'quest') {
        actionButtons = [
          <Button key="success" label="Success" onClick={this.state.questDone ? null : () => this.quest(true)}/>,
          <Button key="fail" label="Fail" onClick={(this.state.questDone || this.props.player.side === 'good') ? null : () => this.quest(false)}/>
        ];
      } else {
        actionButtons = 'Please wait for quest completing';
      }
    } else if (group.status === 'assassination') {
      if (player.side === 'good') {
        actionButtons = 'Please wait for assassination';
      } else {
        actionButtons = <Button label="Assassinate" onClick={this.assassinate} disabled={this.state.assassinated}/>;
      }
    } else if (group.status === 'end') {
      actionButtons = `Game Over. Winner is ${group.winner}`;
    }

    var playerViewType = "normal";
    if (group.status === 'started' && player.is_king) {
      playerViewType = "king";
    } else if (group.status === 'assassination' && player.side === 'evil') {
      playerViewType = "assassination"
    }

    return (<Box flex="grow">
      <Box><Status group={group} player={player}/></Box>
      <Box>
        <Notification size="small" status="ok" message={groupStatus} pad="none"/>
      </Box>
      <Box flex="grow" style={{overflow:'auto', height:1}}>
        <PlayerList 
          players={group.players}
          viewType={playerViewType}
          nominate={this.nominate}
          nominateAssassination={this.nominateAssassination}/>
      </Box>
      <Box direction="row" responsive={false} pad="medium" justify="between" separator="top" align="center">
        {actionButtons}
      </Box>
    </Box>);
  }

}

Game.propTypes = {
  group: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  error: PropTypes.bool.isRequired,

  nominateAction: PropTypes.func.isRequired,
  startVoteAction: PropTypes.func.isRequired,
  voteAction: PropTypes.func.isRequired,
  startQuestAction: PropTypes.func.isRequired,
  endTurnAction: PropTypes.func.isRequired,
  submitQuestAction: PropTypes.func.isRequired,
  nominateAssassinationAction: PropTypes.func.isRequired,
  assassinateAction: PropTypes.func.isRequired
};

export default Game;

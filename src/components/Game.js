import React, { Component, PropTypes } from 'react';
import PlayerList from './widget/PlayerList';

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
        Object.values(group.players).forEach(player => {
          if (player.last_vote) {
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

    var voteStatus = '';
    for (var i = 0; i < group.setting.max_vote; i++) {
      voteStatus += i < group.vote_count ? '[X]' : '[ ]'
    }

    var questStatus = '';
    group.quests.forEach(quest => {
      questStatus += quest.result ? '[√]' : '[X]';
    });
    for (var j = group.quests.length; j < group.setting.knights.length; j++) {
      questStatus += `[${group.setting.knights[j]}${group.setting.fails[j]>1?'*':''}]`;
    }


    var actionButtons = '';
    if (group.status === 'started') {
      if (player.is_king) {
        actionButtons = <div>
          <span>Select {group.knights_required} Knigts</span> | 
          <input type="button" value="Start Voting" onClick={this.startVote} disabled={this.props.isVoting}/>
        </div>;
      } else {
        actionButtons = 'please wait for king to nominate knights';
      }
    }
    if (group.status === 'voting') {
      if (group.last_vote_result === null) {
        actionButtons = <div>
          <input type="button" value="Approve" onClick={() => this.vote(true)} disabled={this.state.isVoted}/>
          <input type="button" value="Reject" onClick={() => this.vote(false)} disabled={this.state.isVoted}/>
        </div>;
      } else if (player.is_king) {
        if (group.last_vote_result) {
          actionButtons = <div>
            <input type="button" value="Start Quest" onClick={this.startQuest} disabled={this.state.actionTaken}/>
          </div>;
        } else {
          actionButtons = <div>
            <input type="button" value="End Turn" onClick={this.endTurn} disabled={this.state.actionTaken}/>
          </div>;
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
        actionButtons = <div>
          <input type="button" value="Success" onClick={() => this.quest(true)} disabled={this.state.questDone}/>
          <input type="button" value="Fail" onClick={() => this.quest(false)} disabled={this.state.questDone || this.props.player.side === 'good'}/>
        </div>;
      } else {
        actionButtons = 'Please wait for quest completing';
      }
    } else if (group.status === 'assassination') {
      if (player.side === 'good') {
        actionButtons = 'Please wait for assassination';
      } else {
        actionButtons = <div>
          <input type="button" value="Assassinate" onClick={this.assassinate} disabled={this.state.assassinated}/>
        </div>;
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

    return (<div>
      <p>Group {group.id} | {groupStatus}</p>
      <p>Vote {voteStatus} | Quest {questStatus}</p>
      <p>Last Quest Result: {group.quest_result.success} Success | {group.quest_result.failed} Failed</p>
      <p>{player.name} - {player.character}</p>
      <hr/>
      <PlayerList 
        players={group.players}
        viewType={playerViewType}
        nominate={this.nominate}
        nominateAssassination={this.nominateAssassination}/>
      {actionButtons}
    </div>);
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

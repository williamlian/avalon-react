import React, { Component, PropTypes } from 'react';
import PlayerList from './widget/PlayerList';

class Game extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isVoted: props.player.voted && !props.error,
      isVoting: props.group.status === 'voting' && !props.error,
      actionTaken: props.group.status !== 'voting' && !props.error,
      questDone: props.player.status !== 'quest' && !props.error
    };

    this.nominate = this.nominate.bind(this);
    this.vote = this.vote.bind(this);
    this.startVote = this.startVote.bind(this);
    this.startQuest = this.startQuest.bind(this);
    this.endTurn = this.endTurn.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isVoted: nextProps.player.voted && !nextProps.error,
      isVoting: nextProps.group.status === 'voting' && !nextProps.error,
      actionTaken: nextProps.group.status !== 'voting' && !nextProps.error,
      questDone: nextProps.player.status !== 'quest' && !nextProps.error
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
    }

    var actionButtons = '';
    if (group.status === 'started') {
      if (player.is_king) {
        actionButtons = <div>
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
    }

    return (<div>
      <p>Group {group.id} | {groupStatus}</p>
      <p>Last Quest Result: {group.quest_result.success} Success | {group.quest_result.failed} Failed</p>
      <p>{player.name} - {player.character}</p>
      <hr/>
      <PlayerList 
        players={group.players}
        kingView={group.status === 'started' && player.is_king}
        nominate={this.nominate}
        isVoting={this.state.isVoting}/>
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
  submitQuestAction: PropTypes.func.isRequired
};

export default Game;

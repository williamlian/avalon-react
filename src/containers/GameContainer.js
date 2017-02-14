import { connect } from 'react-redux'
import Game from '../components/Game'
import {nominate, startVote, vote, startQuest, endTurn, submitQuest} from '../actions'
import dotty from 'dotty'

const mapStateToProps = (state) => {
  return {
  	group: dotty.get(state, "game.group"),
    player: dotty.get(state, "game.player"),
    error: state.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    nominateAction: (knights) => {
      dispatch(nominate(knights));
    },
    startVoteAction: (knights) => {
      dispatch(startVote(knights));
    },
    voteAction: (approve) => {
      dispatch(vote(approve));
    },
    startQuestAction: () => {
      dispatch(startQuest());
    },
    endTurnAction: () => {
      dispatch(endTurn());
    },
    submitQuestAction: (success) => {
      dispatch(submitQuest(success));
    }
  };
};

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

export default GameContainer;

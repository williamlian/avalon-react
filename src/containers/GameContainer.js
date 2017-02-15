import { connect } from 'react-redux'
import Game from '../components/Game'
import dotty from 'dotty'
import {
  nominate,
  startVote,
  vote,
  startQuest,
  endTurn,
  submitQuest,
  nominateAssassination,
  assassinate
} from '../actions'

const mapStateToProps = (state) => {
  return {
  	group: dotty.get(state, "game.group"),
    player: dotty.get(state, "game.player"),
    error: state.error,
    updated: state.updated
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
    },
    nominateAssassinationAction: (sequence) => {
      dispatch(nominateAssassination(sequence));
    },
    assassinateAction: () => {
      dispatch(assassinate());
    }
  };
};

const GameContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);

export default GameContainer;

import { connect } from 'react-redux';
import Board from '../components/Board';
import { movePieceToBoard, movePieceOnBoard, playMovePieceTo, nextState } from '../actions/';

const mapStateToProps = (state) => ({
  board: state.board,
  redTeam: state.redTeam,
  blueTeam: state.blueTeam,
  game: state.game,
});

const mapDispatchToProps = (dispatch, getState) => ({
  movePieceTo: (piece, index) => {
    dispatch(movePieceToBoard(piece, index));
  },
  movePieceOnBoard: (fromIndex, toIndex) => {
    dispatch(movePieceOnBoard(fromIndex, toIndex));
  },
  playMovePieceTo:  (fromIndex, toIndex) => {
    dispatch(playMovePieceTo(fromIndex, toIndex));
  },
  gotoNextState: (nextGameState) => {
    dispatch(nextState(nextGameState));
  }
});

const LiveBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);

export default LiveBoard;

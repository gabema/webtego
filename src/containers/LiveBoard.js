import { connect } from 'react-redux';
import Board from '../components/Board';
import { movePieceToBoard } from '../actions/';

const mapStateToProps = (state) => ({
  board: state.board,
  redTeam: state.redTeam,
  blueTeam: state.blueTeam,
});

const mapDispatchToProps = (dispatch) => ({
  movePieceTo: (piece, index) => {
    dispatch(movePieceToBoard(piece, index))
  }
});

const LiveBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);

export default LiveBoard;

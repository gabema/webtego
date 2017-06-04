import { connect } from 'react-redux';
import Board from '../components/Board';

const mapStateToProps = (state) => ({
  board: state.board,
});

const mapDispatchToProps = (dispatch) => ({
});

const LiveBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);

export default LiveBoard;

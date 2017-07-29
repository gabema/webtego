import React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import Piece, { pieceDragAndDropTag } from './Piece';
import { GAME_STATES, PIECE_COLORS } from '../models/';
import './Spot.css';

const spotSource = {
  beginDrag(props) {
      return props;
  }
};

const spotTarget = {
  drop(props, monitor) {
    const pieceBeingDragged = monitor.getItem();

    // invalid piece being dragged
    if(!pieceBeingDragged.piece) return;
    if (props.game === GAME_STATES.SETUP_BLUE || props.game === GAME_STATES.SETUP_RED) {
      if (pieceBeingDragged.index) {
        props.movePieceOnBoard(pieceBeingDragged.index, props.index);
      } else {
        props.movePieceTo(pieceBeingDragged.piece, props.index);
      }
    } else if ((props.game === GAME_STATES.PLAY_BLUE && pieceBeingDragged.piece.color === PIECE_COLORS.BLUE)
    || (props.game === GAME_STATES.PLAY_RED && pieceBeingDragged.piece.color === PIECE_COLORS.RED)) {
      props.playMovePieceTo(pieceBeingDragged.index, props.index);
    }
  }
};

const collectSource = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
});

const collectTarget = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
});

const Spot = ({allowsPiece, connectDropTarget, connectDragSource, isOver, piece, game}) => connectDragSource(connectDropTarget(
  <div className={'Spot' + (allowsPiece ? ' Playable' : ' Unplayable')}>
    {piece ? <Piece piece={piece} game={game} pieceCount={piece.short} /> : ''}
  </div>
));

Spot.PropTypes = {
  allowsPiece: PropTypes.bool,
  movePieceTo: PropTypes.func,
  movePieceOnBoard: PropTypes.func,
  playMovePieceTo: PropTypes.func,
  index: PropTypes.number.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
};

export default DragSource(pieceDragAndDropTag, spotSource, collectSource)(DropTarget(pieceDragAndDropTag, spotTarget, collectTarget)(Spot));

import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { GAME_STATES, PIECE_COLORS } from '../models/';
import './Piece.css';

export const pieceDragAndDropTag = 'Piece';

const pieceSource = {
  beginDrag(props) {
      return props;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
};

const displayName = (color, game, name) => {
  if (color === PIECE_COLORS.BLUE && [GAME_STATES.SETUP_BLUE, GAME_STATES.PLAY_BLUE].indexOf(game) !== -1)
    return name;
  if (color === PIECE_COLORS.RED && [GAME_STATES.SETUP_RED, GAME_STATES.PLAY_RED].indexOf(game) !== -1)
    return name;

  return "OCCUPIED";
};

const Piece = ({piece, connectDragSource, pieceCount, game}) => connectDragSource(
  <div style={{color: piece.color}} className="Piece">
      <center>{displayName(piece.color, game, piece.name)}</center>
      {pieceCount ? pieceCount : ''}
  </div>
);

Piece.PropTypes = {
    piece: PropTypes.object.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
};

export default DragSource(pieceDragAndDropTag, pieceSource, collect)(Piece);

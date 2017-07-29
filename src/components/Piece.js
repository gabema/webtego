import React from 'react';
import PropTypes from 'prop-types';
import { GAME_STATES, PIECE_COLORS } from '../models/';
import styel from './Piece.css';

export const pieceDragAndDropTag = 'Piece';

const shouldDisplay = (color, game) =>
  (color === PIECE_COLORS.BLUE && [GAME_STATES.SETUP_BLUE, GAME_STATES.PLAY_BLUE].indexOf(game) !== -1) 
  || (color === PIECE_COLORS.RED && [GAME_STATES.SETUP_RED, GAME_STATES.PLAY_RED].indexOf(game) !== -1);

const Piece = ({piece, pieceCount, game}) => (
  <div style={{color: piece.color}} className="Piece">
      <center>{shouldDisplay(piece.color, game) ? piece.name : 'OCCUPIED'}</center>
      {shouldDisplay(piece.color, game) && pieceCount ? pieceCount : ''}
  </div>
);

Piece.PropTypes = {
    piece: PropTypes.object.isRequired,
    isDragging: PropTypes.bool.isRequired,
};

export default Piece;

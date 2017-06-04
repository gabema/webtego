import React from 'react';
import Spot from './Spot';

const makeSpots = (board = []) => {
  board.map((spot, index) => (<Spot allowPiece={spot.allowPiece} />));
};

const Board = ({board}) => (
  <div>
    {makeSpots(board)}
  </div>
);

export default Board;

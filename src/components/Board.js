import React from 'react';
import Spot from './Spot';
import chunk from 'lodash.chunk';
import './Board.css';

const makeSpots = board => chunk(board, Math.floor(Math.sqrt(board.length))).map((rowPieces, index) => (
  <div key={index} style={{display: 'block', height: '5em'}}>
    {makeRow(rowPieces)}
  </div>
));

const makeRow = rowSpots => rowSpots.map((spot, index) => (
  <Spot key={index} allowsPiece={spot.allowsPiece} />
));

const Board = ({board}) => (
  <div>
    {makeSpots(board)}
  </div>
);

export default Board;

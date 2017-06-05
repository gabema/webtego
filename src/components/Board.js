import React from 'react';
import chunk from 'lodash.chunk';
import Spot from './Spot';
import PropTypes from 'prop-types';
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

Board.propTypes = {
  board: PropTypes.array.isRequired
};

export default Board;

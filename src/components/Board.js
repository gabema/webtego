import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import assign from 'lodash.assign';
import chunk from 'lodash.chunk';
import groupBy from 'lodash.groupby';
import map from 'lodash.map';
import PropTypes from 'prop-types';
import Piece from './Piece';
import Spot from './Spot';

const makeSpots = (board, movePieceTo) => {
  const colWidth = Math.floor(Math.sqrt(board.length));
  return chunk(board, colWidth).map((colPieces, rowIndex) => (
  <div key={rowIndex} style={{display: 'block', height: '5em'}}>
    {makeRow(colPieces, rowIndex * colWidth, movePieceTo)}
  </div>
  ));
};

const makeRow = (colSpots, startRowIndex, movePieceTo) => colSpots.map((spot, index) => (
  <Spot
    key={startRowIndex + index}
    index={startRowIndex + index}
    allowsPiece={spot.allowsPiece}
    movePieceTo={movePieceTo}
    piece={spot.piece}
    />
));

const makeTeam = (color, pieces) => {
  const uniqPieces = groupBy(pieces, e => e.name);
  return makeTeamRow(map(uniqPieces, el => assign({}, {piece: el[0], count: el.length})));
};

const makeTeamRow = pieceGroupArr => pieceGroupArr.map((pieceGroup, index) => (
  <Piece key={pieceGroup.piece.color + index} piece={pieceGroup.piece} pieceCount={pieceGroup.count} />
));

const Board = ({game, board, redTeam, blueTeam, movePieceTo}) => (
  <div>
    <h1>{game}</h1>
    {makeTeam(redTeam.length && redTeam[0].color, redTeam)}
    {makeSpots(board, movePieceTo)}
    {makeTeam(blueTeam.length && blueTeam[0].color, blueTeam)}
  </div>
);

Board.propTypes = {
  board: PropTypes.array.isRequired,
  redTeam: PropTypes.array.isRequired,
  blueTeam: PropTypes.array.isRequired,
  game: PropTypes.string.isRequired,
};

export default DragDropContext(HTML5Backend)(Board);

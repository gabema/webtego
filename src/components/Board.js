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

import {GAME_STATES} from '../models/';

const makeSpots = (board, movePieceTo, game) => {
  const colWidth = Math.floor(Math.sqrt(board.length));
  return chunk(board, colWidth).map((colPieces, rowIndex) => (
  <div key={rowIndex} style={{display: 'block', height: '5em'}}>
    {makeRow(colPieces, rowIndex * colWidth, movePieceTo, game)}
  </div>
  ));
};

const makeRow = (colSpots, startRowIndex, movePieceTo, game) => colSpots.map((spot, index) => (
  <Spot
    key={startRowIndex + index}
    index={startRowIndex + index}
    allowsPiece={spot.allowsPiece}
    movePieceTo={movePieceTo}
    piece={spot.piece}
    game={game}
    />
));

const makeTeam = (color, pieces, state) => {
  const uniqPieces = groupBy(pieces, e => e.name);
  return makeTeamRow(map(uniqPieces, el => assign({}, {piece: el[0], count: el.length})), state);
};

const makeTeamRow = (pieceGroupArr, state) => pieceGroupArr.map((pieceGroup, index) => (
  <Piece key={pieceGroup.piece.color + index} piece={pieceGroup.piece} pieceCount={pieceGroup.count} game={state} />
));

const Board = ({game, board, redTeam, blueTeam, movePieceTo, gotoNextState}) => (
  <div>
    <h1>{game.current} {game.next ? <a onClick={_ => gotoNextState(game.next)}>Click When Ready!</a> : '' }</h1>
    {makeTeam(redTeam.length && redTeam[0].color, redTeam, GAME_STATES.SETUP_RED)}
    {makeSpots(board, movePieceTo, game.current)}
    {makeTeam(blueTeam.length && blueTeam[0].color, blueTeam, GAME_STATES.SETUP_BLUE)}
  </div>
);

Board.propTypes = {
  board: PropTypes.array.isRequired,
  redTeam: PropTypes.array.isRequired,
  blueTeam: PropTypes.array.isRequired,
  game: PropTypes.object.isRequired,
};

export default DragDropContext(HTML5Backend)(Board);

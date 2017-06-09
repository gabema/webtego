import assign from 'lodash.assign';
import fill from 'lodash.fill';
import findIndex from 'lodash.findindex';
import filter from 'lodash.filter';

export const PIECE_NAMES = {
  FLAG: 'Flag',
  MARSHAL: 'Marshal',
  GENERAL: 'General',
  COLONEL: 'Colonel',
  SPY: 'Spy',
  BOMB: 'Bomb',
  MAJOR: 'Major',
  CAPTAIN: 'Captain',
  LIEUTENANT: 'Lieutenant',
  SERGEANT: 'Sergeant',
  MINER: 'Miner',
  SCOUT: 'Scout',
};

const MOVE_TYPES = {
  IMMOVABLE: 'IM',
  UNLIMITED: 'U',
  SINGLE: '1',
};

export const PIECE_COLORS = {
  RED: 'red',
  BLUE: 'blue',
}

const FLAG = {
  name: PIECE_NAMES.FLAG,
  short: 'F',
  defeats: [],
  moveType: MOVE_TYPES.IMMOVABLE,
  endsGame: true,
};

const MARSHAL = {
  name: PIECE_NAMES.MARSHAL,
  short: '1',
  defeats: [PIECE_NAMES.MARSHAL, PIECE_NAMES.GENERAL, PIECE_NAMES.COLONEL, PIECE_NAMES.SPY, PIECE_NAMES.MAJOR, PIECE_NAMES.CAPTAIN, PIECE_NAMES.LIEUTENANT, PIECE_NAMES.SCOUT, PIECE_NAMES.SERGEANT, PIECE_NAMES.MINER],
  moveType: MOVE_TYPES.SINGLE
};

const GENERAL = {
  name: PIECE_NAMES.GENERAL,
  short: '2',
  defeats: [PIECE_NAMES.GENERAL, PIECE_NAMES.COLONEL, PIECE_NAMES.SPY, PIECE_NAMES.MAJOR, PIECE_NAMES.CAPTAIN, PIECE_NAMES.LIEUTENANT, PIECE_NAMES.SCOUT, PIECE_NAMES.SERGEANT, PIECE_NAMES.MINER],
  moveType: MOVE_TYPES.SINGLE
};

const COLONEL = {
  name: PIECE_NAMES.COLONEL,
  short: '3',
  defeats: [PIECE_NAMES.COLONEL, PIECE_NAMES.SPY, PIECE_NAMES.MAJOR, PIECE_NAMES.CAPTAIN, PIECE_NAMES.LIEUTENANT, PIECE_NAMES.SCOUT, PIECE_NAMES.SERGEANT, PIECE_NAMES.MINER],
  moveType: MOVE_TYPES.SINGLE
};

const MAJOR = {
  name: PIECE_NAMES.MAJOR,
  short: '4',
  defeats: [PIECE_NAMES.SPY, PIECE_NAMES.MAJOR, PIECE_NAMES.CAPTAIN, PIECE_NAMES.LIEUTENANT, PIECE_NAMES.SCOUT, PIECE_NAMES.SERGEANT, PIECE_NAMES.MINER],
  moveType: MOVE_TYPES.SINGLE
};

const CAPTAIN = {
  name: PIECE_NAMES.CAPTAIN,
  short: '5',
  defeats: [PIECE_NAMES.SPY, PIECE_NAMES.CAPTAIN, PIECE_NAMES.LIEUTENANT, PIECE_NAMES.SCOUT, PIECE_NAMES.SERGEANT, PIECE_NAMES.MINER],
  moveType: MOVE_TYPES.SINGLE
};

const LIEUTENANT = {
  name: PIECE_NAMES.LIEUTENANT,
  short: '6',
  defeats: [PIECE_NAMES.SPY, PIECE_NAMES.LIEUTENANT, PIECE_NAMES.SCOUT, PIECE_NAMES.SERGEANT, PIECE_NAMES.MINER],
  moveType: MOVE_TYPES.SINGLE
};

const SERGEANT = {
  name: PIECE_NAMES.SERGEANT,
  short: '7',
  defeats: [PIECE_NAMES.SPY, PIECE_NAMES.SCOUT, PIECE_NAMES.SERGEANT, PIECE_NAMES.MINER],
  moveType: MOVE_TYPES.SINGLE
};

const MINER = {
  name: PIECE_NAMES.MINER,
  short: '8',
  defeats: [PIECE_NAMES.SPY, PIECE_NAMES.SCOUT, PIECE_NAMES.MINER],
  moveType: MOVE_TYPES.SINGLE
};

const SCOUT = {
  name: PIECE_NAMES.SCOUT,
  short: '9',
  defeats: [PIECE_NAMES.SPY, PIECE_NAMES.SCOUT],
  moveType: MOVE_TYPES.UNLIMITED
};

const SPY = {
  name: PIECE_NAMES.SPY,
  short: 'S',
  defeats: [PIECE_NAMES.SPY, PIECE_NAMES.MARSHAL],
  moveType: MOVE_TYPES.SINGLE
};

const BOMB = {
  name: PIECE_NAMES.BOMB,
  short: 'B',
  defeats: [PIECE_NAMES.MARSHAL, PIECE_NAMES.GENERAL, PIECE_NAMES.COLONEL, PIECE_NAMES.SPY, PIECE_NAMES.MAJOR, PIECE_NAMES.CAPTAIN, PIECE_NAMES.LIEUTENANT, PIECE_NAMES.SCOUT, PIECE_NAMES.SERGEANT, PIECE_NAMES.MINER],
  moveType: MOVE_TYPES.IMMOVABLE
};

const createPieces = (piece, color, count) => fill(Array(count), assign({}, piece, {color}), 0);

export const popPiece = (peicesToSearch, name) => {
    const index = findIndex(peicesToSearch, { name });
    if (index === -1) return { pieces: peicesToSearch };
    return {piece: peicesToSearch[index], pieces: filter(peicesToSearch, (val, i) => i !== index)};
};

export const createTeam = (color) => [
    ...createPieces(FLAG, color, 1),
    ...createPieces(MARSHAL, color, 1),
    ...createPieces(GENERAL, color, 1),
    ...createPieces(SPY, color, 1),
    ...createPieces(COLONEL, color, 2),
    ...createPieces(MAJOR, color, 3),
    ...createPieces(CAPTAIN, color, 4),
    ...createPieces(LIEUTENANT, color, 4),
    ...createPieces(SERGEANT, color, 4),
    ...createPieces(MINER, color, 5),
    ...createPieces(SCOUT, color, 8),
    ...createPieces(BOMB, color, 6),
];

const createUsableBoardSpot = () => ({ allowsPiece: true });
const unusableBoardSpot = {};

export const createBoard = () => [
    ...fill(Array(40), createUsableBoardSpot()),
    ...fill(Array(2), createUsableBoardSpot()),
    ...fill(Array(2), unusableBoardSpot),
    ...fill(Array(2), createUsableBoardSpot()),
    ...fill(Array(2), unusableBoardSpot),
    ...fill(Array(2), createUsableBoardSpot()),
    ...fill(Array(2), createUsableBoardSpot()),
    ...fill(Array(2), unusableBoardSpot),
    ...fill(Array(2), createUsableBoardSpot()),
    ...fill(Array(2), unusableBoardSpot),
    ...fill(Array(2), createUsableBoardSpot()),
    ...fill(Array(40), createUsableBoardSpot()),
];

export const addPieceToBoard = (board = [], piece, index) => {
    if (index >= board.length || !board[index].allowsPiece || board[index].piece) {
        return board;
    }
    let newBoard = [...board];
    newBoard[index] = assign({}, board[index], {piece});
    return newBoard;
};

const columDifference = (startIndex = 0, endIndex = 0, columnWidth = 0) => endIndex % columnWidth - startIndex % columnWidth;
const rowDifference = (startIndex = 0, endIndex = 0, columnWidth = 0) => Math.floor(endIndex / columnWidth) - Math.floor(startIndex / columnWidth);

const createArrayOfIndexes = (startIndex, colDiff, rowDiff, colWidth) => {
  let indexes = [];
  const colStep = colDiff && (colDiff / Math.abs(colDiff));
  const rowStep = rowDiff && (rowDiff / Math.abs(rowDiff) * colWidth);
  const endIndex = startIndex + colDiff + rowDiff * colWidth;
  for (var index = startIndex; index !== endIndex; index += colStep + rowStep) {
    indexes.push(index);
  }
  indexes.push(endIndex);
  return indexes;
};

export const movePieceOnBoard = (board, startIndex, endIndex) => {
  const boardLength = board.length;
  if (startIndex >= boardLength  || endIndex >= boardLength) return [];
  const piece = board[startIndex].piece;
  if (!piece || piece.moveType === MOVE_TYPES.IMMOVABLE) return [];

  const boardWidth = Math.floor(Math.sqrt(boardLength));
  const colDiff = columDifference(startIndex, endIndex, boardWidth);
  const rowDiff = rowDifference(startIndex, endIndex, boardWidth);
  const absColDiff = Math.abs(colDiff);
  const absRowDiff = Math.abs(rowDiff);
  let possibleIndexes = [];
  if (piece.moveType === MOVE_TYPES.SINGLE && ((absColDiff === 1 && absRowDiff === 0) || (absColDiff === 0 && absRowDiff === 1))) {
    possibleIndexes = [startIndex, endIndex];
  }

  if (piece.moveType === MOVE_TYPES.UNLIMITED && ((absColDiff === 0 && absRowDiff !== 0) || (absRowDiff === 0 && absColDiff !== 0))) {
    possibleIndexes = createArrayOfIndexes(startIndex, colDiff, rowDiff, boardWidth);
  }

  if (possibleIndexes.length) {
    for (var i=1; i < possibleIndexes.length; i++) {
      const boardSpace = board[possibleIndexes[i]];
      if (boardSpace.piece || !boardSpace.allowsPiece) {
        possibleIndexes = [];
        break;
      }
    }
  }

  return possibleIndexes;
};

export const commitMoveOnBoard = (board, moveIndexes) => {
  if (!moveIndexes.length) return board;
  const firstIndex = moveIndexes[0];
  if (!board[firstIndex].piece) return board;
  const lastIndex = moveIndexes[moveIndexes.length - 1];
  let newBoard = [...board];
  let startSpot = assign({}, board[firstIndex]);
  let endSpot = assign({}, board[lastIndex]);
  endSpot.piece = startSpot.piece;
  delete startSpot.piece;
  newBoard[firstIndex] = startSpot;
  newBoard[lastIndex] = endSpot;
  return newBoard;
}

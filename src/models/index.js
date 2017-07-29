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

export const GAME_STATES = {
  SETUP_RED: 'Red Player Setup',
  SETUP_BLUE: 'Blue Player Setup',
  PLAY_RED: 'Red Player Turn',
  PLAY_BLUE: 'Blue Player Turn',
  PASS_TO_PLAYER: 'Pass To Other Player'
}

const FLAG = {
  name: PIECE_NAMES.FLAG,
  short: 'F',
  rank: 11,
  moveType: MOVE_TYPES.IMMOVABLE,
  endsGame: true,
};

const MARSHAL = {
  name: PIECE_NAMES.MARSHAL,
  short: 'M1',
  rank: 1,
  moveType: MOVE_TYPES.SINGLE
};

const GENERAL = {
  name: PIECE_NAMES.GENERAL,
  short: 'G2',
  rank: 2,
  moveType: MOVE_TYPES.SINGLE
};

const COLONEL = {
  name: PIECE_NAMES.COLONEL,
  short: 'C3',
  rank: 3,
  moveType: MOVE_TYPES.SINGLE
};

const MAJOR = {
  name: PIECE_NAMES.MAJOR,
  short: 'M4',
  rank: 4,
  moveType: MOVE_TYPES.SINGLE
};

const CAPTAIN = {
  name: PIECE_NAMES.CAPTAIN,
  short: 'C5',
  rank: 5,
  moveType: MOVE_TYPES.SINGLE
};

const LIEUTENANT = {
  name: PIECE_NAMES.LIEUTENANT,
  short: 'L6',
  rank: 6,
  moveType: MOVE_TYPES.SINGLE
};

const SERGEANT = {
  name: PIECE_NAMES.SERGEANT,
  short: 'S7',
  rank: 7,
  moveType: MOVE_TYPES.SINGLE
};

const MINER = {
  name: PIECE_NAMES.MINER,
  short: 'M8',
  rank: 8,
  moveType: MOVE_TYPES.SINGLE
};

const SCOUT = {
  name: PIECE_NAMES.SCOUT,
  short: 'S9',
  rank: 9,
  moveType: MOVE_TYPES.UNLIMITED
};

const SPY = {
  name: PIECE_NAMES.SPY,
  short: 'SPY',
  rank: 10,
  moveType: MOVE_TYPES.SINGLE
};

const BOMB = {
  name: PIECE_NAMES.BOMB,
  short: 'B',
  rank: 0,
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

const canPerformAttack = (board, attackIndex, defendIndex) => {
  const attackPiece = board[attackIndex].piece;
  const defendPiece = board[defendIndex].piece;
  if (!attackPiece || !defendPiece || attackPiece.color === defendPiece.color) return false;
  const boardWidth = Math.round(Math.sqrt(board.length));
  const diff = Math.abs(attackIndex - defendIndex);
  return (diff === 1 || diff === boardWidth);
};

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

export const canAddPieceToBoard = (board, piece, index) => (!(index >= board.length || !board[index].allowsPiece || board[index].piece));

export const addPieceToBoard = (board = [], piece, index) => {
    if (!canAddPieceToBoard(board, piece, index)) {
        return board;
    }
    let newBoard = [...board];
    newBoard[index] = assign({}, board[index], {piece});
    return newBoard;
};

export const changePiecesOnBoard = (board = [], fromIndex, toIndex) => {
    let newBoard = [...board];
    const toPiece = board[toIndex].piece || undefined;
    const fromPiece = board[fromIndex].piece || undefined;
    let newFromItem = assign({}, board[toIndex], {piece: toPiece});
    if (!toPiece) {
      delete newFromItem.piece;
    }
    newBoard[fromIndex] = newFromItem;
    let newToItem = assign({}, board[fromIndex], {piece: fromPiece});
    if (!fromPiece) {
      delete newToItem.piece;
    }
    newBoard[toIndex] = newToItem;
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
};

export const attackMove = (oldBoard, attackIndex, defendIndex, oldRedTeam, oldBlueTeam) => {
  if (!canPerformAttack(oldBoard, attackIndex, defendIndex)) return {board:oldBoard, redTeam: oldRedTeam, blueTeam: oldBlueTeam};
  const attacker = oldBoard[attackIndex].piece;
  const defender = oldBoard[defendIndex].piece;
  let redTeam = oldRedTeam;
  let blueTeam = oldBlueTeam;
  let board = oldBoard;

  if (attacker.rank < defender.rank) {
    board = [...oldBoard];
    if (defender.color === PIECE_COLORS.BLUE) {
      blueTeam = [...oldBlueTeam, defender];
    } else {
      redTeam = [...oldRedTeam, defender];
    }
    board[defendIndex].piece = attacker;
    delete board[attackIndex].piece;
    return {board, redTeam, blueTeam};
  }
  else if (attacker.rank === defender.rank) {
    board = [...oldBoard];
    if (defender.color === PIECE_COLORS.BLUE) {
      blueTeam = [...oldBlueTeam, defender];
      redTeam = [...oldRedTeam, attacker];
      delete board[attackIndex].piece;
      delete board[defendIndex].piece;
      return {board, redTeam, blueTeam};
    } else {
      blueTeam = [...oldBlueTeam, attacker];
      redTeam = [...oldRedTeam, defender];
      delete board[attackIndex].piece;
      delete board[defendIndex].piece;
      return {board, redTeam, blueTeam};
    }
  }
  else // attacker.rank > defender.rank
  {
    if ((attacker.name === PIECE_NAMES.SPY && defender.name === PIECE_NAMES.MARSHAL) || (attacker.name === PIECE_NAMES.MINER && defender.name === PIECE_NAMES.BOMB)) {
      // Special case spy beats marshal when attacking
      // Special case when Miner attacks bomb
      board = [...oldBoard];
      if (defender.color === PIECE_COLORS.BLUE) {
        blueTeam = [...oldBlueTeam, defender];
      } else {
        redTeam = [...oldRedTeam, defender];
      }
      board[defendIndex].piece = attacker;
      delete board[attackIndex].piece;
      return {board, redTeam, blueTeam};
    } else {
      // regular case defender beats attacker
      board = [...oldBoard];
      delete board[attackIndex].piece;
      if (defender.color === PIECE_COLORS.BLUE) {
        redTeam = [...oldRedTeam, attacker];
        return {board, redTeam, blueTeam};
      } else {
        blueTeam = [...oldBlueTeam, attacker];
        return {board, redTeam, blueTeam};
      }      
    }
  }

  return {board:oldBoard, redTeam: oldRedTeam, blueTeam: oldBlueTeam};
};

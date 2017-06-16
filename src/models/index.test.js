import { PIECE_NAMES, PIECE_COLORS, createBoard, createTeam, popPiece, addPieceToBoard, movePieceOnBoard, commitMoveOnBoard, attackMove, commitAttack } from './'
import assign from 'lodash.assign';

it('creates a full blue team', () => {
    expect(createTeam(PIECE_COLORS.BLUE)).toHaveLength(40);
});

it('gets one piece from a full team set', () => {
    const team = createTeam(PIECE_COLORS.BLUE);
    const parts = popPiece(team, PIECE_NAMES.SCOUT);
    expect(parts.piece).toHaveProperty('name', PIECE_NAMES.SCOUT);
    expect(parts.pieces).toHaveLength(team.length - 1);
});

it('attempts to get a piece not in the set', () => {
    let team = createTeam(PIECE_COLORS.BLUE);
    team = popPiece(team, PIECE_NAMES.FLAG).pieces;
    const parts = popPiece(team, PIECE_NAMES.FLAG);
    expect(parts.piece).toBeUndefined();
    expect(parts.pieces).toBe(team);
});

it('creates an empty board', () => {
    expect(createBoard()).toHaveLength(100);
});

it('adds a piece to a good board spot', () => {
    const placeableIndex = 0;
    const flag = popPiece(createTeam(PIECE_COLORS.BLUE), PIECE_NAMES.FLAG).piece;
    const board = createBoard();
    const boardWithPiece = addPieceToBoard(board, flag, placeableIndex);
    expect(board).not.toBe(boardWithPiece);
    expect(boardWithPiece[placeableIndex]).toHaveProperty('piece', flag);
});

it('attempts to add a piece to an unplaceable board spot', () => {
    const unplaceableIndex = 52;
    const flag = popPiece(createTeam(PIECE_COLORS.BLUE), PIECE_NAMES.FLAG).piece;
    const board = createBoard();
    const boardWithPiece = addPieceToBoard(board, flag, unplaceableIndex);
    expect(board).toBe(boardWithPiece);
    expect(boardWithPiece[unplaceableIndex]).not.toHaveProperty('piece', flag);
});

it('attempts to add a piece to an already occupied board spot', () => {
    const placeableIndex = 0;
    const team = createTeam(PIECE_COLORS.BLUE);
    const board = createBoard();
    const flag = popPiece(team, PIECE_NAMES.FLAG).piece;
    const spy = popPiece(team, PIECE_NAMES.SPY).piece;
    const boardWithPiece = addPieceToBoard(board, flag, placeableIndex);
    const boardWithSecondPiece = addPieceToBoard(boardWithPiece, spy, placeableIndex);
    expect(boardWithPiece).toBe(boardWithSecondPiece);
    expect(boardWithSecondPiece[placeableIndex]).toHaveProperty('piece', flag);
});

it('can move a single space piece forward one row on the board', () => {
    const startIndex = 0;
    const team = createTeam(PIECE_COLORS.BLUE);
    const board = createBoard();
    const endIndex = startIndex + Math.floor(Math.sqrt(board.length));
    const marshal = popPiece(team, PIECE_NAMES.MARSHAL).piece;
    const board2 = addPieceToBoard(board, marshal, startIndex);
    const changedIndexes = movePieceOnBoard(board2, startIndex, endIndex);
    expect(changedIndexes).toEqual([startIndex, endIndex]);
});

it('can move a single space piece back one row on the board', () => {
    let board = createBoard();
    const colWidth = Math.floor(Math.sqrt(board.length));
    const startIndex = colWidth * colWidth - 1;
    const endIndex = startIndex - colWidth;
    const marshal = popPiece(createTeam(PIECE_COLORS.BLUE), PIECE_NAMES.MARSHAL).piece;
    board = addPieceToBoard(board, marshal, startIndex);
    const changedIndexes = movePieceOnBoard(board, startIndex, endIndex);
    expect(changedIndexes).toEqual([startIndex, endIndex]);
});

it('can move a single space piece right one column on the board', () => {
    const startIndex = 0;
    const endIndex = 1;
    const marshal = popPiece(createTeam(PIECE_COLORS.BLUE), PIECE_NAMES.MARSHAL).piece;
    const changedIndexes = movePieceOnBoard(
        addPieceToBoard(createBoard(), marshal, startIndex),
        startIndex,
        endIndex);
    expect(changedIndexes).toEqual([startIndex, endIndex]);
});

it('can move a single space piece left one column on the board', () => {
    const startIndex = 1;
    const endIndex = 0;
    const changedIndexes = movePieceOnBoard(
        addPieceToBoard(createBoard(), popPiece(createTeam(PIECE_COLORS.BLUE), PIECE_NAMES.MARSHAL).piece, startIndex),
        startIndex,
        endIndex);
    expect(changedIndexes).toEqual([startIndex, endIndex]);
});

it('cannot move a piece that is not on the board', () => {
    const startIndex = 0;
    const endIndex = 1;
    const changedIndexes = movePieceOnBoard(createBoard(), startIndex, endIndex);
    expect(changedIndexes).toEqual([]);
});

it('cannot move an immoveable piece on the board', () => {
    const startIndex = 1;
    const endIndex = 0;
    const changedIndexes = movePieceOnBoard(
        addPieceToBoard(createBoard(), popPiece(createTeam(PIECE_COLORS.BLUE), PIECE_NAMES.BOMB).piece, startIndex),
        startIndex,
        endIndex);
    expect(changedIndexes).toEqual([]);
});

it('cannot move a single space piece left one column on the left side of the board', () => {
    let board = createBoard();
    const colWidth = Math.floor(Math.sqrt(board.length));
    const startIndex = colWidth;
    const endIndex = startIndex - 1;
    board = addPieceToBoard(board, popPiece(createTeam(PIECE_COLORS.BLUE), PIECE_NAMES.MARSHAL).piece, startIndex);
    const changedIndexes = movePieceOnBoard(board, startIndex, endIndex);
    expect(changedIndexes).toEqual([]);
});

it('cannot move a single space piece right one column on the right side of the board', () => {
    let board = createBoard();
    const colWidth = Math.floor(Math.sqrt(board.length));
    const startIndex = colWidth - 1;
    const endIndex = startIndex + 1;
    board = addPieceToBoard(board, popPiece(createTeam(PIECE_COLORS.BLUE), PIECE_NAMES.MARSHAL).piece, startIndex);
    const changedIndexes = movePieceOnBoard(board, startIndex, endIndex);
    expect(changedIndexes).toEqual([]);
});

it('cannot move a single space piece forward one row on the board when its occupied', () => {
    let board = createBoard();
    const colWidth = Math.floor(Math.sqrt(board.length));
    const startIndex = 0;
    const endIndex = colWidth;
    let team = createTeam(PIECE_COLORS.BLUE);
    let parts = popPiece(team, PIECE_NAMES.MARSHAL);
    const marshal = parts.piece;
    team = parts.pieces;
    parts = popPiece(team, PIECE_NAMES.FLAG);
    const flag = parts.piece;
    team = parts.pieces;
    board = addPieceToBoard(board, marshal, startIndex);
    board = addPieceToBoard(board, flag, endIndex);
    const changedIndexes = movePieceOnBoard(board, startIndex, endIndex);
    expect(changedIndexes).toEqual([]);
});

it('cannot move a single space piece right one column on the board when its occupied', () => {
    const startIndex = 0;
    const endIndex = 1;
    let team = createTeam(PIECE_COLORS.BLUE);
    let parts = popPiece(team, PIECE_NAMES.MARSHAL);
    const marshal = parts.piece;
    team = parts.pieces;
    parts = popPiece(team, PIECE_NAMES.FLAG);
    const flag = parts.piece;
    team = parts.pieces;
    let board = createBoard();
    board = addPieceToBoard(board, marshal, startIndex);
    board = addPieceToBoard(board, flag, endIndex);
    const changedIndexes = movePieceOnBoard(board, startIndex, endIndex);
    expect(changedIndexes).toEqual([]);
});

it('cannot move a single space piece right one column into an unoccupiable space on the board', () => {
    let board = createBoard();
    const colWidth = Math.floor(Math.sqrt(board.length));
    const startIndex = colWidth * 5 + 1;
    const endIndex = startIndex + 1;
    let team = createTeam(PIECE_COLORS.BLUE);
    let parts = popPiece(team, PIECE_NAMES.SPY);
    board = addPieceToBoard(board, parts.piece, startIndex);
    const changedIndexes = movePieceOnBoard(board, startIndex, endIndex);
    expect(changedIndexes).toEqual([]);
});

it('can move the scout down along the entire column of the board', () => {
    const startIndex = 0;
    const board = createBoard();
    const colWidth = Math.floor(Math.sqrt(board.length));
    const endIndex = colWidth * 9;
    const changedIndexes = movePieceOnBoard(
        addPieceToBoard(board, popPiece(createTeam(PIECE_COLORS.BLUE), PIECE_NAMES.SCOUT).piece, startIndex),
        startIndex,
        endIndex);
    let expectedIndexes = [];
    for (var i = startIndex; i !== endIndex; i+=colWidth) {
        expectedIndexes.push(i);
    }
    expectedIndexes.push(endIndex);

    expect(changedIndexes).toEqual(expectedIndexes);
});

it('can move the scout up along the entire column of the board', () => {
    const endIndex = 0;
    const board = createBoard();
    const colWidth = Math.floor(Math.sqrt(board.length));
    const startIndex = colWidth * 9;
    const changedIndexes = movePieceOnBoard(
        addPieceToBoard(board, popPiece(createTeam(PIECE_COLORS.BLUE), PIECE_NAMES.SCOUT).piece, startIndex),
        startIndex,
        endIndex);
    let expectedIndexes = [];
    for (var i = startIndex; i !== endIndex; i-=colWidth) {
        expectedIndexes.push(i);
    }
    expectedIndexes.push(endIndex);

    expect(changedIndexes).toEqual(expectedIndexes);
});

it('can move the scout right along the entire row of the board', () => {
    const board = createBoard();
    const colWidth = Math.floor(Math.sqrt(board.length));
    const startIndex = colWidth;
    const endIndex = (2 * colWidth) - 1;
    const changedIndexes = movePieceOnBoard(
        addPieceToBoard(board, popPiece(createTeam(PIECE_COLORS.BLUE), PIECE_NAMES.SCOUT).piece, startIndex),
        startIndex,
        endIndex);
    let expectedIndexes = [];
    for (var i = startIndex; i !== endIndex; i++) {
        expectedIndexes.push(i);
    }
    expectedIndexes.push(endIndex);

    expect(changedIndexes).toEqual(expectedIndexes);
});

it('can move the scout left along the entire row of the board', () => {
    const board = createBoard();
    const colWidth = Math.floor(Math.sqrt(board.length));
    const startIndex = (colWidth * 2) - 1;
    const endIndex = colWidth;
    const changedIndexes = movePieceOnBoard(
        addPieceToBoard(board, popPiece(createTeam(PIECE_COLORS.BLUE), PIECE_NAMES.SCOUT).piece, startIndex),
        startIndex,
        endIndex);
    let expectedIndexes = [];
    for (var i = startIndex; i !== endIndex; i--) {
        expectedIndexes.push(i);
    }
    expectedIndexes.push(endIndex);
    expect(changedIndexes).toEqual(expectedIndexes);
});

it('can commit moving the scout left along the entire row of the board', () => {
    let board = createBoard();
    const colWidth = Math.floor(Math.sqrt(board.length));
    const startIndex = (colWidth * 2) - 1;
    const endIndex = colWidth;
    board = addPieceToBoard(board, popPiece(createTeam(PIECE_COLORS.BLUE), PIECE_NAMES.SCOUT).piece, startIndex);
    const changedIndexes = movePieceOnBoard(
        board,
        startIndex,
        endIndex);
    let boardAfterMove = commitMoveOnBoard(board, changedIndexes);
    expect(board).not.toBe(boardAfterMove);
});

it('can defeat a lower ranked player when attacked by a higher rank horizontally', () => {
    let board = createBoard();
    let redTeam = createTeam(PIECE_COLORS.RED);
    let blueTeam = createTeam(PIECE_COLORS.BLUE);
    const attackIndex = 0;
    let update = popPiece(blueTeam, PIECE_NAMES.MINER);
    blueTeam = update.pieces;
    const attackPiece = update.piece;
    const defendIndex = 1;
    update = popPiece(redTeam, PIECE_NAMES.SCOUT);
    redTeam = update.pieces;
    const defendPiece = update.piece;
    board = addPieceToBoard(board, attackPiece, attackIndex);
    board = addPieceToBoard(board, defendPiece, defendIndex);    
    const attackOutcome = attackMove(board, attackIndex, defendIndex);
    expect(attackOutcome).toEqual({attackPiece, defendPiece});
});
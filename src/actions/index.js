
export const MOVE_PIECE_TO_BOARD = 'MOVE_PIECE_TO_BOARD';

export const movePieceToBoard = (piece, index) => ({
    type: MOVE_PIECE_TO_BOARD,
    piece,
    index
});

export const MOVE_PIECE_TO_BOARD = 'MOVE_PIECE_TO_BOARD';
export const CHANGE_TO_NEXT_STATE = 'CHANGE_TO_NEXT_STATE';

export const movePieceToBoard = (piece, index) => ({
    type: MOVE_PIECE_TO_BOARD,
    piece,
    index
});

export const nextState = (newState) => ({
    type: CHANGE_TO_NEXT_STATE,
    newState
});

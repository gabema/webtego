
export const MOVE_PIECE_TO_BOARD = 'MOVE_PIECE_TO_BOARD';
export const CHANGE_TO_NEXT_STATE = 'CHANGE_TO_NEXT_STATE';
export const MOVE_PIECE_ON_BOARD = 'MOVE_PIECE_ON_BOARD';
export const PLAY_MOVE_PIECE_TO = 'PLAY_MOVE_PIECE_TO';

export const movePieceToBoard = (piece, index) => ({
    type: MOVE_PIECE_TO_BOARD,
    piece,
    index
});

export const movePieceOnBoard = (fromIndex, toIndex) => ({
    type: MOVE_PIECE_ON_BOARD,
    fromIndex,
    toIndex
});

export const nextState = (newState) => ({
    type: CHANGE_TO_NEXT_STATE,
    newState
});

export const playMovePieceTo = (fromIndex, toIndex) => ({
    type: PLAY_MOVE_PIECE_TO,
    fromIndex,
    toIndex
});
import { MOVE_PIECE_ON_BOARD, MOVE_PIECE_TO_BOARD, CHANGE_TO_NEXT_STATE, PLAY_MOVE_PIECE_TO } from '../actions/';
import { attackMove, addPieceToBoard, changePiecesOnBoard, createBoard, createTeam, PIECE_COLORS, popPiece, GAME_STATES, movePieceOnBoard, commitMoveOnBoard } from '../models/';
import assign from 'lodash.assign';

const initAppReducer = () => ({
    board: createBoard(),
    redTeam: createTeam(PIECE_COLORS.RED),
    blueTeam: createTeam(PIECE_COLORS.BLUE),
    game: { current: GAME_STATES.SETUP_RED },
});

const movePieceToBoard = (state, action) => {
    if (state.game.current === GAME_STATES.SETUP_RED && action.piece.color === PIECE_COLORS.RED) {
        const redTeam = popPiece(state.redTeam, action.piece.name).pieces;
        const board = addPieceToBoard(state.board, action.piece, action.index);
        const game = !redTeam.length ? {current: GAME_STATES.SETUP_BLUE} : state.game;
        if (redTeam !== state.redTeam && board !== state.board) {
            return assign({}, state, {redTeam, board, game});
        }
    }
    else if (state.game.current === GAME_STATES.SETUP_BLUE && action.piece.color === PIECE_COLORS.BLUE) {
        const blueTeam = popPiece(state.blueTeam, action.piece.name).pieces;
        const board = addPieceToBoard(state.board, action.piece, action.index);
        const game = !blueTeam.length ? {current: GAME_STATES.PASS_TO_PLAYER, next: GAME_STATES.PLAY_RED} : state.game;
        if (blueTeam !== state.blueTeam && board !== state.board) {
            return assign({}, state, {blueTeam, board, game});
        }
    }
    return state;
};

const appReducer = (state = initAppReducer(), action) => {
    switch(action.type) {
        case MOVE_PIECE_TO_BOARD: {
            return movePieceToBoard(state, action);
        }
        case CHANGE_TO_NEXT_STATE: {
            return assign({}, state, {game: {current: action.newState}});
        }
        case MOVE_PIECE_ON_BOARD: {
            return assign({}, state, {board: changePiecesOnBoard(state.board, action.fromIndex, action.toIndex)});
        }
        case PLAY_MOVE_PIECE_TO: {
            if (state.board[action.fromIndex].piece && state.board[action.toIndex].piece &&
                (state.board[action.fromIndex].piece.color !== state.board[action.toIndex].piece.color)) {
                const attackResult = attackMove(state.board, action.fromIndex, action.toIndex, state.redTeam, state.blueTeam);
                const current = GAME_STATES.PASS_TO_PLAYER;
                const next = state.game.current === GAME_STATES.PLAY_RED ? GAME_STATES.PLAY_BLUE : GAME_STATES.PLAY_RED;
                const game = {current, next};
                return assign({}, state, {game, board: attackResult.board, redTeam: attackResult.redTeam, blueTeam: attackResult.blueTeam});
            }
            const moveSpots = movePieceOnBoard(state.board, action.fromIndex, action.toIndex);
            if (moveSpots.length) {
                const board = commitMoveOnBoard(state.board, moveSpots);
                if (board !== state.board) {
                    const current = GAME_STATES.PASS_TO_PLAYER;
                    const next = state.game.current === GAME_STATES.PLAY_RED ? GAME_STATES.PLAY_BLUE : GAME_STATES.PLAY_RED;
                    const game = {current, next};
                    return assign({}, state, {board, game});
                }
            }
            return state;
        }
        default:
        return state;
    }
};

export default appReducer;

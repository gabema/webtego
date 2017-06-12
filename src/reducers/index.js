import { MOVE_PIECE_TO_BOARD, CHANGE_TO_NEXT_STATE } from '../actions/';
import { addPieceToBoard, createBoard, createTeam, PIECE_COLORS, popPiece, GAME_STATES } from '../models/';
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
        default:
        return state;
    }
};

export default appReducer;

import { combineReducers } from 'redux'
import { MOVE_PIECE_TO_BOARD } from '../actions/';
import { addPieceToBoard, createBoard, createTeam, PIECE_COLORS, popPiece } from '../models/';

const board = (state = createBoard(), action) => {
    switch(action.type) {
        case MOVE_PIECE_TO_BOARD: {
            return addPieceToBoard(state, action.piece, action.index);
        }
        default:
        return state;
    }
};

const createTeamReducer = teamColor => (state = createTeam(teamColor), action) => {
    switch(action.type) {
        case MOVE_PIECE_TO_BOARD: {
            if (action.piece.color !== teamColor) {
                return state;
            }
            return popPiece(state, action.piece.name).pieces;
        }
        default:
        return state;
    }
};

const redTeam = createTeamReducer(PIECE_COLORS.RED);
const blueTeam = createTeamReducer(PIECE_COLORS.BLUE);

const game = (state = {}, action) => {
    switch(action.type) {
        default:
        return state;
    }
};

const app = combineReducers({board, redTeam, blueTeam, game});
export default app;

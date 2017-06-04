import { combineReducers } from 'redux'
import { createBoard, createTeam, PIECE_COLORS } from '../models/';

const board = (state = createBoard(), action) => {
    switch(action.type) {
        default:
        return state;
    }
};

const createTeamReducer = teamColor => (state = createTeam(teamColor), action) => {
    switch(action.type) {
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

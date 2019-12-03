import {FETCHING_USER, SET_AUTHENTICATED, SET_USER, STOP_FETCHING_USER} from "../types";

const initialState = {
    authenticated: false,
    loading: false,

};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_USER: {
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        }
        case FETCHING_USER:{
            return {
                ...state,
                loading: true
            };
        }
        case STOP_FETCHING_USER: {
            return {
                ...state,
                loading: false
            };
        }
        default:
            return state;
    }
}

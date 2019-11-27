import {CLEAR_ERRORS, SET_ERRORS, SIGN_IN_COMPLETE, SIGN_UP_COMPLETE, SIGNING_IN, SIGNING_UP} from "../types";

const initialState = {
    loading: false,
    doneSignUp: false,
    doneSignIn: false,
    errors: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SIGNING_UP:
            return {
                ...state,
                loading: true
            };
        case SIGN_UP_COMPLETE:
            return {
                ...state,
                loading: false,
                doneSignUp: true
            };
        case SIGNING_IN:
            return {
                ...state,
                loading: true
            };
        case SIGN_IN_COMPLETE:
            return {
                ...state,
                loading: false,
                doneSignIn: true
            };
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                doneSignUp: false,
                doneSignIn: false,
                errors: {}
            };
        default:
            return state;
    }

}

import {
    RESET_UI_STATE,
    CLOSE_AUTHENTICATION_SNACKBAR,
    OPEN_AUTHENTICATION_SNACKBAR,
    SET_ERRORS,
    SIGN_IN_COMPLETE,
    SIGN_UP_COMPLETE,
    SIGNING_IN,
    SIGNING_UP,
    CREATING_LOCATION,
    CREATE_LOCATION_COMPLETE,
    JOINING_CLEAN_SITE,
    JOINED_CLEAN_SITE
} from "../types";

const initialState = {
    doneCreateLocation: false,
    doneJoinLocation: false,
    loading: false,
    doneSignUp: false,
    doneSignIn: false,
    openAuthenticationSnackbar: false,
    errors: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case OPEN_AUTHENTICATION_SNACKBAR:
            return {
                ...state,
                openAuthenticationSnackbar: true
            };
        case CLOSE_AUTHENTICATION_SNACKBAR:
            return {
                ...state,
                openAuthenticationSnackbar: false
            };
        case SIGNING_UP:
            return {...state, loading: true};
        case SIGN_UP_COMPLETE:
            return {...state, loading: false, doneSignUp: true};
        case SIGNING_IN:
            return {...state, loading: true};
        case SIGN_IN_COMPLETE:
            return {...state, loading: false, doneSignIn: true};
        case CREATING_LOCATION:
            return {...state, loading: true};
        case CREATE_LOCATION_COMPLETE:
            return {...state, loading: false, doneCreateLocation: true};
        case JOINING_CLEAN_SITE:
            return {...state, loading: true};
        case JOINED_CLEAN_SITE:
            return {...state, loading: false};
        case SET_ERRORS:
            return {...state, loading: false, errors: action.payload};
        case RESET_UI_STATE:
            return {
                ...state,
                loading: false,
                doneSignUp: false,
                doneSignIn: false,
                doneCreateLocation: false,
                errors: {}
            };
        default:
            return state;
    }

}

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
    JOINED_CLEAN_SITE,
    GETTING_REGISTERED_LOCATIONS,
    GOT_REGISTERED_LOCATIONS,
    GETTING_CREATED_LOCATIONS,
    GOT_CREATED_LOCATIONS, CLEAR_ERRORS, OPEN_SIGN_OUT_SNACKBAR, CLOSE_SIGN_OUT_SNACKBAR
} from "../types";

const initialState = {
    doneCreateLocation: false,
    doneJoinLocation: false,
    loadRegisteredLocations: false,
    loadCreatedLocations: false,
    loading: false,
    doneSignUp: false,
    doneSignIn: false,
    openAuthenticationSnackbar: false,
    openSignOutSnackbar: false,
    errors: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case OPEN_AUTHENTICATION_SNACKBAR:
            return {...state, openAuthenticationSnackbar: true};
        case CLOSE_AUTHENTICATION_SNACKBAR:
            return {...state, openAuthenticationSnackbar: false};
        case OPEN_SIGN_OUT_SNACKBAR:
            return {...state, openSignOutSnackbar: true};
        case CLOSE_SIGN_OUT_SNACKBAR:
            return {...state, openSignOutSnackbar: false};
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
            return {...state, loading: false, doneJoinLocation: true};
        case GETTING_REGISTERED_LOCATIONS:
            return {...state, loadRegisteredLocations: true};
        case GOT_REGISTERED_LOCATIONS:
            return {...state, loadRegisteredLocations: false};
        case GETTING_CREATED_LOCATIONS:
            return {...state, loadCreatedLocations: true};
        case GOT_CREATED_LOCATIONS:
            return {...state, loadCreatedLocations: false};
        case SET_ERRORS:
            return {...state, loading: false, errors: action.payload};
        case CLEAR_ERRORS: {
            return {...state, errors: {}}
        }
        case RESET_UI_STATE:
            return {
                ...state,
                doneCreateLocation: false,
                doneJoinLocation: false,
                loadRegisteredLocations: false,
                loadCreatedLocations: false,
                loading: false,
                doneSignUp: false,
                doneSignIn: false,
                openAuthenticationSnackbar: false,
                errors: {}
            };
        default:
            return state;
    }

}

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
    GOT_CREATED_LOCATIONS,
    CLEAR_ERRORS,
    OPEN_SIGN_OUT_SNACKBAR,
    CLOSE_SIGN_OUT_SNACKBAR,
    ENLARGE_MARKER,
    MINIMIZE_MARKER,
    ALREADY_JOINED_CLEAN_SITE,
    UPDATING_LOCATION,
    UPDATE_LOCATION_COMPLETE,
    DELETING_LOCATION,
    DELETE_LOCATION_COMPLETE,
    GETTING_COMPLETED_LOCATIONS,
    GOT_COMPLETED_LOCATIONS,
    MARKING_AS_DONE,
    LOCATION_MARKED_AS_DONE
} from "../types";

const initialState = {
    doneCreateLocation: false,
    doneJoinLocation: false,
    doneDeleteLocation: false,
    doneUpdateLocation: false,
    doneMarkLocation: false,
    alreadyJoinedLocation: false,
    loadRegisteredLocations: false,
    loadCreatedLocations: false,
    loadCompletedLocations: false,
    loading: false,
    doneSignUp: false,
    doneSignIn: false,
    openAuthenticationSnackbar: false,
    openSignOutSnackbar: false,
    errors: {},
    showInfoWindow: false,
    infoWindowIndex: 0
};

const defaultState = {
    doneCreateLocation: false,
    doneJoinLocation: false,
    doneDeleteLocation: false,
    doneUpdateLocation: false,
    doneMarkLocation: false,
    alreadyJoinedLocation: false,
    loadRegisteredLocations: false,
    loadCreatedLocations: false,
    loadCompletedLocations: false,
    loading: false,
    doneSignUp: false,
    doneSignIn: false,
    openAuthenticationSnackbar: false,
    openSignOutSnackbar: false,
    errors: {},
    showInfoWindow: false,
    infoWindowIndex: 0
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
        case DELETING_LOCATION:
            return {...state, loading: true};
        case DELETE_LOCATION_COMPLETE:
            return {...state, loading: false, doneDeleteLocation: true};
        case JOINING_CLEAN_SITE:
            return {...state, loading: true};
        case JOINED_CLEAN_SITE:
            return {...state, loading: false, doneJoinLocation: true};
        case UPDATING_LOCATION:
            return {...state, loading: true};
        case UPDATE_LOCATION_COMPLETE:
            return {...state, loading: false, doneUpdateLocation: true};
        case MARKING_AS_DONE:
            return {...state, loading: true};
        case LOCATION_MARKED_AS_DONE:
            return {...state, loading: false, doneMarkLocation: true};
        case ALREADY_JOINED_CLEAN_SITE:
            return {...state, loading: false, alreadyJoinedLocation: true};
        case GETTING_REGISTERED_LOCATIONS:
            return {...state, loadRegisteredLocations: true};
        case GOT_REGISTERED_LOCATIONS:
            return {...state, loadRegisteredLocations: false};
        case GETTING_CREATED_LOCATIONS:
            return {...state, loadCreatedLocations: true};
        case GOT_CREATED_LOCATIONS:
            return {...state, loadCreatedLocations: false};
        case GETTING_COMPLETED_LOCATIONS:
            return {...state, loadCompletedLocations: true};
        case GOT_COMPLETED_LOCATIONS:
            return {...state, loadCompletedLocations: false};
        case SET_ERRORS:
            return {...state, loading: false, errors: action.payload};
        case CLEAR_ERRORS: {
            return {...state, errors: {}}
        }
        case ENLARGE_MARKER:
            return {
                ...state,
                showInfoWindow: true,
                infoWindowIndex: action.payload
            };
        case MINIMIZE_MARKER:
            return {
                ...state,
                showInfoWindow: false,
                infoWindowIndex: -1
            };
        case RESET_UI_STATE:
            return state = defaultState;
        default:
            return state;
    }

}

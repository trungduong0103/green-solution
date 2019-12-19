import {
    CLOSE_AUTHENTICATION_SNACKBAR,
    OPEN_AUTHENTICATION_SNACKBAR,
    CLEAR_ERRORS,
    ENLARGE_MARKER,
    MINIMIZE_MARKER
} from "../types";

export function clearAuthenticationErrors() {
    return function (dispatch) {
        dispatch({type: CLEAR_ERRORS});
    }
}

export function openAuthenticationSnackbar() {
    return function (dispatch) {
        dispatch({type: OPEN_AUTHENTICATION_SNACKBAR});
        setTimeout(() => {
            dispatch({type: CLOSE_AUTHENTICATION_SNACKBAR})
        }, 2000);
    }
}

export function enlargeMarker(index) {
    return function (dispatch) {
        dispatch({type: ENLARGE_MARKER, payload: index})
    }
}

export function minimizeMarker() {
    return function (dispatch) {
        dispatch({type: MINIMIZE_MARKER})
    }
}

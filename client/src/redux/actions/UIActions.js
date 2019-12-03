import {CLEAR_ERRORS, CLOSE_AUTHENTICATION_SNACKBAR, OPEN_AUTHENTICATION_SNACKBAR} from "../types";

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
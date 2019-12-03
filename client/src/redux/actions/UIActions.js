import {CLEAR_ERRORS} from "../types";

export function clearAuthenticationErrors() {
    return function (dispatch) {
        dispatch({type: CLEAR_ERRORS});
    }
}

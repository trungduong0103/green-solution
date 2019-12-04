import {CLOSE_JOIN_CLEAN_UP_FORM, OPEN_JOIN_CLEAN_UP_FORM} from "../types";
import {getLocation} from "./LocationActions";

export function openCleanUpDetail(locationId) {
    return function (dispatch) {
        dispatch({
            type: OPEN_JOIN_CLEAN_UP_FORM,
            payload: locationId
        });
        dispatch(getLocation(locationId));
    }
}

export function closeCleanUpLocationForm() {
    return function (dispatch) {
        dispatch({
            type: CLOSE_JOIN_CLEAN_UP_FORM
        });
    }
}

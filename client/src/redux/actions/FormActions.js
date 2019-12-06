import {CLOSE_JOIN_CLEAN_UP_FORM, OPEN_JOIN_CLEAN_UP_FORM, OPEN_UPDATE_SITE_FORM} from "../types";
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

export function openUpdateSiteForm(locationId) {
    return function (dispatch) {
        dispatch({type: OPEN_UPDATE_SITE_FORM});
        dispatch(getLocation(locationId));
    }
}

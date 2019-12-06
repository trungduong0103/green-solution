import {
    CLOSE_JOIN_CLEAN_UP_FORM, CLOSE_UPDATE_SITE_FORM,
    LOADING_FORM,
    OPEN_JOIN_CLEAN_UP_FORM, OPEN_UPDATE_SITE_FORM,
    STOP_LOADING_FORM,
} from "../types";

const initialState = {
    openJoinSite: false,
    openUpdateSite: false,
    locationId: "",
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case OPEN_JOIN_CLEAN_UP_FORM:
            return {
                ...state,
                openJoinSite: true,
                locationId: action.payload
            };
        case CLOSE_JOIN_CLEAN_UP_FORM:
            return {
                ...state,
                openJoinSite: false
            };
        case OPEN_UPDATE_SITE_FORM:
            return {
                ...state,
                openUpdateSite: true
            };
        case CLOSE_UPDATE_SITE_FORM:
            return {
                ...state,
                openUpdateSite: false
            };
        case LOADING_FORM:
            return {
                ...state,
                loading: true
            };
        case STOP_LOADING_FORM:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    }
}

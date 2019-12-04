import {
    CLOSE_JOIN_CLEAN_UP_FORM,
    LOADING_FORM,
    OPEN_CLEAN_UP_MODAL,
    OPEN_JOIN_CLEAN_UP_FORM,
    STOP_LOADING_FORM
} from "../types";

const initialState = {
    open: false,
    locationId: "",
    loading: false,
    modalOpen: false

};

export default function (state = initialState, action) {
    switch (action.type) {
        case OPEN_JOIN_CLEAN_UP_FORM:
            return {
                ...state,
                open: true,
                locationId: action.payload
            };
        case CLOSE_JOIN_CLEAN_UP_FORM:
            return {
                ...state,
                open: false
            };
        case OPEN_CLEAN_UP_MODAL:
            return {
                ...state,
                modalOpen: true
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

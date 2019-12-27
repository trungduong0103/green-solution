import {
    CLOSE_DONE_UPDATE_USER_SNACKBAR,
    DONE_UPDATE_USER,
    FETCHING_USER,
    GOT_USER,
    UPDATING_USER,
    UPLOAD_PROFILE_IMAGE
} from "../types";

const initialState = {
    authenticated: false,
    loading: false,
    updating: false,
    doneUpdate: false,
    user: {},
    image: ''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCHING_USER: {
            return {...state, loading: true};
        }
        case GOT_USER: {
            return {...state,loading: false, user: action.payload};
        }
        case UPDATING_USER: {
            return {...state, updating: true};
        }
        case DONE_UPDATE_USER: {
            return {...state, updating: false, doneUpdate: true};
        }
        case CLOSE_DONE_UPDATE_USER_SNACKBAR: {
            return {...state, doneUpdate: false};
        }
        case UPLOAD_PROFILE_IMAGE: {
            return {
                ...state,
                image: action.payload
            }
        }
        default:
            return state;
    }
}

import {GET_ALL_LOCATIONS} from "../types";

const initialState = {
    locations: []
};


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_LOCATIONS:
            return {
                ...state,
                locations: action.payload
            };

        default:
            return state;
    }
}

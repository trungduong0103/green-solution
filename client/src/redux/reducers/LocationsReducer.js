import {GET_ALL_LOCATIONS, CREATE_NEW_LOCATION} from "../types";

const initialState = {
    locations: [],
    location: {}
};


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_LOCATIONS:
            return {
                ...state,
                locations: action.payload
            };
        case CREATE_NEW_LOCATION:
            return {
                ...state,
                locations: [...state.locations, action.payload]
            };

        default:
            return state;
    }
}

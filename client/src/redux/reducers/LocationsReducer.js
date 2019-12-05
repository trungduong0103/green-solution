import {
    GET_ALL_LOCATIONS,
    CREATE_NEW_LOCATION,
    GET_LOCATION,
    UPDATE_LOCATION,
    DELETE_LOCATION
} from "../types";

const initialState = {
    locations: [],
    location: {},
    loading: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_LOCATIONS:
            return {...state, locations: action.payload};
        case GET_LOCATION:
            return {...state, location: action.payload};
        case CREATE_NEW_LOCATION:
            return {...state, locations: [...state.locations, action.payload]};
        case UPDATE_LOCATION:
            const index = state.locations.findIndex((location) => location.id === action.payload.id);
            state.locations[index] = action.payload;
            return {...state, locations: [...state.locations]};
        case DELETE_LOCATION:
            const updatedLocations = state.locations.filter((location) => location.id !== action.payload);
            return {...state, locations: updatedLocations};
        default:
            return state;
    }
}

import {
    GET_ALL_LOCATIONS,
    CREATE_NEW_LOCATION,
    GET_LOCATION,
    UPDATE_LOCATION,
    DELETE_LOCATION,
    GOT_CREATED_LOCATIONS,
    GOT_REGISTERED_LOCATIONS,
    FILTER_LOCATION_BY_DISTRICT,
    FILTER_LOCATION_BY_CITY
} from "../types";

const initialState = {
    locations: [],
    location: {},
    loading: false,
    registeredLocations: [],
    createdLocations: [],
    filteredLocations: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_LOCATIONS:
            return {...state, locations: action.payload};
        case GET_LOCATION:
            return {...state, location: action.payload};
        case GOT_CREATED_LOCATIONS:
            return {...state, createdLocations: action.payload};
        case GOT_REGISTERED_LOCATIONS:
            return {...state, registeredLocations: action.payload};
        case CREATE_NEW_LOCATION:
            return {...state, locations: [...state.locations, action.payload]};
        case UPDATE_LOCATION:
            const index = state.createdLocations.findIndex((location) => location.id === action.payload.id);
            state.createdLocations[index] = action.payload;
            return {...state, locations: [...state.locations]};
        case DELETE_LOCATION:
            const updatedLocations = state.createdLocations.filter((location) => location.id !== action.payload);
            return {...state, createdLocations: updatedLocations};
        case FILTER_LOCATION_BY_DISTRICT:
            const filteredCities = state.locations.filter(location =>
                location.address.split(",").includes(` ${action.payload}`)
            );
            return {...state, filteredLocations: filteredCities};
        case FILTER_LOCATION_BY_CITY:
            const filteredDistricts = state.locations.filter(location =>
                location.address.split(",").includes(` ${action.payload}`)
            );
            return {...state, filteredLocations: filteredDistricts};
        default:
            return state;
    }
}

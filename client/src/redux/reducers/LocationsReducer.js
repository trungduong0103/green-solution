import {
    GET_ALL_LOCATIONS,
    CREATE_NEW_LOCATION,
    GET_LOCATION,
    UPDATE_LOCATION,
    DELETE_LOCATION,
    GOT_CREATED_LOCATIONS,
    GOT_REGISTERED_LOCATIONS,
    UPLOADING_LOCATION_LOGO,
    DONE_UPLOAD_LOCATION_LOGO,
    FILTER_LOCATIONS_BY_KEYWORD,
    RESET_FILTERS,
    FILTER_BY_START_DATE,
    FILTER_BY_START_DATE_WITH_CITY,
    FILTER_BY_START_DATE_WITH_CITY_AND_DISTRICT,

    GOT_COMPLETED_LOCATIONS, GOT_IMAGES, GETTING_IMAGES,
    FILTER_BY_CITY, FILTER_BY_CITY_WITH_START_DATE, FILTER_BY_DISTRICT, FILTER_BY_DISTRICT_WITH_CITY,
    LOCATION_DOES_NOT_EXIST
} from "../types";

const initialState = {
    locations: [],
    location: {},
    loading: false,
    registeredLocations: [],
    createdLocations: [],
    completedLocations: [],
    filteredLocations: null,
    locationId: "",
    uploadingLogo: false,
    doneUploadLogo: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ALL_LOCATIONS:
            return {...state, locations: action.payload};
        case GET_LOCATION:
            return {...state, location: action.payload, locationExists:true};
        case GOT_CREATED_LOCATIONS:
            return {...state, createdLocations: action.payload};
        case GOT_REGISTERED_LOCATIONS:
            return {...state, registeredLocations: action.payload};
        case GOT_COMPLETED_LOCATIONS:
            return {...state, completedLocations: action.payload};
        case GETTING_IMAGES:
            return {...state, loading: true};
        case GOT_IMAGES:
            const location = state.location;
            state.location.locationImages = action.payload;
            return {...state, loading: false, location: location};
        case CREATE_NEW_LOCATION:
            return {...state, locations: [...state.locations, action.payload], locationId: action.payload.id};
        case UPDATE_LOCATION:
            return {...state, location: action.payload};
        case DELETE_LOCATION:
            const updatedLocations = state.createdLocations.filter((location) => location.id !== action.payload);
            return {...state, createdLocations: updatedLocations};
        case UPLOADING_LOCATION_LOGO:
            return {...state, uploadingLogo: true};
        case DONE_UPLOAD_LOCATION_LOGO:
            return {...state, uploadingLogo: false, doneUploadLogo: true};
        case FILTER_LOCATIONS_BY_KEYWORD:
            const filteredLocationsByKeyword = state.locations.filter(location =>
                location.name === action.payload || location.organization === action.payload
            );
            return {...state, filteredLocations: filteredLocationsByKeyword};
        case FILTER_BY_START_DATE:
            const filteredLocationsByStartDate = [];
            state.locations.forEach(location => {
                const date = location.startDate.split("-").map(value => parseInt(value));
                const locationDate = new Date(date[0], date[1], date[2]);
                if (locationDate >= action.payload.startDate) filteredLocationsByStartDate.push(location);
            });
            return {...state, filteredLocations: filteredLocationsByStartDate};
        case FILTER_BY_START_DATE_WITH_CITY:
            const filteredLocationsByStartDate1 = [];
            state.locations.forEach(location => {
                const date = location.startDate.split("-").map(value => parseInt(value));
                const locationDate = new Date(date[0], date[1], date[2]);
                if (locationDate >= action.payload.startDate && action.payload.cities.includes(location.city))
                    filteredLocationsByStartDate1.push(location);
            });
            return {...state, filteredLocations: filteredLocationsByStartDate1};
        case FILTER_BY_START_DATE_WITH_CITY_AND_DISTRICT:
            const filteredLocationsByStartDate2 = [];
            state.locations.forEach(location => {
                const date = location.startDate.split("-").map(value => parseInt(value));
                const locationDate = new Date(date[0], date[1], date[2]);
                if (locationDate >= action.payload.startDate
                    && action.payload.cities.includes(location.city)
                    && action.payload.districts.includes(location.district))
                    filteredLocationsByStartDate2.push(location);
            });
            return {...state, filteredLocations: filteredLocationsByStartDate2};
        case FILTER_BY_CITY:
            const filteredLocationsByCity
                = state.locations.filter(location => action.payload.cities.includes(location.city));
            return {...state, filteredLocations: filteredLocationsByCity};
        case FILTER_BY_CITY_WITH_START_DATE:
            const filterLocationsByCity1 = [];
            state.locations.forEach(location => {
                const date = location.startDate.split("-").map(value => parseInt(value));
                const locationDate = new Date(date[0], date[1], date[2]);
                if (locationDate >= action.payload.startDate
                    && action.payload.cities.includes(location.city))
                    filterLocationsByCity1.push(location);
            });
            return {...state, filteredLocations: filterLocationsByCity1};
        case FILTER_BY_DISTRICT:
            const filteredLocationsByDistrict = state.locations.filter(location => action.payload.districts.includes(location.district));
            return {...state, filteredLocations: filteredLocationsByDistrict};
        case FILTER_BY_DISTRICT_WITH_CITY:
            const filteredLocationsByDistrict1 = state.locations.filter(location =>
                action.payload.cities.includes(location.city) && action.payload.districts.includes(location.district)
            );
            return {...state, filteredLocations: filteredLocationsByDistrict1};
        case RESET_FILTERS:
            return {...state, filteredLocations: state.locations};
        case LOCATION_DOES_NOT_EXIST:
            return {...state, locationExists:false}
        default:
            return state;
    }
}

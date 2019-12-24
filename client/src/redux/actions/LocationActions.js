import {
    CREATE_LOCATION_COMPLETE,
    CREATE_NEW_LOCATION,
    CREATING_LOCATION,
    DEFAULT_URL,
    DELETE_LOCATION,
    FILTER_LOCATION_BY_CITY, FILTER_LOCATION_BY_DISTRICT,
    GET_ALL_LOCATIONS,
    GET_LOCATION,
    GETTING_CREATED_LOCATIONS,
    GETTING_REGISTERED_LOCATIONS,
    GOT_CREATED_LOCATIONS,
    GOT_REGISTERED_LOCATIONS,
    JOINED_CLEAN_SITE,
    JOINING_CLEAN_SITE,
    LOADING_FORM,
    RESET_UI_STATE,
    STOP_LOADING_FORM,
    UPDATE_LOCATION
} from "../types";
import axios from "axios";
import {closeUpdateSiteForm} from "./FormActions";


export function getAllLocations() {
    return function (dispatch) {
        axios
            .get(`${DEFAULT_URL}/get_all_clean_sites`)
            .then((res) => {
                dispatch({
                    type: GET_ALL_LOCATIONS,
                    payload: res.data
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function getLocation(locationId) {
    return function (dispatch) {
        dispatch({type: LOADING_FORM});
        axios
            .get(`${DEFAULT_URL}/get_clean_site/${locationId}`)
            .then((res) => {
                dispatch({
                    type: GET_LOCATION,
                    payload: res.data
                });
                dispatch({type: STOP_LOADING_FORM});
            });
    }
}

export function updateLocation(locationData, email) {
    return function (dispatch) {
        console.log(locationData);
        axios
            .put(`${DEFAULT_URL}/update_clean_site/${locationData.id}`, locationData)
            .then((res) => {
                dispatch({
                    type: UPDATE_LOCATION,
                    payload: res.data.updateData
                });
            })
            .then(() => {
               dispatch(closeUpdateSiteForm());
            })
            .then(() => {
                dispatch(getAllRegisteredLocationsWithEmail({email: email}))
            });
    }
}

export function deleteLocation(locationId, email) {
    return function (dispatch) {
        axios
            .delete(`${DEFAULT_URL}/delete_clean_site/${locationId}`)
            .then((res) => {
                dispatch({
                    type: DELETE_LOCATION,
                    payload: res.data
                })
            })
            .then(() => {
                dispatch(getAllRegisteredLocationsWithEmail({email: email}))
            });
    };
}

export function createNewLocation(location) {
    return function (dispatch) {
        dispatch({type: CREATING_LOCATION});
        axios
            .post(`${DEFAULT_URL}/create_clean_site`, location)
            .then((res) => {
                dispatch({
                    type: CREATE_NEW_LOCATION,
                    payload: res.data
                });
                dispatch({type: CREATE_LOCATION_COMPLETE});
            })
            .then(() => {
                setTimeout(() => {
                    dispatch({type: RESET_UI_STATE})
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function joinLocation(info) {
    return function (dispatch) {
        dispatch({type: JOINING_CLEAN_SITE});
        axios.post(`${DEFAULT_URL}/join_clean_site`, info)
            .then((res) => {
                dispatch({type: JOINED_CLEAN_SITE})
            })
            .then(() => {
                setTimeout(() => {
                    dispatch({type: RESET_UI_STATE})
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export function getAllCreatedLocationsWithEmail(email) {
    return function (dispatch) {
        dispatch({type: GETTING_CREATED_LOCATIONS});
        axios.post(`${DEFAULT_URL}/get_created_locations`, email)
            .then((res) => {
                dispatch({type: GOT_CREATED_LOCATIONS, payload: res.data});
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export function getAllRegisteredLocationsWithEmail(email) {
    return function (dispatch) {
        dispatch({type: GETTING_REGISTERED_LOCATIONS});
        axios.post(`${DEFAULT_URL}/get_registered_locations`, email)
            .then((res) => {
                dispatch({type: GOT_REGISTERED_LOCATIONS, payload: res.data});
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

export function filterLocationsByCity(city) {
    return function (dispatch) {
        dispatch({type: FILTER_LOCATION_BY_CITY, payload: city});
    }
}

export function filterLocationsByDistrict(district) {
    return function (dispatch) {
        dispatch({type: FILTER_LOCATION_BY_DISTRICT, payload: district});
    }
}



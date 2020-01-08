import {
    ALREADY_JOINED_CLEAN_SITE,
    CREATE_LOCATION_COMPLETE,
    CREATE_NEW_LOCATION,
    CREATING_LOCATION,
    DEFAULT_URL,
    DELETE_LOCATION,
    DONE_UPLOAD_LOCATION_LOGO,
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
    UPDATE_LOCATION, UPDATE_LOCATION_COMPLETE, UPDATING_LOCATION,
    UPLOADING_LOCATION_LOGO
} from "../types";
import axios from "axios";

//GET ALL LOCATIONS
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

//GET ONE LOCATION
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

//UPDATE LOCATION
export function updateLocation(locationData, id) {
    const token = sessionStorage.getItem("FBIdToken");
    return function (dispatch) {
        dispatch({type: UPDATING_LOCATION});
        axios
            .put(`${DEFAULT_URL}/update_clean_site/${id}`, locationData,
                {headers: {"Authorization": token}})
            .then((res) => {
                dispatch({type: UPDATE_LOCATION, payload: res.data});
                dispatch({type: UPDATE_LOCATION_COMPLETE});
                setTimeout(() => {
                    dispatch({type: RESET_UI_STATE});
                }, 2000);
            })
    }
}

//DELETE LOCATION
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

//CREATE NEW LOCATION
export function createNewLocation(location) {
    const token = sessionStorage.getItem("FBIdToken");
    return function (dispatch) {
        dispatch({type: CREATING_LOCATION});
        axios
            .post(`${DEFAULT_URL}/create_clean_site`, location, {headers: {"Authorization": token}})
            .then((res) => {
                dispatch({type: CREATE_NEW_LOCATION, payload: res.data});
                dispatch({type: CREATE_LOCATION_COMPLETE});
                setTimeout(() => {
                    dispatch({type: RESET_UI_STATE})
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

//JOIN LOCATION
export function joinLocation(info) {
    return function (dispatch) {
        dispatch({type: JOINING_CLEAN_SITE});
        axios.post(`${DEFAULT_URL}/join_clean_site`, info)
            .then((response) => {
                if (response.data.message === "registration successful") return dispatch({type: JOINED_CLEAN_SITE});
                return dispatch({type: ALREADY_JOINED_CLEAN_SITE});
            })
            .then(() => {
                setTimeout(() => {
                    dispatch({type: RESET_UI_STATE});
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

//GET CREATED LOCATIONS
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
    };
}

//GET REGISTERED LOCATIONS
export function getAllRegisteredLocationsWithEmail(email) {
    return function (dispatch) {
        dispatch({type: GETTING_REGISTERED_LOCATIONS});
        axios.post(`${DEFAULT_URL}/get_registered_locations`, email)
            .then((res) => {
                dispatch({type: GOT_REGISTERED_LOCATIONS, payload: res.data});
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

//UPLOAD LOCATION LOGO
export function uploadLocationLogo(updateObj, history, locationId) {
    return function (dispatch) {
        dispatch({type: UPLOADING_LOCATION_LOGO});
        axios
            .post(`${DEFAULT_URL}/upload_location_logo`, updateObj)
            .then(() => {
                dispatch({type: DONE_UPLOAD_LOCATION_LOGO});
                setTimeout(() => {
                    history.push(`/cleanup-detail/${locationId}`);
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

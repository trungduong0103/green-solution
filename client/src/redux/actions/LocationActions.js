import {
    ALREADY_JOINED_CLEAN_SITE,
    CREATE_LOCATION_COMPLETE,
    CREATE_NEW_LOCATION,
    CREATING_LOCATION,
    DEFAULT_URL,
    DELETE_LOCATION, DELETE_LOCATION_COMPLETE,
    DELETING_LOCATION,
    DONE_UPLOAD_LOCATION_LOGO, DONE_UPLOAD_LOCATION_PHOTOS,
    GET_ALL_LOCATIONS,
    GET_LOCATION, GETTING_COMPLETED_LOCATIONS,
    GETTING_CREATED_LOCATIONS, GETTING_IMAGES,
    GETTING_REGISTERED_LOCATIONS, GOT_COMPLETED_LOCATIONS,
    GOT_CREATED_LOCATIONS, GOT_IMAGES,
    GOT_REGISTERED_LOCATIONS,
    JOINED_CLEAN_SITE,
    JOINING_CLEAN_SITE,
    LOADING_FORM, LOCATION_MARKED_AS_DONE, MARKING_AS_DONE,
    RESET_UI_STATE,
    STOP_LOADING_FORM,
    UPDATE_LOCATION, UPDATE_LOCATION_COMPLETE,
    UPDATING_LOCATION,
    UPLOADING_LOCATION_LOGO,
    LOCATION_DOES_NOT_EXIST,
    UPLOADING_LOCATION_PHOTOS,
} from "../types";
import axios from "axios";

//GET ALL LOCATIONS
export function getAllLocations() {
    return function (dispatch) {
        axios
            .get(`${DEFAULT_URL}/get_all_clean_sites`)
            .then((res) => {
                dispatch({type: GET_ALL_LOCATIONS, payload: res.data});
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
                if(res.data.message!==undefined){
                    dispatch({type: LOCATION_DOES_NOT_EXIST})
                }
                else{
                    dispatch({
                        type: GET_LOCATION,
                        payload: res.data
                    });
                }
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
                }, 1000);
            });
    }
}

//DELETE LOCATION
export function deleteLocation(locationId, history) {
    const token = sessionStorage.getItem("FBIdToken");
    return function (dispatch) {
        dispatch({type: DELETING_LOCATION});
        axios
            .delete(`${DEFAULT_URL}/delete_clean_site/${locationId}`, {headers: {"Authorization": token}})
            .then((res) => {
                dispatch({type: DELETE_LOCATION, payload: res.data});
                dispatch({type: DELETE_LOCATION_COMPLETE});
                setTimeout(() => {
                    history.push("/profile");
                }, 1000);
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

//MARK LOCATION AS DONE
export function markLocationAsDone(resultData, history) {
    return function (dispatch) {
        dispatch({type: MARKING_AS_DONE});
        axios.post(`${DEFAULT_URL}/mark_location_as_done`, resultData)
            .then(() => {
                dispatch({type: LOCATION_MARKED_AS_DONE});
                setTimeout(() => {
                    dispatch({type: RESET_UI_STATE});
                    history.push("/profile");
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
            });
    }
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

//GET COMPLETED LOCATIONS
export function getAllCompletedLocationsWithEmail(email) {
    return function (dispatch) {
        dispatch({type: GETTING_COMPLETED_LOCATIONS});
        axios.post(`${DEFAULT_URL}/get_completed_locations`, email)
            .then((res) => {
                dispatch({type: GOT_COMPLETED_LOCATIONS, payload: res.data});
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
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

//UPLOAD LOCATION PHOTOS
export function uploadLocationPhotos(uploadObj) {
    return function (dispatch) {
        dispatch({type: UPLOADING_LOCATION_PHOTOS});
        axios
            .post(`${DEFAULT_URL}/upload_location_photos`, uploadObj)
            .then((response) => {
                dispatch({type: DONE_UPLOAD_LOCATION_PHOTOS, payload: response.data});
                setTimeout(() => {
                    getLocation(uploadObj.event);
                }, 1000);
            })
            .catch((err) => {
                console.log(err);
            })
    }
}

//GET ALL LOCATION IMAGES
export function getAllLocationImages(infoObj) {
    return function (dispatch) {
        dispatch({type: GETTING_IMAGES});
        axios
            .post(`https://vtdwhkk87g.execute-api.ap-southeast-1.amazonaws.com/prod/GetImagesS3`,
                infoObj)
            .then((response) => {
                console.log(response.data);
                dispatch({type: GOT_IMAGES, payload: response.data.imageURLs});
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export function sendEmail(obj){
    return function(dispatch){
        axios
            .post("https://gle8q1lhk3.execute-api.ap-southeast-1.amazonaws.com/prod/sendemail",obj)
            .then(()=>{
                return null;
            })
            .catch((err)=>{
                console.log(err);
            })
    }
}

export function download(){
    console.log('called')
    return function(dispatch){
        axios
            .get(`${DEFAULT_URL}/download`)
            .then(()=>{
                return null;
            })
            .catch(err=>{
                console.log(err)
            })
    }
}

export function markLocationAsPaid(obj) {
    return function (dispatch) {
        axios.post(`${DEFAULT_URL}/mark_location_as_paid`, obj)
            .then(() => {
                dispatch(getAllLocations())
            })
            .catch((err) => {
                console.log(err);
            });
    }
}
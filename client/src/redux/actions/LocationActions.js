import {CREATE_NEW_LOCATION, DEFAULT_URL, GET_ALL_LOCATIONS} from "../types";
import axios from "axios";


export function getAllLocations() {
    return function (dispatch) {
        axios
            .get(`${DEFAULT_URL}/get_all_locations`)
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


export function createNewLocation(location) {
    return function (dispatch) {
        axios
            .post(`${DEFAULT_URL}/create_location`,location)
            .then((res) => {
                console.log(res.data);
                dispatch({
                    type: CREATE_NEW_LOCATION,
                    payload: res.data
                });

            })
            .catch((err) => {
                console.log(err);
            });
    };
}




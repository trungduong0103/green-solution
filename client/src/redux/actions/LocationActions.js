import {DEFAULT_URL, GET_ALL_LOCATIONS} from "../types";
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

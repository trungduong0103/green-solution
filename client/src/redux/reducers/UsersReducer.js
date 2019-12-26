import {FETCHING_USER, SET_AUTHENTICATED, SET_USER, STOP_FETCHING_USER,GET_USER,UPLOAD_PROFILE_IMAGE} from "../types";

const initialState = {
    authenticated: false,
    loading: false,
    user:{},
    image:''
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_USER: {
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        }
        case FETCHING_USER:{
            return {
                ...state,
                loading: true
            };
        }
        case STOP_FETCHING_USER: {
            return {
                ...state,
                loading: false
            };
        }
        case GET_USER:{
            return{
                ...state,
                user:action.payload
            }
        }
        case UPLOAD_PROFILE_IMAGE:{
            return{
                ...state,
                image:action.payload
            }
        }
        default:
            return state;
    }
}

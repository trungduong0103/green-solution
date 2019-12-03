import axios from "axios";
import {
    CLEAR_ERRORS,
    DEFAULT_URL,
    FETCHING_USER, SET_AUTHENTICATED,
    SET_ERRORS,
    SET_USER,
    SIGN_IN_COMPLETE,
    SIGN_UP_COMPLETE,
    SIGNING_IN,
    SIGNING_UP,
    SIGNING_UP_SOCIAL_MEDIA
} from "../types";

import firebase from "../../environments/Firebase";

const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const db = firebase.firestore;

facebookAuthProvider.setCustomParameters({
    'display': 'popup'
});

googleAuthProvider.setCustomParameters({
    'display': 'popup'
});

export function signUp(userData, history) {
    return function (dispatch) {
        dispatch({type: SIGNING_UP});
        axios
            .post(`${DEFAULT_URL}/signup`, userData)
            .then((res) => {
                setAuthorizationHeader(res.data.token);
                dispatch({type: CLEAR_ERRORS});
                setTimeout(() => {
                    history.push("/home")
                }, 1500);
            })
            .then(() => {
                dispatch({type: SIGN_UP_COMPLETE});
            })
            .then(() => {
                setTimeout(() => {
                    dispatch({type: CLEAR_ERRORS});
                }, 1500);
            })
            .catch((err) => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                });
            });
    };
}

export function signInWithEmail(userData, history) {
    return function (dispatch) {
        dispatch({type: SIGNING_IN});
        axios
            .post(`${DEFAULT_URL}/signin`, userData)
            .then((res) => {
                setAuthorizationHeader(res.data.token);
                dispatch({type: CLEAR_ERRORS});
                setTimeout(() => {
                    history.push("/home")
                }, 1500);
            })
            .then(() => {
                dispatch({type: SIGN_IN_COMPLETE});
                dispatch({type: SET_AUTHENTICATED});
            })
            .then(() => {
                setTimeout(() => {
                    dispatch({type: CLEAR_ERRORS});
                }, 1500);
            })
            .catch((err) => {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data
                });
            });
    };
}

export function getUserData() {
    return function (dispatch) {
        dispatch({type: FETCHING_USER});
        axios
            .get(`${DEFAULT_URL}/user`)
            .then((res) => {
                dispatch({
                    type: SET_USER,
                    payload: res.data
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export function signInWithFacebook(history) {
    return function (dispatch) {
        dispatch({type: SIGNING_UP_SOCIAL_MEDIA});
        firebase.auth().signInWithPopup(facebookAuthProvider)
            .then((result) => {
                if (!signedIn()) {
                    return db.collection("users").add({
                        email: result.additionalUserInfo.profile.email,
                        createdAt: new Date().toISOString()
                    });
                } else {
                    return null;
                }
            })
            .then(() => {
                setSocialMediaToken()
                    .then(() => {
                        dispatch({type: SIGN_UP_COMPLETE});
                        dispatch({type: SET_AUTHENTICATED});
                        setTimeout(() => {
                            history.push("/home")
                        }, 1500);
                    });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;
                console.log(errorCode, "error code");
                console.log(errorMessage, "error message");
                console.log(email, "error email");
                console.log(credential, "error credential");
            });
    }
}

export function signInWithGoogle(history) {
    return function (dispatch) {
        dispatch({type: SIGNING_UP_SOCIAL_MEDIA});
        firebase.auth().signInWithPopup(googleAuthProvider)
            .then((result) => {
                if (!signedIn()) {
                    return db.collection("users").add({
                        email: result.additionalUserInfo.profile.email,
                        createdAt: new Date().toISOString()
                    });
                } else {
                    return null;
                }
            })
            .then(() => {
                setSocialMediaToken()
                    .then(() => {
                        dispatch({type: SIGN_UP_COMPLETE});
                        dispatch({type: SET_AUTHENTICATED});
                        setTimeout(() => {
                            history.push("/home")
                        }, 1500);
                    });
            })
            .catch(function (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;
                console.log(errorCode, "error code");
                console.log(errorMessage, "error message");
                console.log(email, "error email");
                console.log(credential, "error credential");
            });
    }
}

export function signedIn() {
    return function (dispatch) {
        const user = firebase.auth().currentUser;
        if (user !== null) {
            user.providerData.forEach(function (profile) {
                console.log("Sign-in provider: " + profile.providerId);
                console.log("  Provider-specific UID: " + profile.uid);
                console.log("  Name: " + profile.displayName);
                console.log("  Email: " + profile.email);
                console.log("  Photo URL: " + profile.photoURL);
            });
            return true;
        }
        return false;
    }
}

export function signOut() {
    return function (dispatch) {
        const user = firebase.auth().currentUser;
        if (user !== null) {
            firebase.auth().signOut()
                .then(() => {
                    localStorage.clear();
                    alert("signed out.")
                })
                .catch((err) => {
                    console.log(err);
                })
        }

    }
}

const setSocialMediaToken = () => {
    console.log("called to get token.");
    return firebase.auth().currentUser.getIdToken(true)
        .then((idToken) => {
            setAuthorizationHeader(idToken);
        })
};

const setAuthorizationHeader = (token) => {
    const FBIdToken = `Bearer ${token}`;
    localStorage.setItem('FBIdToken', FBIdToken);
    //set Authorization header with token "Bearer ..."
    axios.defaults.headers.common['Authorization'] = FBIdToken;
};


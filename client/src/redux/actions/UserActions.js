import axios from "axios";
import {
    RESET_UI_STATE,
    DEFAULT_URL,
    SET_ERRORS,
    SIGN_IN_COMPLETE,
    SIGN_UP_COMPLETE,
    SIGNING_IN,
    SIGNING_UP,
    SIGNING_UP_SOCIAL_MEDIA,
    OPEN_SIGN_OUT_SNACKBAR,
    CLOSE_SIGN_OUT_SNACKBAR,
    UPLOAD_PROFILE_IMAGE,
    FETCHING_USER,
    GOT_USER,
    UPDATING_USER,
    DONE_UPDATE_USER,
    CLOSE_DONE_UPDATE_USER_SNACKBAR
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
            .post(`${DEFAULT_URL}/sign_up`, userData)
            .then((res) => {
                setAuthorizationHeader(res.data.token);
                dispatch({type: RESET_UI_STATE});
                setTimeout(() => {
                    history.push("/home")
                }, 1500);
            })
            .then(() => {
                dispatch({type: SIGN_UP_COMPLETE});
            })
            .then(() => {
                setTimeout(() => {
                    dispatch({type: RESET_UI_STATE});
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
            .post(`${DEFAULT_URL}/sign_in`, userData)
            .then((res) => {
                setAuthorizationHeader(res.data.token);
                dispatch({type: RESET_UI_STATE});
                setTimeout(() => {
                    history.push("/home")
                }, 1500);
            })
            .then(() => {
                dispatch({type: SIGN_IN_COMPLETE});
            })
            .then(() => {
                setTimeout(() => {
                    dispatch({type: RESET_UI_STATE});
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

export function signUserOut() {
    return function (dispatch) {
        firebase.auth().signOut()
            .then(() => {
                localStorage.clear();
                dispatch({type: OPEN_SIGN_OUT_SNACKBAR});
            })
            .then(() => {
                setTimeout(() => {
                    dispatch({type: CLOSE_SIGN_OUT_SNACKBAR})
                }, 3000);
            })
            .then(() => {
                setTimeout(() => {
                    window.location.href = "/home";
                });
            })
            .catch((err) => {
                console.log(err);
            });
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

export function updateUser(user) {
    return function (dispatch) {
        dispatch({type: UPDATING_USER});
        axios
            .put(`${DEFAULT_URL}/update_user_profile`, user)
            .then(() => {
                dispatch(getUser({email: user.email}))
            })
            .then(() => {
                dispatch({type: DONE_UPDATE_USER});
                setTimeout(() => {
                    dispatch({type: CLOSE_DONE_UPDATE_USER_SNACKBAR});
                }, 2000);
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function updateUserAvatar(updateObj) {
    console.log(updateObj);
    return function (dispatch) {
        dispatch({type: UPDATING_USER});
        axios
            .put(`${DEFAULT_URL}/update_user_avatar`, updateObj)
            .then(() => {
                dispatch(getUser({email: updateObj.username}));
            })
            .then(() => {
                dispatch({type: DONE_UPDATE_USER});
                setTimeout(() => {
                    dispatch({type: CLOSE_DONE_UPDATE_USER_SNACKBAR});
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

export function getUser(email) {
    return function (dispatch) {
        dispatch({type: FETCHING_USER});
        axios
            .post(`${DEFAULT_URL}/get_user_profile`, email)
            .then((res) => {
                dispatch({type: GOT_USER, payload: res.data})
            })
            .catch(error => {
                console.log(error)
            })
    }
}

export function uploadImage(image) {
    // console.log(image);
    // return function (dispatch) {
    //     axios
    //         .post("https://9anyxuu738.execute-api.ap-southeast-1.amazonaws.com/prod/UploadToS3", image)
    //         .then((res) => {
    //             dispatch({
    //                 type: UPLOAD_PROFILE_IMAGE,
    //                 payload: res.data.imageURL
    //             })
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // }
}

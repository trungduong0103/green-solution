const {db} = require("../utils/admin");
const firebase = require("../environments/config");
const axios = require("axios");
const {sendWelcomeEmail} =require( "../utils/email");
const {validateSignUpData, validateLoginData} = require("../utils/validators");
const {INVALID_CREDENTIALS, EMAIL_ALREADY_IN_USE, UNIDENTIFIED_ERRORS} = require("../environments/errorTemplates");
const {AWS_RESIZE_IMAGE_API} = require("../environments/environments");

//executes whenever a new user is created in Firebase Authentication
exports.onUserCreateInAuth = (userRecord) => {
    return Promise.all([sendWelcomeEmail(userRecord.email), createRecordInFirestore(userRecord)]);
};

//executes whenever an account is deleted from Firebase Authentication
exports.onUserDeleteInAuth = (userRecord) => {
    return Promise.all([deleteUserRecordInFirestore(userRecord)]);
};

function deleteUserRecordInFirestore(record) {
    if (checkUserRecordInFirestore(record.email)) {
        return db.collection("users").doc(record.email).delete();
    }
    return null;
}

function checkUserRecordInFirestore(recordId) {
    return db.collection("users").doc(recordId).get()
        .then((doc) => {
            return doc.exists;
        })
}

function createRecordInFirestore(record) {
    return db.collection("users")
        .doc(record.email)
        .set({
            createdAt: new Date().toISOString(),
            verified: 1
        })
        .then(() => {
            console.log("user with email: ", record.email, " created successfully");
            return null;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
}

exports.signUp = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    };

    let userId;

    const {valid, errors} = validateSignUpData(newUser);

    if (!valid) return res.status(400).json(errors);

    return firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then((data) => {
            userId = data.user.uid;
            return data.user.getIdToken();
        })
        .then((token) => {
            return res.status(201).json({token});
        })
        .catch((err) => {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
                return res
                    .status(400)
                    .json({email: EMAIL_ALREADY_IN_USE});
            } else {
                return res
                    .status(500)
                    .json({general: UNIDENTIFIED_ERRORS});
            }
        });
};

//Log user in
exports.signIn = (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password
    };

    const {valid, errors} = validateLoginData(user);

    if (!valid) return res.status(400).json(errors);

    return firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then(data => {
            return data.user.getIdToken();
        })
        .then(token => {
            return res.json({token});
        })
        .catch(err => {
            console.error(err);
            return res
                .status(403)
                .json({general: INVALID_CREDENTIALS});
        });
};

exports.getAuthenticatedUserProfile = (req, res) => {
    const userEmail = req.body.email;
    return db
        .collection("users")
        .doc(userEmail)
        .get()
        .then((snapshot) => {
            const userProfile = snapshot.data();
            userProfile.email = snapshot.id;
            return res.json(userProfile);
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.updateUserProfile = (req, res) => {
    const updateData = req.body;
    return db
        .collection("users")
        .doc(req.body.email)
        .update(updateData)
        .then(() => {
            return res.json(updateData);
        })
        .catch((err) => {
            console.log(err);
            res.json(err);
        })
};

exports.updateUserAvatar = (req, res) => {
    axios.post(AWS_RESIZE_IMAGE_API, req.body)
        .then((res) => {
            console.log(res.data.imageURL);
            return db
                .collection("users")
                .doc(req.body.username)
                .update({avatarUrl: res.data.imageURL});
        })
        .then(() => {
            return res.json({message: "avatar update successful."});
        })
        .catch((err) => {
            console.log(err);
        });
};

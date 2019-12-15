const {sendEmailToUser} = require("./topics");
const {db} = require("../utils/admin");
const firebase = require("../environments/config");
const {validateSignUpData, validateLoginData} = require("../utils/validators");
const {WELCOME_MESSAGE} = require("../environments/emailTemplates");
const {INVALID_CREDENTIALS, EMAIL_ALREADY_IN_USE, UNIDENTIFIED_ERRORS} = require("../environments/errorTemplates");

//executes whenever a new user is created in Firebase Authentication
exports.onUserCreateInAuth = (userRecord) => {
    return Promise.all([sendGreetingEmail(userRecord.email), createRecordInFirestore(userRecord)]);
};

//executes whenever an account is deleted from Firebase Authentication
exports.onUserDeleteInAuth = (userRecord) => {
    return Promise.all([deleteUserRecordInFirestore(userRecord)]);
};

function deleteUserRecordInFirestore(record) {
    if (checkUserRecordInFirestore(record.uid)) {
        return db.collection("users").doc(record.uid).delete();
    }
    return null;
}

function sendGreetingEmail(email) {
    return sendEmailToUser(WELCOME_MESSAGE, email);
}

function checkUserRecordInFirestore(recordId) {
    return db.collection("users").doc(recordId).get()
        .then((doc) => {
            return doc.exists;
        })
}

function createRecordInFirestore(record) {
    return db.collection("users")
        .doc(record.uid)
        .set({
            email: record.email,
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

//get user information
exports.getAuthenticatedUser = (req, res) => {
    db.collection("users")
        .doc(`${req.user.username}`)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return res.json(doc.data());
            } else {
                return res.json({error: "User not found."});
            }
        })
        .catch((err) => {
            console.log(err);
            return res.json({error: err.code});
        })
};

exports.checkUserRecord = (userId) => {
    return db
        .collection("users")
        .doc(userId)
        .get()
        .then((snapshot) => {
            return snapshot.exists
        })
        .catch((err) => {
            console.log(err);
        });
};

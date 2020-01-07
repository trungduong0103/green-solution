const {db} = require("../utils/admin");
const {admin} = require("../utils/admin");
const axios = require("axios");
const {sendLocationConfirmationEmail}  = require("../utils/email");
const {AWS_UPLOAD_IMAGE_API} = require("../environments/environments");

//CREATE NEW CLEAN SITE
exports.createNewLocation = (req, res) => {
    const creationTime = new Date().toISOString();
    const newLocation = req.body;
    req.body.createdAt = creationTime;
    return db.collection("cleanUpLocations")
        .add(newLocation)
        .then((ref) => {
            console.log("Clean up location ", ref.id, " created.");
            newLocation.id = ref.id;
            return res.json(newLocation);
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
};

//GET ALL CLEAN SITES
exports.getAllCleanUpLocations = (req, res) => {
    const documents = [];
    return db.collection("cleanUpLocations").get()
        .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const cleanUpData = doc.data();
                cleanUpData.id = doc.id;
                cleanUpData.lat = parseFloat(doc.data().lat);
                cleanUpData.lng = parseFloat(doc.data().lng);
                documents.push(cleanUpData);
            });
            return res.json(documents);
        })
        .catch((err) => {
            console.log(err);
            return res.json({error: err.code});
        })

};

//GET ONE CLEAN SITE
exports.getCleanUpLocation = (req, res) => {
    return db.collection("cleanUpLocations")
        .doc(req.params.location_id)
        .get()
        .then((doc) => {
            if (doc.exists) {
                const cleanUpData = doc.data();
                cleanUpData.id = doc.id;
                cleanUpData.lat = parseFloat(doc.data().lat);
                cleanUpData.lng = parseFloat(doc.data().lng);
                return res.json(cleanUpData);
            }
            return res.json({message: "clean up location not found."});
        })
        .catch((err) => {
            console.log(err);
            return res.json({error: err.code});
        })
};

//UPDATE A CLEAN SITE
exports.updateCleanUpLocation = (req, res) => {
    const locationId = req.params.location_id;
    const updateData = req.body;
    return db.collection("cleanUpLocations").doc(locationId)
        .update(updateData)
        .then(() => {
            return res.json({updateData});
        })
        .catch((err) => {
            console.log(err);
        });
};

//DELETE A CLEAN SITE
exports.deleteCleanUpLocation = (req, res) => {
    return db.collection("cleanUpLocations")
        .doc(req.params.location_id)
        .delete()
        .then(() => {
            return res.json(req.params.location_id);
        })
        .catch((err) => {
            console.log(err);
        });
};

//JOIN A CLEAN SITE
exports.joinCleanUpLocation = (req, res) => {
    const userInfo = req.body.userInfo;
    const additionalInfo = req.body.additionalInfo;

    checkUserAlreadyCreatedInFirestore(userInfo.email)
        .then((value) => {
            if (value === false) {
                console.log("no record found while joining, creating new record...");
                return createUserUsingEmail(req.body);
            }
            console.log("record with user already exists");
            return null;
        })
        .catch((err) => {
            console.log(err);
        });

    checkUserAlreadyRegisteredToLocation(additionalInfo.locationId, userInfo.email)
        .then(message => {
            console.log("message", message);
            if (message === "registered") return res.json({message: "user already registered"});
            else {
                createNewRegistrationRecord(userInfo, additionalInfo);
                addEmailToRegisteredUsers(userInfo.email, additionalInfo.locationId);
                sendConfirmationToUserEmail(userInfo.email, additionalInfo.locationId);
                return res.json({message: "registration successful"});
            }
        })
        .catch((err) => {
            console.log(err);
        })
};

function checkUserAlreadyCreatedInFirestore(email) {
    return db.collection("users")
        .doc(email)
        .get()
        .then((snapshot) => {
            return snapshot.exists;
        })
        .catch((err) => {
            console.log(err);
        });
}

function createUserUsingEmail(record) {
    const userInfo = record.userInfo;
    return db.collection("users")
        .doc(userInfo.email)
        .set({phoneNumber: userInfo.phoneNumber, verified: 0});
}

function checkUserAlreadyRegisteredToLocation(locationId, email) {
    const documents = [];

    return db.collection("locationRegistrations")
        .where("email", "==", email)
        .where("locationId", "==", locationId)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((snapshot) => {
                const data = snapshot.data();
                data.id = snapshot.id;
                documents.push(data);
            });
            if (documents.length !== 0) return "registered";
            return "ok";
        })
        .catch((err) => {
            console.log(err);
        })
}

function createNewRegistrationRecord(userInfo, additionalInfo) {
    const registrationDocument = {
        email: userInfo.email,
        locationId: additionalInfo.locationId,
        tools: additionalInfo.tools,
        tShirtSize: additionalInfo.tShirtSize
    };

    return db
        .collection("locationRegistrations")
        .add(registrationDocument);
}

function addEmailToRegisteredUsers(email, locationId) {
    return db
        .collection("cleanUpLocations")
        .doc(locationId)
        .update({registeredUsers: admin.firestore.FieldValue.arrayUnion(email)});
}

function sendConfirmationToUserEmail(email, locationId) {
    return db.collection("cleanUpLocations")
        .doc(locationId)
        .get()
        .then((doc) => {
            return sendLocationConfirmationEmail(email, doc.data().name);
        })
        .catch((err) => {
            console.log(err);
        });
}

//LEAVE A CLEAN SITE
exports.leaveCleanUpLocation = (req, res) => {
    const locationId = req.body.locationId;
    const email = req.body.email;

    const deleteRecord = db.collection("locationRegistrations")
        .where("locationId", "==", locationId)
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
            if (querySnapshot.empty) {return res.json({message: "no record exists"});}
            return querySnapshot.forEach((snap) => {return snap.ref.delete()});
        })
        .catch((err) => {
            console.log(err)
        });

    const deleteEmail = db.collection("cleanUpLocations")
        .doc(locationId)
        .update({registeredUsers: admin.firestore.FieldValue.arrayRemove(email)})
        .catch((err) => {
            console.log(err);
        });

    return Promise.all([deleteRecord, deleteEmail])
        .then(() => {return res.json({message: "success"})})
        .catch((err) => {return res.json(err)});
};

//GET REGISTERED CLEAN SITES
exports.getUserRegisteredLocations = (req, res) => {
    const email = req.body.email;
    const documents = [];
    return db
        .collection("cleanUpLocations")
        .where("registeredUsers", "array-contains", email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((snap) => {
                const location = snap.data();
                location.id = snap.id;
                documents.push(location)
            });
            return res.json(documents);
        })
        .catch((err) => {
            console.log(err);
        });
};

//GET CREATED CLEAN SITES
exports.getCreatedLocations = (req, res) => {
    return getCreatedLocationsFromEmail(req.body.email)
        .then((data) => {
            return res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
};

function getCreatedLocationsFromEmail(email) {
    const documents = [];
    return db
        .collection("cleanUpLocations")
        .where("creator", "==", email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((snap) => {
                const created = snap.data();
                created.id = snap.id;
                documents.push(created);
            });
            return documents;
        })
        .catch((err) => {
            console.log(err);
        });
}

//GET REGISTERED USERS
exports.getRegisteredUsersOfLocation = (req, res) => {
    const locationId = req.body.locationId;
    const email = req.body.email;
    const registeredDocs = [];
    return db.collection("locationRegistrations")
        .where("locationId", "==", locationId)
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((snap) => {registeredDocs.push(snap.data())});
            return res.json(registeredDocs);
        })
        .catch((err) => {console.log(err)});
};


//ADD LOCATION LOGO
exports.uploadLocationLogo = (req, res) => {
    axios.post(AWS_UPLOAD_IMAGE_API, req.body)
        .then((res) => {
            return db
                .collection("cleanUpLocations")
                .doc(req.body.event)
                .update({logoUrl: res.data.imageURL});
        })
        .then(() => {
            return res.json({message: "logo upload successful."});
        })
        .catch((err) => {
            console.log(err);
        })
};


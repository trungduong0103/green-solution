const {db} = require("../utils/admin");
const {admin} = require("../utils/admin");
const axios = require("axios");
const {sendLocationConfirmationEmail} = require("../utils/email");
const {AWS_UPLOAD_IMAGE_API, AWS_BULK_UPLOAD_IMAGES_API} = require("../environments/environments");
const json2csv = require("json2csv").parse;

//CREATE NEW CLEAN SITE
exports.createNewLocation = (req, res) => {
    const creationTime = new Date().toISOString();
    const newLocation = req.body;
    newLocation.createdAt = creationTime;
    newLocation.done = 0;
    return db.collection("cleanUpLocations")
        .add(newLocation)
        .then((ref) => {
            console.log("Clean up location ", ref.id, " created.");
            newLocation.id = ref.id;
            return res.json(newLocation);
        })
        .catch((err) => {
            console.log(err);
            return res.json({error: err});
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
            return res.json({error: err});
        });

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
            return res.json({error: err});
        })
};

//UPDATE A CLEAN SITE
exports.updateCleanUpLocation = (req, res) => {
    const locationId = req.params.location_id;
    const updateData = req.body;
    return db.collection("cleanUpLocations").doc(locationId)
        .update(updateData)
        .then(() => {
            return res.json(req.body);
        })
        .catch((err) => {
            console.log(err);
            return res.json({error: err});
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
            return res.json({error: err});
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
            return res.json({error: err});
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
            return res.json({error: err});
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
            if (querySnapshot.empty) {
                return res.json({message: "no record exists"});
            }
            return querySnapshot.forEach((snap) => {
                return snap.ref.delete()
            });
        })
        .catch((err) => {
            console.log(err);
            return res.json({error: err});
        });

    const deleteEmail = db.collection("cleanUpLocations")
        .doc(locationId)
        .update({registeredUsers: admin.firestore.FieldValue.arrayRemove(email)})
        .catch((err) => {
            console.log(err);
        });

    return Promise.all([deleteRecord, deleteEmail])
        .then(() => {
            return res.json({message: "success"})
        })
        .catch((err) => {
            return res.json({error: err});
        });
};

//MARK LOCATION AS DONE
exports.markLocationAsDone = (req, res) => {
    const data = req.body;
    const locationId = data.id;
    return db
        .collection("completedLocations")
        .add(data)
        .then(() => {
            changeLocationStatusToDone(locationId);
            return res.json({message: "success"});
        })
        .catch((err) => {
            console.log(err);
            return res.json({error: err});
        })
};

function changeLocationStatusToDone(locationId) {
    return db
        .collection("cleanUpLocations")
        .doc(locationId)
        .update({done: 1})
        .catch((err) => {
            console.log(err);
        });
}

//GET REGISTERED CLEAN SITES
exports.getUserRegisteredLocations = (req, res) => {
    const email = req.body.email;
    const documents = [];
    return db
        .collection("cleanUpLocations")
        .where("registeredUsers", "array-contains", email)
        .where("done", "==", 0)
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
            return res.json({error: err});
        });
};

//GET CREATED CLEAN SITES
exports.getCreatedLocations = (req, res) => {
    const email = req.body.email;
    const documents = [];
    return db
        .collection("cleanUpLocations")
        .where("creator", "==", email)
        .where("done", "==", 0)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((snap) => {
                const created = snap.data();
                created.id = snap.id;
                documents.push(created);
            });
            return res.json(documents);
        })
        .catch((err) => {
            console.log(err);
            return res.json({error: err});
        });
};

//GET COMPLETED LOCATIONS
exports.getCompletedLocations = (req, res) => {
    const email = req.body.email;
    const documents = [];

    return db
        .collection("cleanUpLocations")
        .where("creator", "==", email)
        .where("done", "==", 1)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((snap) => {
                const created = snap.data();
                created.id = snap.id;
                documents.push(created);
            });
            return res.json(documents);
        })
        .catch((err) => {
            console.log(err);
            return res.json({error: err});
        })
};

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
            querySnapshot.forEach((snap) => {
                registeredDocs.push(snap.data())
            });
            return res.json(registeredDocs);
        })
        .catch((err) => {
            console.log(err);
            return res.json({error: err});
        });
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
            return res.json({error: err});
        })
};

//UPLOAD LOCATION PHOTOS
// API URL: https://ujp2dr3w2l.execute-api.ap-southeast-1.amazonaws.com/prod/UploadS3NoResize
//
//     Make a POST request with the following body:
//
// {
//     "image": [Base64 encoded string of the image],
//     "username": [username of the user for key],
//     "event": [event for key]
// }

exports.uploadLocationPhotos = (req, res) => {
    const images = req.body.images;
    const username = req.body.username;
    const event = req.body.event;

    axios.post(AWS_BULK_UPLOAD_IMAGES_API, {
        images: images,
        username: username,
        event: event
    })
        .then((response) => {
             db
                .collection("cleanUpLocations")
                .doc(event)
                .update({locationImages: response.data.imageURLs});
             return res.json({message: "ok"});
        })
        .catch((err) => {
            console.log(err);
            return res.json({message: err});
        });
};

exports.getLocationImages = (req, res) => {
    const locationID = req.body.locationId;
    return db
        .collection("cleanUpLocations")
        .doc(locationID)
        .get()
        .then((snap) => {
            return res.json(snap.data().locationImages);
        })
        .catch((err) => {
            console.log(err);
            return res.json({error: err});
        });
};

//DOWNLOAD EVENTS LIST AS CSV
exports.downloadAllEvents = (req, res) => {
    return db.collection("cleanUpLocations").get().then(querySnapshot => {
        const events = [];
        querySnapshot.forEach(snapshot => {
            events.push(snapshot.data());
        });

        const csv = json2csv(events);
        res.setHeader(
            "Content-disposition",
            "attachment; filename=events.csv"
        );
        res.set("Content-Type", "text/csv");
        res.status(200).send(csv);
        return null;
    })
        .catch(err => {
            console.log(err);
        })
};


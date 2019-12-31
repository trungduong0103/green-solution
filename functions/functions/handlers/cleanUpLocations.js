const {sendEmailToUser} = require("./topics");

const {db} = require("../utils/admin");
const {admin} = require("../utils/admin");
const axios = require("axios");
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
    const locationId = req.body.location_id;
    const email = req.body.email;

    checkUserAlreadyCreatedInFirestore(email)
        .then((value) => {
            if (value === false) {
                console.log("no record found while joining, creating new record...");
                return createUserUsingEmail(email);
            }
            return null;
        })
        .catch((err) => {
            console.log(err);
        });

    return Promise.all([
        registerUserToCleanSite(email, locationId),
        sendConfirmationToUserEmail(email, locationId)])
        .then(() => {
            return res.json({message: "registration successful"})
        })
        .catch((err) => {
            console.log(err);
        });
};

function createUserUsingEmail(email) {
    return db.collection("users")
        .doc(email)
        .add({
            createdAt: new Date().toISOString(),
            verified: 0
        });
}

function registerUserToCleanSite(email, locationId) {
    return db
        .collection("cleanUpLocations")
        .doc(locationId)
        .update({registeredUsers: admin.firestore.FieldValue.arrayUnion(email)});
}

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
        })

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
    const locationId = req.params.location_id;
    return db
        .collection("cleanUpLocations")
        .doc(locationId)
        .get()
        .then((documentSnapshot) => {
            return res.json(documentSnapshot.data().registeredUsers);
        });
};

function sendConfirmationToUserEmail(email, locationId) {
    return db.collection("cleanUpLocations")
        .doc(locationId)
        .get()
        .then((doc) => {
            return sendEmailToUser(`Thanks for joining ${doc.data().name}`, email)
        })
        .catch((err) => {
            console.log(err);
        });
}

//Add location logo
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

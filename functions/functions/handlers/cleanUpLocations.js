const {sendEmailToUser} = require("./topics");

const {db} = require("../utils/admin");
const {admin} = require("../utils/admin");

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

    if (checkUserAlreadyCreatedInFirestore(email)) {
        console.log(`no email found in database while joining, creating new record with email ${email}`);
        createUserUsingEmail(email);
    }
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
        .add({
            email: email,
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
    const documents = [];
    return db.collection("users")
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((snap) => {
                documents.push(snap.id);
            });
            if (documents.length > 0) {
                console.log("already created");
                return true;
            } else {
                console.log("no record yet");
                return false;
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

//GET REGISTERED CLEAN SITES
exports.getUserRegisteredLocations = (req, res) => {


};


function getLocationDocumentsByEmail(email) {
    const documents = [];
    return db.collection("locationRegistrations")
        .where("email", "==", email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((snap) => {
                documents.push(snap.data().locationId);
            });
            return documents;
        })
        .catch((err) => {
            console.log(err);
        });
}

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

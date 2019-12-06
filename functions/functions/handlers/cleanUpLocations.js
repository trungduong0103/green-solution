const {sendEmailToUser} = require("./topics");

const {db} = require("../utils/admin");
const {firebase} = require("../environments/config");
const {admin} = require("../utils/admin");

exports.createNewLocation = (req, res) => {
    const creationTime = new Date().toISOString();
    return db.collection("cleanUpLocations")
        .add({
            name: req.body.name,
            lat: req.body.lat,
            lng: req.body.lng,
            address: req.body.address,
            description: req.body.description,
            startDate: req.body.startDate,
            startTime: req.body.startTime,
            createdAt: creationTime,
            creator: req.body.creator
        })
        .then((ref) => {
            console.log("Clean up location ", ref.id, " created.");
            return res.json({
                id: ref.id,
                name: req.body.name,
                lat: req.body.lat,
                lng: req.body.lng,
                address: req.body.address,
                description: req.body.description,
                startDate: req.body.startDate,
                startTime: req.body.startTime,
                createdAt: creationTime,
                creator: req.body.creator
            });
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
};

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

exports.getCleanUpLocation = (req, res) => {
    return db.collection("cleanUpLocations")
        .doc(req.params.locationId)
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

exports.updateCleanUpLocation = (req, res) => {
    const updateData = req.body;
    return db.collection("cleanUpLocations").doc(updateData.id)
        .update({
            name: req.body.name,
            lat: req.body.lat,
            lng: req.body.lng,
            address: req.body.address,
            description: req.body.description,
            startDate: req.body.startDate,
            startTime: req.body.startTime
        })
        .then(() => {
            return res.json({
                updateData
            });
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.deleteCleanUpLocation = (req, res) => {
    return db.collection("cleanUpLocations")
        .doc(req.params.locationId)
        .delete()
        .then(() => {
            return res.json(req.params.locationId);
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.joinCleanUpLocation = (req, res) => {
    handleJoinLocation("email", req.body.email, req.body.id)
        .then(() => {
            return res.json({message: "joined"});
        })
        .catch((err) => {
            return res.json({error: err});
        });
    sendConfirmationEmailToUsers(req.body.id, req.body.email);
    return addEmailToRegisteredUsersArray(req.body.id, req.body.email);
};

exports.getUserRegisteredLocations = (req, res) => {
    return getRegisteredLocationsFromUserEmail(req.body.email)
        .then((data) => {
            return res.json(data);
        })
        .catch((err) => {
            console.log(err);
        })
};

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

function getRegisteredLocationsFromUserEmail(email) {
    const documents = [];
    return db
        .collection("cleanUpLocations")
        .where("registeredUsers", "array-contains",email)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((snap) => {
                const registered = snap.data();
                registered.id = snap.id;
                documents.push(registered);
            });
            return documents;
        })
        .catch((err) => {
            console.log(err);
        });
}

function handleJoinLocation(field, value, locationId) {
    const documents = [];
    return db
        .collection("users")
        .where(field, "==", value)
        .get()
        .then((querySnapshot) => {
            querySnapshot.forEach((snap) => {
                documents.push({id: snap.id});
            });
            if (documents.length !== 0) {
                console.log("found in database");
                addLocationIdToRegisteredLocationsArray(documents[0].id, locationId);
                return true;
            } else {
                console.log("not found in database");
                createUserAndAddLocationId(value, locationId);
                return false;
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function createUserAndAddLocationId(email, locationId) {
    return db
        .collection("users")
        .add({
            email: email,
            createdAt: new Date().toISOString(),
            verified: 0,
            registeredLocations: admin.firestore.FieldValue.arrayUnion(locationId)
        });
}

function addLocationIdToRegisteredLocationsArray(refId, locationId) {
    return db
        .collection("users")
        .doc(refId)
        .update({
            registeredLocations: admin.firestore.FieldValue.arrayUnion(locationId)
        })
        .then(() => {
            return true;
        })
        .catch((err) => {
            console.log(err);
            return err;
        })
}

function addEmailToRegisteredUsersArray(locationId, email) {
    return db
        .collection("cleanUpLocations")
        .doc(locationId)
        .update({
            registeredUsers: admin.firestore.FieldValue.arrayUnion(email)
        })
        .then(() => {
            return true;
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
}

function sendConfirmationEmailToUsers(locationId, email) {
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

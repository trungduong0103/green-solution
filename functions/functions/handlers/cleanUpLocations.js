const {db} = require("../utils/admin");
const {firebase} = require("../environments/config");

exports.createNewLocation = (req, res) => {
    const creationTime = new Date().toISOString();
    return db.collection("cleanUpLocations")
        .add({
            name: req.body.name,
            lat: req.body.lat,
            lng: req.body.lng,
            createdAt: creationTime
        })
        .then((ref) => {
            console.log("Clean up location ", ref.id, " created.");
            return res.json({
                id: ref.id,
                name: req.body.name,
                lat: req.body.lat,
                lng: req.body.lng,
                createdAt: creationTime

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
                documents.push({
                    id: doc.id,
                    name: doc.data().name,
                    lat: parseFloat(doc.data().lat),
                    lng: parseFloat(doc.data().lng),
                    createdAt: doc.data().createdAt
                });
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
                return res.json(doc.data());
            }
            return res.json({message: "clean up location not found."});
        })
        .catch((err) => {
            console.log(err);
            return res.json({error: err.code});
        })
};

exports.updateCleanUpLocation = (req, res) => {
    let docRef = db.collection("cleanUpLocations").doc(req.body.id);
    docRef.get()
        .then((snap) => {
            if (snap.exists) {
                return docRef.update({
                    name: req.body.name,
                    lat: req.body.lat,
                    lng: req.body.lng
                })
            }
            return res.json({message: "document being update is deleted or does not exist."});
        })
        .catch((err) => {
            console.log(err);
            return err;
        })
};

exports.deleteCleanUpLocation = (req, res) => {
    let docRef = db.db.collection("cleanUpLocations").doc(req.params.locationId);
    docRef.get()
        .then((snap) => {
            if (snap.exists) {
                return docRef.delete();
            }
            return res.json({message: "document being deleted is deleted or does not exist."});
        })
        .catch((err) => {
            console.log(err);
            return err;
        })
};


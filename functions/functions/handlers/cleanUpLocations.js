const {db} = require("../utils/admin");
const {firebase} = require("../environments/config");

exports.createNewLocation = (req, res) => {
    return db.collection("cleanUpLocations")
        .add({
            name: req.body.name,
            lat: req.body.lat,
            lng: req.body.lng,
            createdAt: new Date().toISOString()
        })
        .then((ref) => {
            console.log("Clean up location ", ref.id, " created.");
            return res.json({message: "location created successfully."});
        })
        .catch((err) => {
            console.log(err);
            return err;
        });
};

exports.getCleanUpLocation = (req, res) => {
    return db.collection("cleanUpLocations")
        .doc(req.body.id)
        .get()
        .then((doc) => {
            if (doc.exists) {
                return res.json(doc.data());
            }
            return res.json({message:"clean up location not found."});
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


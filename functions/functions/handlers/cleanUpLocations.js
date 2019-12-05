const {db} = require("../utils/admin");
const {firebase} = require("../environments/config");
const {validateCreateCleanUp} = require("../utils/validators");

exports.createNewLocation = (req, res) => {
    const creationTime = new Date().toISOString();
    // const newLocation = {
    //     name: req.body.name,
    //     lat: req.body.lat,
    //     lng: req.body.lng,
    //     address: req.body.address,
    //     description: req.body.description,
    //     startDate: req.body.startDate,
    //     startTime: req.body.startTime,
    //     createdAt: creationTime
    // };

    // const {valid, errors} = validateCreateCleanUp(newLocation);

    // if (!valid) return res.status(400).json(errors);

    return db.collection("cleanUpLocations")
        .add({
            // newLocation
            name: req.body.name,
            lat: req.body.lat,
            lng: req.body.lng,
            address: req.body.address,
            description: req.body.description,
            startDate: req.body.startDate,
            startTime: req.body.startTime,
            createdAt: creationTime
        })
        .then((ref) => {
            console.log("Clean up location ", ref.id, " created.");
            return res.json({
                // newLocation
                id: ref.id,
                name: req.body.name,
                lat: req.body.lat,
                lng: req.body.lng,
                address: req.body.address,
                description: req.body.description,
                startDate: req.body.startDate,
                startTime: req.body.startTime,
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
                    address: doc.data().address,
                    description: doc.data().description,
                    startDate: doc.data().startDate,
                    startTime: doc.data().startTime,
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
//
// exports.joinCleanUpLocation = (req, res) => {
//
// }


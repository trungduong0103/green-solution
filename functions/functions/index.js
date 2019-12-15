const functions = require('firebase-functions');
const app = require("express")();
const cors = require("cors");

app.use(cors());

const {signUp, signIn, onUserCreateInAuth, onUserDeleteInAuth} = require("./handlers/users");
const {createNewTopic, publishMessageToTopic, sendEmailToUser} = require("./handlers/topics");
const {
    createNewLocation,
    updateCleanUpLocation,
    deleteCleanUpLocation,
    getCleanUpLocation,
    getAllCleanUpLocations,
    joinCleanUpLocation,
    getUserRegisteredLocations,
    getCreatedLocations} = require("./handlers/cleanUpLocations");

//User routes
app.post("/signup", signUp);
app.post("/signin", signIn);
app.post("/get_registered_locations", getUserRegisteredLocations);
app.post("/get_created_locations", getCreatedLocations);

//clean up locations
app.post("/create_location", createNewLocation);
app.get("/get_location/:location_id", getCleanUpLocation);
app.get("/get_all_locations", getAllCleanUpLocations);
app.put("/update_location/:location_id", updateCleanUpLocation);
app.delete("/delete_location/:location_id", deleteCleanUpLocation);
app.post("/join_clean_site", joinCleanUpLocation);

//register
// app.post("/register_clean_site");

//topics
app.get("/newtopic", createNewTopic);
app.post("/newmessage", publishMessageToTopic);


// app.post("/sendemail", sendEmailToUser);
// app.get("/user", FirebaseAuth, getAuthenticatedUser);

//HTTPs routes
exports.api = functions.region("asia-northeast1").https.onRequest(app);

//background functions for Firebase Authentication
exports.onUserCreatedInAuth = functions.region("asia-northeast1").auth.user().onCreate(onUserCreateInAuth);
exports.onUserDeletedInAuth = functions.region("asia-northeast1").auth.user().onDelete(onUserDeleteInAuth);

//background functions for pubsub
exports.onNewMessagePublished = functions.region("asia-northeast1").pubsub.topic("my-first-topic").onPublish((message) => {
    let topicMessage = null;
    try {
        topicMessage = message.json.message;
        sendEmailToUser(topicMessage);
    } catch (e) {
        console.log(e.response)
    }
    return topicMessage;
});

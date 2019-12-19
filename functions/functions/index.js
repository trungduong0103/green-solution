const functions = require('firebase-functions');
const app = require("express")();
const cors = require("cors");

app.use(cors());

const FBAuth = require("./utils/firebaseAuth");
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
    getCreatedLocations,
    getRegisteredUsersOfLocation
} = require("./handlers/cleanUpLocations");

//User routes
app.post("/sign_up", signUp);
app.post("/sign_in", signIn);
app.post("/get_registered_locations", getUserRegisteredLocations);
app.post("/get_created_locations", getCreatedLocations);

//clean up locations
app.post("/create_clean_site", FBAuth, createNewLocation);
app.delete("/delete_clean_site/:location_id", FBAuth, deleteCleanUpLocation);
app.put("/update_clean_site/:location_id", FBAuth, updateCleanUpLocation);
app.get("/get_clean_site/:location_id", getCleanUpLocation);
app.get("/get_all_clean_sites", getAllCleanUpLocations);
app.get("/get_registered_users/:location_id", getRegisteredUsersOfLocation);
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

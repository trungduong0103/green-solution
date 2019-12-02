const functions = require('firebase-functions');
const app = require("express")();
const cors = require("cors");

app.use(cors());

const {signUp, signIn, onUserCreateInAuth, onUserDeleteInAuth} = require("./handlers/users");
const {createNewTopic, publishMessageToTopic, sendEmailToUser} = require("./handlers/topics");
const {createNewLocation, updateCleanUpLocation, deleteCleanUpLocation, getCleanUpLocation, getAllCleanUpLocations} = require("./handlers/cleanUpLocations");

//User routes
app.post("/signup", signUp);
app.post("/signin", signIn);

//clean up locations
app.post("/create_location", createNewLocation);
app.get("/get_location/:locationId", getCleanUpLocation);
app.get("/get_all_locations", getAllCleanUpLocations);
app.put("/update_location", updateCleanUpLocation);
app.delete("/delete_location/:locationId", deleteCleanUpLocation);

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

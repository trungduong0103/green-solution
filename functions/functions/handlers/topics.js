const {PubSub} = require("@google-cloud/pubsub");
const pubSub = new PubSub();
const {SEND_GRID_API_KEY} = require("../environments/environments");

//create new topic
exports.createNewTopic = (req, res) => {
    pubSub.createTopic('my-first-topic')
        .then((response) => {
            console.log(response);
            return res.json({"message": "topic created successfully!"});
        })
        .catch((err) => {
            console.log(err.code);
        });
};

//publish message to topic
exports.publishMessageToTopic = (req, res) => {
    const data = Buffer.from(JSON.stringify(req.body));
    pubSub.topic('my-first-topic').publish(data)
        .then(() => {
            return res.json({"message": "message published successfully!"});
        })
        .catch((err) => {
            console.log("error", err);
        });
};

//send message to users' email
exports.sendEmailToUser = (message, recipient) => {
    const sendGridKey = SEND_GRID_API_KEY;
    const sendGridComposer = require("@sendgrid/mail");
    sendGridComposer.setApiKey(sendGridKey);

    const msgBody = {
        to: recipient,
        from: 'rodflores456@gmail.com',
        subject:"SendGrid Test Email",
        content: [
            {
                "type": "text/plain",
                "value": message
            }
        ]
    };

    return sendGridComposer.send(msgBody)
        .then(() => {
            console.log("Email successfully sent");
            return null;
        })
        .catch((err) => {
            console.log(err.response.body);
            return err;
        })
};


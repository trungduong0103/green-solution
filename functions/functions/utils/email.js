const axios = require("axios");
const {AWS_SEND_EMAIL_API} = require("../environments/environments");
const {WELCOME_SUBJECT, WELCOME_MESSAGE, THANK_YOU_SUBJECT} = require("../environments/emailTemplates");

exports.sendWelcomeEmail = (email) => {
    let body = {email: [email], subject: WELCOME_SUBJECT, content: WELCOME_MESSAGE};
    axios.post(AWS_SEND_EMAIL_API, body)
        .then(() => {
            console.log("Sent email using AWS.");
            return null;
        })
        .catch((err) => {
            console.log(err);
        })
};

exports.sendLocationConfirmationEmail = (email, locationName) => {
    let body = {email: [email], subject: THANK_YOU_SUBJECT, content: `Thanks for joining ${locationName}!`};
    axios.post(AWS_SEND_EMAIL_API, body)
        .then(() => {
            console.log("Sent mail using AWS.");
            return null;
        })
        .catch((err) => {
            console.log(err);
        });
};

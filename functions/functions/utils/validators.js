const {CANNOT_EMPTY, INVALID_EMAIL, PASSWORD_LENGTH_INSUFFICIENT, PASSWORDS_MUST_MATCH} = require("../environments/errorTemplates");

const isEmpty = string => {
    if (!string) return true;
    return string.trim() === "";
};

const isEmail = email => {
    let regEx;
    // eslint-disable-next-line no-useless-escape
    regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return Boolean(email.match(regEx));
};

exports.validateSignUpData = data => {
    let errors = {};

    if (isEmpty(data.email)) {
        errors.email = CANNOT_EMPTY;
    } else if (!isEmail(data.email)) {
        errors.email = INVALID_EMAIL;
    }

    if (isEmpty(data.password)) {
        errors.password = CANNOT_EMPTY;
    } else if (data.password.length < 6) {
        errors.password = PASSWORD_LENGTH_INSUFFICIENT;
    }


    if (data.password !== data.confirmPassword)
        errors.confirmPassword = PASSWORDS_MUST_MATCH;

    return {
        errors,
        valid: Object.keys(errors).length === 0
    };
};

exports.validateLoginData = data => {
    let errors = {};
    if (isEmpty(data.email)) errors.email = CANNOT_EMPTY;
    if (isEmpty(data.password)) errors.password = CANNOT_EMPTY;

    return {
        errors,
        valid: Object.keys(errors).length === 0
    };
};

// exports.reduceUserDetails = data => {
//     let userDetails = {};
//     if (!isEmpty(data.bio.trim())) userDetails.bio = data.bio;
//     if (!isEmpty(data.website.trim())) {
//         if (data.website.trim().substring(0, 4) !== "http") {
//             userDetails.website = `http://${data.website.trim()}`;
//         } else {
//             userDetails.website = data.website;
//         }
//     }
//     if (!isEmpty(data.location.trim())) userDetails.location = data.location;
//
//     return userDetails;
// };

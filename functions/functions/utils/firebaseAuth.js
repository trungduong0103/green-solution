const { admin, db } = require("./admin");

//this function sets the user object to the header of each request
module.exports = (req, res, next) => {
    let idToken;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        idToken = req.headers.authorization.split("Bearer ")[1];
    } else {
        console.error("No token found");
        return res.status(403).json({ error: "Unauthorized" });
    }

    return admin
        .auth()
        .verifyIdToken(idToken)
        .then((decodedToken) => {
            req.user = decodedToken;
            return db
                .collection("users")
                .doc(req.user.email)
                .get();
        })
        .then(() => {
            return next();
        })
        .catch(err => {
            console.log(err);
            return res.json(err);
        })
        // .then(decodedToken => {
        //     req.user = decodedToken;
        //     return db
        //         .collection("users")
        //         .where("email", "==", req.user.email)
        //         .limit(1)
        //         .get();
        // })
        // .then(data => {
        //     req.user.email = data.docs[0].data().email;
        //     return next();
        // })
        // .catch(err => {
        //     console.error("Error while verifying token", err);
        //     return res.status(403).json(err);
        // });
};

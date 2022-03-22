const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }); // find user that matches id and valid token
        if (!user) {
            throw new Error();
        }
        req.token = token; // ensure token currently used is main token for session, this ensures that user is logged out only from this current sesssion and any other session isnt affected
        req.user = user; // adding a property to the request so that the next route handler can has access to the already-fetched user and not fetch it again
        next();
        console.log(decoded);
    } catch (error) {
        res.status(401).send({ error: "Please authenticate." });
    }
}

module.exports = auth;
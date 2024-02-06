const User = require("../models/User");

async function getUserById(req, res, next) {
    const userId = req.params.id;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        req["user"] = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

async function updateUser(req, res, next) {
    const userId = req.params.id;
    const {email, password, role, firstName, lastName, birthday, images, preferences} = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({message: 'User not found'});
        }

        // Update user properties
        user.email = email || user.email;
        user.password = password || user.password;
        user.role = role || user.role;
        user.firstName = firstName || user.firstName;
        user.lastName = lastName || user.lastName;
        user.birthday = birthday || user.birthday;
        if (images) {
            user.picture = images[0].fileNames[0] || user.picture;
        }
        if (preferences) {
            user.preferences = preferences;
        }

        req["user"] = await user.save();
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Internal Server Error'});
    }
}

module.exports = {
    getUserById,
    updateUser
};

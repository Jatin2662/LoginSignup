
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')


const signup = async (req, res) => {

    try {

        const { firstName, lastName, email, password, role } = req.body;

        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(409).json({ message: "User already exists, Login to continue", success: false })
        }

        const userModel = new UserModel({ firstName, lastName, email, password, role: role || 'user' });

        userModel.password = await bcrypt.hash(password, 10);

        await userModel.save();

        res.status(201).json({ message: "SignUp success", success: true })

    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false })
    }
}


const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        const errorMessage = 'Authentication failed, email or password is incorrect.'
        if (!user) {
            return res.status(403).json({ message: errorMessage, success: false })
        }

        // password -> user dalega, user.password -> database main password
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({ message: errorMessage, success: false })
        }

        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id, role: user.role },   // payload this is what we will get when we verify it
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.status(200).json({
            message: "Login Successfull, Enjoy!!!",
            success: true,
            jwtToken,
            email,
            name: user.firstName + ' ' + user.lastName,
            role: user.role
            // userId: user._id
        })

    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false })
    }
}

module.exports = {
    signup,
    login
}
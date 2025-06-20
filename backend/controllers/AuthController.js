
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const UserModel = require('../models/UserModel')

const sendVerificationLink = (email, verificationLink) => {

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });

    let info = `
        <!DOCTYPE html>
    <html>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f0f8ff;">
        <table align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border-collapse: collapse;">
          <tr>
            <td style="background-color: #005f73; color: #ffffff; text-align: center; padding: 20px; font-size: 24px;">
              Email Verification
            </td>
          </tr>
          <tr>
            <td style="padding: 20px;">
              <h2 style="margin-top: 0;">Hey, ${email}!</h2>
              <p>Verification is neccessary to get notifications. </p>
              <p>Verify email, <strong>Go</strong>, click to verify <a href="${verificationLink}" >${verificationLink}</a></p>
              <h4>Bale Bale!</h4>
            </td>
          </tr>
          <tr>
            <td style="background-color: #d3e0ea; padding: 15px; font-size: 12px; text-align: center; color: #555;">
              &copy; 2025 The Verifier. All Rights Reserved.
            </td>
          </tr>
        </table>
      </body>
    </html>
        `

    let message = {
        from: process.env.EMAIL,
        to: email,
        replyTo: process.env.EMAIL,
        subject: "This email is intended for email verification.",
        html: info
    }

    transporter.sendMail(message)
}


const signup = async (req, res) => {

    try {

        const { firstName, lastName, email, password, role } = req.body;

        const lowerEmail = email.toLowerCase();

        const user = await UserModel.findOne({ email: lowerEmail });

        if (user) {
            return res.status(409).json({ message: "User already exists, Login to continue", success: false })
        }

        const userModel = new UserModel({ firstName, lastName, email: lowerEmail, password, role: role || 'user' });

        userModel.password = await bcrypt.hash(password, 10);

        await userModel.save();

        const myUser = await UserModel.findOne({ lowerEmail });

        const token = jwt.sign(
            { _id: myUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        const verificationLink = `http://localhost:3000/auth/verify/${token}`

        sendVerificationLink(lowerEmail, verificationLink);

        res.status(201).json({ message: "SignUp success, Verify Email to continue.", success: true })

    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false })
    }
}

const sendLink = async (req, res, next) => {

    const { email, linkName } = req.body;
    const lowerEmail = email.toLowerCase();
    try {

        const user = await UserModel.findOne({ email: lowerEmail });

        if (!user) {
            return res.status(400).json({ message: "No user found.", success: false })
        }

        const token = jwt.sign(
            { _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        let verificationLink;
        if (linkName === 'verify') {
            verificationLink = `http://localhost:3000/auth/verify/${token}`;
        } else if (linkName === 'forgot-password') {
            verificationLink = `http://localhost:3000/auth/forgot-password/${token}`;
        } else {
            return res.status(400).json({ message: "Invalid link name.", success: false });
        }

        sendVerificationLink(email, verificationLink);

        res.status(201).json({ message: `Check email and click link to ${linkName}.`, success: true })
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false })
    }
}

const verifyEmail = async (req, res, next) => {

    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(decoded._id);

        if (!user) {
            return res.status(404).json({ message: "User not found.", success: false })
        }

        if (user.isVerified) {
            return res.status(200).json({ message: "Email is already verified", success: true })
        }

        user.isVerified = true;
        await user.save();

        return res.status(202).json({ message: "Email verified successfully.", success: true })

    } catch {
        res.status(400).json({ message: "Invalid or Expired token.", success: false })
    }
}

const verifyEmailForResetPassword = async (req, res, next) => {

    const { token } = req.params;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await UserModel.findById(decoded._id);

        if (!user) {
            return res.status(404).json({ message: "User not found.", success: false })
        }

        return res.status(200).json({ message: "Proceed to reset password.", success: true, userEmail: user.email })

    } catch {
        res.status(400).json({ message: "Invalid or Expired token.", success: false })
    }
}

const resetPassword = async (req, res, next) => {

    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Mismatch check", success: false })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await UserModel.findByIdAndUpdate(
            decoded._id,
            { $set: { password: hashedPassword } },
            { new: true })

        await user.save();

        res.status(200).json({ message: "Password updated.", success: true })

    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false })
    }
}


const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const lowerEmail = email.toLowerCase();

        const user = await UserModel.findOne({ email: lowerEmail });
        const errorMessage = 'Authentication failed, email or password is incorrect.'
        if (!user) {
            return res.status(403).json({ message: errorMessage, success: false })
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: "Email nott verified.", success: false })
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
    login,
    verifyEmail,
    sendLink,
    resetPassword,
    verifyEmailForResetPassword
}


const express = require('express');
const { signupValidation, loginValidation, emailVaildation, resetPasswordValidation } = require('../middlewares/AuthValidation');
const { signup, login, verifyEmail, sendLink, resetPassword, verifyEmailForResetPassword } = require('../controllers/AuthController');

const router = express.Router();



router.post('/login', loginValidation, login)
router.post('/signup', signupValidation, signup)    // pehle signupvalidation hoga agar voh theek toh signup controller par jayga
router.get('/verify/:token', verifyEmail)
router.post('/verify', emailVaildation, (req, res, next) => {
    req.body.linkName = 'verify';
    next();
}, sendLink)
router.post('/forgot-password', emailVaildation, (req, res, next) => {
    req.body.linkName = 'forgot-password';
    next();
}, sendLink)
router.get('/forgot-password/:token', verifyEmailForResetPassword)
router.post('/forgot-password/:token', resetPasswordValidation, resetPassword)

module.exports = router
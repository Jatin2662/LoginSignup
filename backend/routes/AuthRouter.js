

const express = require('express');
const { signupValidation, loginValidation } = require('../middlewares/AuthValidation');
const { signup, login, verifyEmail } = require('../controllers/AuthController');

const router = express.Router();



router.post('/login', loginValidation, login)
router.post('/signup', signupValidation, signup)    // pehle signupvalidation hoga agar voh theek toh signup controller par jayga
router.get('/verify/:token', verifyEmail)


module.exports = router
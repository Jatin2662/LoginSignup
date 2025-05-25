

const express = require('express');
const router = express.Router();
const { ensureAuthenticated, ensureAuthorized } = require('../middlewares/AuthProduct');



router.get('/adminDashboard', ensureAuthenticated, ensureAuthorized(['admin']), (req, res, next)=>{

    res.json({ message: "Admin Dashboard" })
})

module.exports = router;
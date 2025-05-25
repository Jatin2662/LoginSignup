


// const {ensureAuthorized} = require('../middlewares/AuthProduct');
const { getAllPosts } = require('../controllers/PostController')

const router = require('express').Router();


router.get('/', getAllPosts)

module.exports = router;
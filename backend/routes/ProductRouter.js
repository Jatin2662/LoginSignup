const {ensureAuthenticated, ensureAuthorized} = require('../middlewares/AuthProduct');
// const  = require('../middlewares/AuthProduct');
const { addPost, getMyPost, getAllPosts } = require('../controllers/PostController')

const router = require('express').Router();

router.post('/add', ensureAuthenticated, ensureAuthorized(['admin', 'user']), addPost)
router.get('/myfetch', ensureAuthenticated, ensureAuthorized(['admin', 'user']), getMyPost)


module.exports = router;
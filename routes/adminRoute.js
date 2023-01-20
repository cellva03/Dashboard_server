// importing a router from express
const router = require('express').Router();
const { post_login,
        post_signup,
        verify_token 
    } = require('../controllers/adminController');


// Route for signing up
router.post('/signup',post_signup )

// Route for login
router.post('/login', post_login)

// Route for verifying token
router.get('/populate', verify_token)

module.exports = router;
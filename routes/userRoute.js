// creating router from express
const router = require('express').Router();
const {
    get_users,
    delete_user,
    create_user,
    update_user,
    update_discount,
    get_single_user
} = require('../controllers/userController');

// Route for getting all users
router.get('/', get_users)

// Route for deleting a user
router.delete('/:id', delete_user)  

// Route for creating a new user
router.post('/new', create_user)

// Route for updating a user
router.post('/update/:id', update_user)

//Route for discount update for a user
router.post('/discount/:id', update_discount)

// Route for getting a single user
router.get('/:id', get_single_user)


module.exports = router;
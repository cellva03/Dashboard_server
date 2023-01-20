// importing the user model
const User = require('../models/userModel');

// Get all users
const get_users = (req, res) => {
    User.find({}, (err, users) => {
        // console.log(users);
        if (err) {
            res.send({users: false, error: err});
        } else {
            res.send({users: users});
        }
    })
}

// delete a user
const delete_user = (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            res.send({user: false, error: err});
        } else {
            User.find({}, (err, users) => {
                if (err) {
                    res.send({users: false, error: err});
                } else {
                    res.send({user: "User deleted", users: users});
                }
            })
            
        }
    })
}

// create a new user
const create_user = (req, res) => {
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            res.send({user: false, error: err});
        } else {
            User.find({}, (err, users) => {
                if (err) {
                    res.send({users: false, error: err});
                } else {
                    res.send({user: "User added", users: users});
                }
            })
        }
    })
}

// update a user
const update_user = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            res.send({user: false, error: err});
        } else {
            User.find({}, (err, users) => {
                if (err) {
                    res.send({users: false, error: err});
                } else {
                    res.send({user: "User updated", users: users});
                }
            })
        }
    })
}

const update_discount = (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, (err, user) => {
        if (err) {
            res.send({user: false, error: err});
        } else {
            User.find({}, (err, users) => {
                if (err) {
                    res.send({users: false, error: err});
                } else {
                    res.send({user: "User discount updated", users: users});
                }
            })
        }
    })
}

// Get a single user
const get_single_user = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            res.send({user: false, error: err});
        } else {
            res.send({user: user});
        }
    })
}

// exporting the functions
module.exports = {
    get_users,
    delete_user,
    create_user,
    update_user,
    update_discount,
    get_single_user
}
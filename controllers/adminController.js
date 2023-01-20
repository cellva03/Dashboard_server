// importing the admin model
const Admin = require('../models/adminModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// creating a new admin
const post_signup = (req, res) => {
    console.log(req.body);
    const admin = new Admin({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });
    admin.save((err, admin) => {
        if (err) {
            res.status(500).send({err: 'This email is already registered'});
        } else {
            res.status(200).send({user: true, message: 'Admin created successfully'});
        }
    })
}

// function for login as an admin
const post_login = (req, res) => {
    console.log(req.body);
    Admin.findOne({email: req.body.email}, (err, admin) => {
        if (err) {
            res.status(500).send({err: 'Something went wrong'});
        } else if (!admin) {
            res.status(401).send({err: 'Invalid email or password'});
        } else {
            if (bcrypt.compareSync(req.body.password, admin.password)) {
                const token = jwt.sign(JSON.stringify({username : admin.username,email: admin.email}) ,'secret');
                res.status(200).send({user: true, message: 'Login successful',token: token});
            } else {
                res.status(401).send({err: 'Invalid email or password'});
            }
        }
    })
}

// verifying admin through the token
const verify_token = (req, res) => {
    const token = req.headers['x-access-token'];
    const decoded = jwt.verify(token, 'secret');
    const user = decoded.email;
    Admin.findOne({email: user}, (err, admin) => {
        if (err){
            res.send({user: false, message: 'User is not Authenticated'})
        }
        else{
            res.send({user: true, message: 'User is Authenticated'})
        }
    })      
}

// exporting the functions

module.exports = {
    post_signup,
    post_login,
    verify_token
}
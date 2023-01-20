// importing Product model
const Product = require('../models/productModel');
const fs = require('fs')
const path = require('path')
const { google } = require('googleapis');
const nodemailer = require('nodemailer');

// Send email to the user when the product stock is less than 10
const CLIENT_ID ='722997639469-6jn4oca97ccvfomnm3rvdrk8buogi8o0.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URL = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04Hh8aaths3FMCgYIARAAGAQSNwF-L9IrTJNpuK6xaHOqD7SkGFX7YLbnBCaniuQWClWc1-Xcq6YVb0heq8ovGWDJYicZNSzanZc';

const oauth2Client = new google.auth.OAuth2( CLIENT_ID, CLIENT_SECRET, REDIRECT_URL );
oauth2Client.setCredentials({
    refresh_token: REFRESH_TOKEN
});

const sendMail = async (product) => {
    const accessToken = await oauth2Client.getAccessToken();
    const smtpTransport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: 'selvavignesh432@gmail.com',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken
        }});
    const mailOptions = {
        from: 'SELVA 🧇<selvavignesh432@gmail.com>',
        to: 'selvavignesh432@gmail.com',
        subject: 'Sending Email using Node.js',
        text:   `The product ${product.title} is running low in stock. Please order more.`,
        html:   `<h1>The product ${product.title} is running low in stock. Please order more.</h1>`
    };
    const mail = await smtpTransport.sendMail(mailOptions);
    return mail;
}


// Get all products

const get_products = (req, res) => {
    Product.find({}, (err, products) => {
        products.forEach(product => {
            if(product.stock < 10){
                sendMail(product).then(info => {
                    console.log('The mail is send',info);
                })
                .catch(err => {
                    console.log('The mail is not send',err);
                });
            }
        })
        // console.log(users);
        if (err) {
            res.send({products: false, error: err});
        } else {
            res.send({products: products});
        }
    })
}

// delete a product
const delete_product = (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, user) => {
        if (err) {
            res.send({product: false, error: err});
        } else {
            Product.find({}, (err, products) => {
                if (err) {
                    res.send({products: false, error: err});
                } else {
                    res.send({product: "Product deleted", products: products});
                }
            })
            
        }
    })
}

// create a new product
const post_product = (req, res) => {
    console.log(req.file);
    const data ={
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        stock: req.body.stock,
        price: req.body.price,
        ProductImage: {
            data: fs.readFileSync('uploads/'+req.file.filename),
            contentType: req.file.mimetype
        }
    }
    // console.log(data);
    const product = new Product(data);
    // console.log(req.body);
    product.save((err, product) => {
        if (err) {
            res.send({product: false, error: err});
        } else {
            Product.find({}, (err, products) => {
                if (err) {
                    res.send({products: false, error: err});
                } else {
                    res.send({product: "Product added", products: products});
                }
            })
        }
    })
}

// update a product
const update_product = (req, res) => {
    let data;
    if(req.file !== undefined){
        data ={
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            stock: req.body.stock,
            price: req.body.price,
            ProductImage: {
                data: fs.readFileSync('uploads/'+req.file.filename),
                contentType: req.file.mimetype
            }
        }
    }
    else{
        data ={
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            stock: req.body.stock,
            price: req.body.price
        }
    }
    
    console.log(req.body);
    Product.findByIdAndUpdate(req.params.id, data, (err, product) => {
        if (err) {
            res.send({product: false, error: err});
        } else {
            Product.find({}, (err, products) => {
                if (err) {
                    res.send({products: false, error: err});
                } else {
                    res.send({product: "product updated", products: products});
                }
            })
        }
    })
}

// get a single product
const get_single_product = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            res.send({product: false, error: err});
        } else {
            res.send({product: product});
        }
    })
}

// exporting the functions
module.exports = {
    get_products,
    delete_product,
    post_product,
    update_product,
    get_single_product
}
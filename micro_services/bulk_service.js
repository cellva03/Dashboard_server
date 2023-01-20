const express = require('express');
const mongoose = require('mongoose');
const csv = require('csvtojson');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
var multer = require('multer');
const Product = require('../models/productModel');
  
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null,Date.now()+'-'+file.originalname)
    }
    })

var upload = multer({ storage: storage });

app.use(cors());

const PORT = process.env.PORT || 4002;
const DBURL = 'mongodb+srv://Selva:Selva@e-commerce.kf94puy.mongodb.net/?retryWrites=true&w=majority';

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(DBURL,(e)=>{
    if(e){
        console.log(e);
    }
    else{
        console.log(`DataBase is Connected!!`)
        // listening to the port
        app.listen(PORT,()=>{
            console.log(`App is running on ${PORT}`)
        })
    }
})

app.get('/',(req,res) => {
    res.send('bulk upload......');
})

app.post('/api/products/bulk',upload.single('csvFile'), (req, res) => {
    console.log(req.file);
    csv().fromFile(req.file.path)
    .then((jsonObj) => {
  
      Product.insertMany(jsonObj, function(err, docs) {
        if (err) {
          res.send(err);
        } else {
          Product.find({}, (err, products) => {
              if (err) {
                  res.send({products: false, error: err});
              } else {
                  res.send({products: products});
              }
          })
        }
      })
    })
    .catch((err) => {
        console.log(err);
    })
  
  })

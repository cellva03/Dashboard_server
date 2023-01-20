// importing all the required modules such as express, mongoose, body-parser,cors
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var multer = require('multer');
const csv = require('csvtojson');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const Product = require('./models/productModel');
  
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null,Date.now()+'-'+file.originalname)
    }
    })
var upload = multer({ storage: storage });

// importing the user route from Routes folder
const adminRoute = require('./routes/adminRoute');
const userRoute = require('./routes/userRoute');
const productRoute = require('./routes/productRoute');
const salesRoute = require('./routes/salesRoute');
// creating a new express application
const app = express();
app.use(cors());

// creating a application port and mongodb port
const PORT = process.env.PORT || 4001;
const DBURL = 'mongodb+srv://Selva:Selva@e-commerce.kf94puy.mongodb.net/?retryWrites=true&w=majority';

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// connecting to mongodb
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


// using the Routes
app.use('/api/auth',adminRoute);
app.use('/api/users',userRoute);
app.use('/api/products',productRoute);
app.use('/api/sales',salesRoute);

//Swagger UI
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocument));
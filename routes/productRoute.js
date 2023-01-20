// importing router from express
const router = require('express').Router();
const Product = require('../models/productModel');
const csv = require('csvtojson');
const { 
    get_products,
    delete_product,
    post_product,
    update_product,
    get_single_product
    } = require('../controllers/productController.js');
    var multer = require('multer');
  
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, 'uploads')
        },
        filename: function (req, file, cb) {
          cb(null,Date.now()+'-'+file.originalname)
        }
      })
    
var upload = multer({ storage: storage });

// Route for getting all products
router.get('/', get_products)

// Route for deleting a product
router.delete('/:id', delete_product) 

// Route for creating a new product
router.post('/new',upload.single('ProductImage'), post_product)

// Route for updating a product
router.post('/update/:id',upload.single('ProductImage'), update_product)

// Route for getting a single product
router.get('/:id', get_single_product)



// router.post('/bulk',)


module.exports = router;
// imports
const express = require('express');
const route = express.Router();
// import controllers
const productController = require('../controller/ProductsController')

// multer
const multer = require("multer");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + file.originalname)
    }
});
const upload = multer({ storage: storage });

// routes
route.get('/', productController.index);
route.get('/create', productController.create);
route.post('/store', upload.single('img'), productController.store);
route.get('/destroy/:id', productController.destroy);
route.get('/edit/:id', productController.edit);
route.post('/update', upload.none(), productController.update);

module.exports = route;
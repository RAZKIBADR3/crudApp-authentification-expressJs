// import product model
const productModel = require('../model/product')
const fs = require('fs');

const index = async (req, res)=> {
    const products = await productModel.getAll();
    res.render('products/index', {
        title: 'products',
        products: products[0],
        username: req.session.username,
        msg: (req.query.msg?'user already logged in':'')
    });
}

const create = (req, res)=> {
    res.render('products/create', {title: 'Add Product'});
};

const store = async (req, res)=> {
    const p = req.body;
    console.log(req.body);
    if (!req.file || !req.body.title || !req.body.qt || !req.body.price) { 
        res.redirect(`/product/create`);
    }else {
        const img = req.file.filename
        await productModel.insert(p.title, p.qt, p.price, img);
        res.redirect('/product');
    }
};

const destroy = async (req, res)=> {
    const id = req.params.id;
    const p = await productModel.getOne(id);
    const imgName = p[0][0].img;
    fs.unlink(`public/img/${imgName}`, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Error deleting file' });
        }
    });
    await productModel.deleteOne(id);
    res.redirect('/product');
}

const edit = async (req, res)=> {
    const id = req.params.id;
    const product = await productModel.getOne(id);
    res.render('products/edit', {title: 'Edit Product',product: product[0][0]})
}

const update = async (req, res)=> {
    const newProduct = req.body
    await productModel.updateOne(newProduct);
    res.redirect('/product');
}

module.exports = {index, create, store, destroy, edit, update};
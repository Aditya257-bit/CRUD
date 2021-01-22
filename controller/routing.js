const express = require('express');
const mongoose = require('mongoose');
const Router = express.Router();
const Item = mongoose.model('Item');

Router.get('/', (req, res) => {
    res.render("product/addoredit", {
        viewTitle: "Insert"
    });
});

Router.post('/', (req, res) => {
    if(req.body._id == ""){
        insertData(req, res);
    }
    else{
        updateRecord(req, res)
    }
})

function insertData(req, res){
    var product = new Item();
    product.categoryid = req.body.categoryid;
    product.categoryname = req.body.categoryname;
    product.productid = req.body.productid;
    product.productname = req.body.productname;
    product.save((err, doc) => {
        if(!err){
            res.redirect('products/list');
        }
        else{
            console.log(err);
        }
    });
}

function updateRecord(req, res) {
    Item.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('products/list'); }
        else {
                res.render("product/addOrEdit", {
                    viewTitle: 'Update product',
                    product: req.body
                });
        }
    });
}


Router.get('/list', (req, res) => {
    Item.find((err, docs) => {
        if (!err) {
            res.render("product/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving product list :' + err);
        }
    });
});

Router.get('/:id', (req, res) => {
    Item.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("product/addOrEdit", {
                viewTitle: "Update Product",
                product: doc
            });
        }
    });
});

Router.get('/delete/:id', (req, res) => {
    Item.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/products/list');
        }
        else { console.log('Error in product delete :' + err); }
    });
});

module.exports = Router; 
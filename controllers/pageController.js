const Photo = require('../models/Photo');

exports.getAboutPage = (req, res) => {
    res.render('about');
};

exports.getAddPage = (req, res) => {
    res.render('add');
};

exports.getEditPage = (req, res) => {
    const promise = Photo.findById(req.params.id).exec();
    promise.then((photo) => {
        res.render('edit', { photo });
    }).catch((err) => {
        console.log(err);
    });
}
const Photo = require('../models/Photo');
const fs = require('fs');

exports.getAllPhotos = (req, res) => {
    const page = req.query.page || 1;
    let totalPhotos = 0;

    const promiseCount = Photo.find({}).countDocuments();
    promiseCount.then((count) => {
        totalPhotos = count;
    });

    const perPage = 3;
    const start = (page * perPage) - perPage;

    // Photo.find({})  // find all photos
    //     .sort('-dateCreated')  // sort by dateCreated
    //     .limit(perPage)  // limit to 9 photos per page
    //     .skip(start)  // skip to the start of the page
    //     .exec((err, photos) => {
    //         Photo.count().exec((err, count) => {
    //             res.render('index', {
    //                 photos,
    //                 current: page,
    //                 pages: Math.ceil(count / perPage)
    //             });
    //         });
    //     });


    const promise = Photo.find({}).sort('-dateCreated').limit(perPage).skip(start);
    promise.then((photos) => {
        res.render('index', {
            photos,
            current: page,
            pages: Math.ceil(totalPhotos / perPage)
        });
    }).catch((err) => {
        console.log(err);
    });
};

exports.getPhoto = (req, res) => {
    const promise = Photo.findById(req.params.id).exec();
    promise.then((photo) => {
        res.render('photo', { photo });
    }).catch((err) => {
        console.log(err);
    });
};

exports.createPhoto = async (req, res) => {
    const uploadDir = 'public/uploads';
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
    }

    let uploadedImage = req.files.image;
    let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name;


    uploadedImage.mv(uploadPath, async () => {
        await Photo.create({
            ...req.body,
            image: '/uploads/' + uploadedImage.name
        });
        res.redirect('/');
    });
};

exports.updatePhoto = (req, res) => {
    const promise = Photo.findById(req.params.id).exec();
    promise.then((photo) => {
        photo.title = req.body.title;
        photo.description = req.body.description;
        photo.save();
        // res.send(photo);
        res.redirect("/photos/" + req.params.id);
    }).catch((err) => {
        console.log(err);
    });
};

exports.deletePhoto = (req, res) => {
    const promise = Photo.findById(req.params.id).exec();
    promise.then((photo) => {
        let deletedImage = __dirname + '/../public' + photo.image;
        fs.unlinkSync(deletedImage, (err) => {
            if (err) {
                console.log(err);
            }
        });

        const promise2 = Photo.findByIdAndRemove(req.params.id).exec();
        promise2.then((photo) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
        console.log(err);
    });
};


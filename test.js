const mongoose = require('mongoose');

const { Schema } = mongoose;

//Connect DB
mongoose.connect('mongodb://localhost:27017/pcat-test-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Veritabanı bağlantısı başarılı olduğunda tetiklenen olay
mongoose.connection.on('connected', () => {
    console.log('Mongoose bağlantısı başarılı!');
});

// Veritabanı bağlantısı hatası olduğunda tetiklenen olay
mongoose.connection.on('error', (err) => {
    console.log('Mongoose bağlantı hatası: ' + err);
});


//Create Schema
const photoSchema = new Schema({
    title: String,
    description: String,
    qty: Number,
    date: {
        type: Date,
        default: Date.now
    }
});

const Photo = mongoose.model('Photo', photoSchema);

//Create a new photo
// Photo.create({
//     title: 'Test Photo 2',
//     description: 'This is a test photo 2',
//     qty: 50
// });


//Update a photo
// const id = '64266910c66738ed630a37d2';
// console.log(Photo.findByIdAndUpdate(id, { qty: 333 }));

//Find all photos
// let photos = Photo.find({});
// console.log(photos);

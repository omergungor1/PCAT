const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override');
const ejs = require('ejs');
const { getAllPhotos, getPhoto, createPhoto, updatePhoto, deletePhoto } = require('./controllers/photoControllers');
const { getAboutPage, getAddPage, getEditPage } = require('./controllers/pageController');

const app = express();

// DATABASE CONNECTION
// mongoose.connect('mongodb://localhost:27017/pcat-test-db', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb+srv://omergungorco:3KP908HpM5t8hpGe@cluster0.yrs0arx.mongodb.net/?retryWrites=true&w=majority', {
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

// TEMPLATE ENGINE
app.set('views', './Views');
app.set('view engine', 'ejs');

const loginCheck = (req, res, next) => {
    let isLogin = true;

    if (isLogin) {
        next();
    } else {
        res.send('You are not logged in');
        // res.redirect('/');
    }
}

//MIDDLEWARES
app.use(express.static('public'));
app.use(loginCheck);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));


const port = process.env.PORT || 10000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// ROUTES
app.get('/', getAllPhotos);
app.get('/photos/:id', getPhoto);
app.post('/photos', createPhoto);
app.put('/photos/:id', updatePhoto);
app.delete('/photos/:id', deletePhoto);

app.get('/add', getAddPage);
app.get('/about', getAboutPage);
app.get('/photos/edit/:id', getEditPage);





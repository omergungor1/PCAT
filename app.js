const express = require('express');
const ejs = require('ejs');

const app = express();

// TEMPLATE ENGINE
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


const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// ROUTES
app.get('/', (req, res) => {
    let photo = [
        {
            _id: 'tn-01.jpg',
            image: __dirname + '/public/img/tn-01.jpg',
            title: 'Hello',
            description: 'Lorem ipsum'
        },
        {
            _id: 'tn-02.jpg',
            image: __dirname + '/public/img/tn-02.jpg',
            title: 'Hello',
            description: 'Lorem ipsum'
        },
        {
            _id: 'tn-03.jpg',
            image: __dirname + '/public/img/tn-03.jpg',
            title: 'Hello',
            description: 'Lorem ipsum'
        },
        {
            _id: 'tn-04.jpg',
            image: __dirname + '/public/img/tn-04.jpg',
            title: 'Hello',
            description: 'Lorem ipsum'
        },
        {
            _id: 'tn-05.jpg',
            image: __dirname + '/public/img/tn-05.jpg',
            title: 'Hello',
            description: 'Lorem ipsum'
        },
        {
            _id: 'tn-06.jpg',
            image: __dirname + '/public/img/tn-06.jpg',
            title: 'Hello',
            description: 'Lorem ipsum'
        },
        {
            _id: 'tn-07.jpg',
            image: __dirname + '/public/img/tn-07.jpg',
            title: 'Hello',
            description: 'Lorem ipsum'
        },
        {
            _id: 'tn-08.jpg',
            image: __dirname + '/public/img/tn-08.jpg',
            title: 'Hello',
            description: 'Lorem ipsum'
        },
        {
            _id: 'tn-09.jpg',
            image: __dirname + '/public/img/tn-09.jpg',
            title: 'Hello',
            description: 'Lorem ipsum'
        },
    ];
    console.log(photo[0].image);
    // res.send(photo);
    res.render('index', { photos: photo });
});

app.get('/add', (req, res) => {
    // res.send('Add Photo Page');
    res.render('add');
});

app.get('/about', (req, res) => {
    // res.send('About Us Page');
    res.render('about');
});

app.post('/photos', (req, res) => {
    console.log('Posted Data: ', req.body);
    res.redirect('/');
});
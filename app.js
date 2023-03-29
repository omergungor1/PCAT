const express = require('express');

const app = express();

const loginCheck = (req, res, next) => {
    let isLogin = true;

    if (isLogin) {
        next();
    } else {
        res.send('You are not logged in');
    }
}

app.use(express.static('public'));
app.use(loginCheck);

app.get('/', (req, res) => {
    const photo = {
        id: 1,
        photoName: 'Photo Name',
        description: 'Photo Description',
    };
    // res.send(photo);
    res.sendFile(__dirname + '/temp/index.html');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

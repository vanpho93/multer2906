const express = require('express');
const uploadConfig = require('./uploadConfig');

const upload = uploadConfig.single('avatar');
const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));

app.post('/upload', upload, (req, res) => {
    const { originalname, mimetype } = req.file;
    console.log(mimetype);
    const { username } = req.body;
    res.send(`Da nhan duoc file ${originalname} cua ${username}`);
});

app.use((err, req, res, next) => {
    if(err.toString() === 'Error: File too large') {
        return res.send('Chon file khac');
    }
    res.send(err.toString());
});

app.listen(3000, () => console.log('Server is running!'));

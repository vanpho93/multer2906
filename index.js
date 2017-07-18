const express = require('express');
const uploadConfig = require('./uploadConfig');

const upload = uploadConfig.single('avatar');
const arrayUpload = uploadConfig.array('avatar', 3);
const fieldConfig = [{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 2 }];
const fieldUpload = uploadConfig.fields(fieldConfig);

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));

app.post('/upload', upload, (req, res) => {
    // if (file) Nho handle
    const { originalname, mimetype } = req.file;
    const { username } = req.body;
    res.send(`Da nhan duoc file ${originalname} cua ${username}`);
});

app.post('/array', arrayUpload, (req, res) => {
    const arrStr = req.files.map(e => e.originalname);
    const { username } = req.body;
    res.send(`Da nhan duoc file ${arrStr.join(', ')} cua ${username}`);
});

app.post('/field', fieldUpload, (req, res) => {
    let arrStr = req.files.avatar.map(e => e.fieldname + ' ' + e.originalname);
    arrStr = arrStr.concat(req.files.gallery.map(e => e.fieldname + ' ' + e.originalname));
    const { username } = req.body;
    res.send(`Da nhan duoc file ${arrStr.join(', ')} cua ${username}`);
    // console.log(req.files);
    // res.send('Test');
});

app.use((err, req, res, next) => {
    if(err.toString() === 'Error: File too large') {
        return res.send('Chon file khac');
    }
    res.send(err.toString());
});

app.listen(3000, () => console.log('Server is running!'));

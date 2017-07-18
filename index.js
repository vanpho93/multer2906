const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, './public'),
    filename: (req, file, cb) => cb(null, `${Date.now()}${file.originalname}`)
});

const upload = multer({ storage }).single('avatar');

const app = express();
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => res.render('home'));
app.post('/upload', upload, (req, res) => {
    const { originalname } = req.file;
    const { username } = req.body;
    res.send(`Da nhan duoc file ${originalname} cua ${username}`);
});

app.listen(3000, () => console.log('Server is running!'));

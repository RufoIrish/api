var port = process.env.PORT || 5000;
var config = require('./src/config/config')
var express = require('express');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var routes = require('./src/routes/route');
var fileRoute = require('./src/routes/fileRoute')
var multer = require('multer');
var path = require('path');
var cors = require('cors');
var app = express();
var server = require('http').createServer(app);

var oldFile = require('./src/model/oldFiles-model');
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route
// app.use('/api', fileRoute)
app.use('/api', routes);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        // cb(null, Date.now() + path.extname(file.originalname));
        cb(null, file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' ||
        file.mimetype == 'image/png' ||
        file.mimetype == 'image/jpg' ||
        file.mimetype == 'application/pdf' ||
        file.mimetype == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(null, 'Only .png, .jpg, .jpeg, .pdf and .xlsx/.docx format allowed!');
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter });

app.post('/uploadSingleFile', upload.single('files'), (req, res, next) => {
    // var data = { fullname: req.body.name, lrn: req.body.lrn, fileUrl: req.file.filename };
    req.body.fileUrl = req.body.fileUrl + req.file.filename
    oldFile.findOne({ lrn: req.body.lrn }, (err, user) => {
        if (err) {
            return res.status(400).json({ 'msg': err })
        }
        if (user) {
            return res.status(400).json({ 'msg': "LRN Already Exist" })
        }
        let addFile = oldFile(req.body)
        addFile.save((err, data) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ 'msg': err });
            }
            console.log('file uploaded successfully ! ', data);
            return res.status(201).json(data);
        })
    })
});

// app.post('/uploadMultipleFiles', upload.array('files', 100), (req, res, next) => {
//     try {
//         return res.status(201).json({
//             message: 'File uploded successfully'
//         });
//     } catch (error) {
//         return res.status(201).json({
//             message: 'Unable to upload files'
//         });
//     }
// });

// Connect to the Database
mongoose.connect(config.onlineDb, {
    useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB Database Connection Established Successfully!');
});
connection.on('error', (err) => {
    console.log('MongoDB Connection Error. Please Make Sure MongoDB Is Running! ' + err);
    process.exit();
})

// Start the server
server.listen(port);
console.log('Mantalongon Elementary School Data Management System is running on http://localhost:' + port);
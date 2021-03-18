var express = require('express'),
    routes = express.Router();
var multer = require('multer');
var oldFile = require('../model/oldFiles-model');

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

const upload = multer({ storage: storage, fileFilter: fileFilter }).single('file');

routes.post('/uploadSingleFile', function (req, res, next) {
    upload(req, res, function (err) {
        var data = { fullname: req.body.name, lrn: req.body.lrn, fileUrl: req.file.filename };
        req.body.fileUrl = req.body.fileUrl + req.file.filename
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
})



module.exports = routes;
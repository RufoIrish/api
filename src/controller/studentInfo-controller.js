var oldFile = require('../model/oldFiles-model')
var studentInfo = require('../model/studentsInfo-model')
var jwt = require('jsonwebtoken');
var config = require('../config/config');




// get token for section
exports.createTokenSection =(req, res) => {
    return jwt.sign({section: req.params.section}, config.jwtSecret)
}
// for old students and viewing old files
exports.viewListOfOldFiles= (function (req, res) {
    oldFile.find(function (err, studentOldfile) {
        if (err) {
            return res.send({ error: err, status: false });
        }
        return res.send({ status: true, data: studentOldfile });
    });
});
// sending url for the pdf
exports.viewFile = (function ( req, res){
    return res.send({status: true, data: req.body});
})

// ------------------------------------
// for current student

// add new student
exports.addStudent = (function (req, res){
    console.log(req.body)
    studentInfo.findOne({studentLRN: req.body.studentLRN}, (err, student)=> {
        if(student){
            return res.send({status: true, msg: 'LRN already exists!'})
        }else{
            studentInfo(req.body).save((err, msg) => {
                if (err) {
                    return res.send({error: err, status: false})
                }
                return res.send({status:true,  msg: 'Student Added!'})

            })
            console.log('not active')
        }
    })

})

// view List of students in specific section
exports.viewStudents = (function (req, res){
    // jwt.sign({section: req.params.section}, config.jwtSecret);
    console.log(req.params, 'requests')

    studentInfo.find({ studentSection: req.params.section }, (err, students) => {
        if (err){
            return res.send({error:err, status: false});
        }
        return res.send({status:true, data: students})
    })
})

// find student for update form
exports.findStudent = (req, res) => {
    studentInfo.findOne({_id: req.params.id}, (err, student)=>{
        if(err){
            return res.send({error: err, status: false});
        }
        return res.send({status: true, data: student});
    })
}
// find by grade
exports.findGrade = (req, res) =>{
    console.log(req.params.grade)
    studentInfo.find({studentGrade: req.params.grade}, (err, students) =>{
        if(err){
            return res.send({error: err, status: false})
        }
        return res.send({status: true, data: students})
    })
}


// update student
exports.updateStudent = (req, res) => {
    console.log('okii dayy')
    console.log(req.body);
    var request = req.body;
 
    if( request.studentLastName
        && request.studentFirstName
        && request.studentLRN
        && request.studentBirthdate
        && request.studentSex
        && request.studentNameOfSchoolFromKinder
        && request.studentSchoolId
        && request.studentSchoolAddress
        && request.studentPeptPasserRating
        && request.studentDateOfxamination
        && request.studentNameAdressOfTestingCenter
        && request.studentRemark
        && request.studentSection
        && request.studentGrade){
            studentInfo.findByIdAndUpdate({_id: req.params.id}, req.body,(err, student) =>{
                if(err){
                    return res.send({error: err, status: false});
                }
                return res.send({status: true, data: student});
            })
        }else{
            return res.send({status: false, msg: 'error' });
        }

}



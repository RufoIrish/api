var section = require("../model/gradeSection-model");
var subjects = require("../model/subjects-model");




exports.addSection = (req, res) => {
    section.findOne({ sectionName: req.body.sectionName }, (err, sections) => {
        if (err) {
            return res.status(400).json({ 'msg': err })
        }
        if (sections) {
            return res.status(400).json({ 'msg': 'Section Name already exist' })
        }
        let sectionName = section(req.body)
        sectionName.save((err, sections) => {
            if (err) {
                return res.status(400).json({ 'msg': err })
            }
            return res.status(200).json(sections);
        })
    })
}

exports.viewSection = (req, res) => {
    console.log(req.params.id )
    section.find({gradeLevel: req.params.id })
        .populate({
            path: 'adviser',
            model: 'TeacherInfo',
            select: 'lastName firstName middleName'
        })
        .exec((err, section) => {
            if (err) {
                return res.send({ error: err, status: false });
            }
            return res.send({ status: true, data: section })
        })

}

exports.deleteSection = (req, res) => {
    section.deleteOne({ _id: req.params.id }, (err, sections) => {
        if (err) {
            return res.send({ error: err, status: false });
        }
        return res.send({ status: true, data: sections });
    })
}

exports.updateSection = (req, res) => {
    var data = {
        gradeLevel: req.body.gradeLevel,
        sectionName: req.body.sectionName,
        adviser: req.body.adviser
    }
    section.findByIdAndUpdate({ _id: req.params.id }, data, (err, sections) => {
        if (err) {
            return res.send({ error: err, status: false });
        }
        return res.send({ status: true, data: sections });
    })
}
exports.findStudentGrades = (req, res) => {
    subjects.findOne({studentId: req.params.id, quarter: req.body.quarter}, (err, grades) =>{
        if(err){
            return res.send({error: err, status: false})
        }
            return res.send({status: true, data: grades})
        
    })
}
exports.findQuarter = (req, res) => {
    console.log('nisulod dire' )
    id = req.params.id
    subjects.find({studentId: req.params.id.trim()}, (err, subjects) => {
        console.log(subjects);
        if(err){
            res.send({error: err, status: false})
        }

        return res.send({status: true, data: subjects})
    })
}
exports.updateStudentGrades = (req, res) => {
    console.log(req.params, req.body)
    const request = req.body;
    if( request.studentId
        && request.motherTongue
        && request.filipino
        && request.english
        && request.mathematics
        && request.science
        && request.aralingPanlipunan
        && request.eppTle
        && request.music
        && request.pe
        && request.arts
        && request.health
        && request.edukasyonSaPagpapakatao
        && request.arabicLanguage
        && request.islamicLanguage
        && request.quarter ){
            subjects.findByIdAndUpdate({_id: req.body._id}, req.body, (err, data) => {
                if(err){
                    return res.send({error: err, status: false})
                }
                return res.send({status: true, data: data})
            })
        }else{
            return res.send({status: false, msg: 'error'})
        }
 
}

exports.addStudentGrades = (req, res) => {
    subjects.findOne({studentId: req.body.studentId, quarter: req.body.quarter}, (err, grades) =>{
        if(grades){
            console.log('existing');
            return res.send({status: false, msg: 'Can only add once!'})
        }else{
            console.log('not existing')
            subjects(req.body).save((err, grades) => {
                if (err) {
                    return res.send({ error: err, status: false });
                }
                return res.send({ status: true, data: grades });
            })
        }
        
    })

}



// exports.addStudent = (function (req, res){
//     studentInfo(req.body).save((err, student) => {
//         if (err) {
//             return res.status(400).json({ 'msg': err })
//         }
//         return res.status(200).json(student);
//     })
// })


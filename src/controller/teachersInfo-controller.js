var teachersInfo = require('../model/teachersInfo-model');

// Adding Teacher's Info
exports.addTeachersInfo = (req, res) => {
    console.log(req.body)
    teachersInfo.findOne({ depEdEmailAddress: req.body.depEdEmailAddress }, (err, user) => {
        if (err) {
            return res.status(400).json({ 'msg': err })
        }
        if (user) {
            return res.status(400).json({ 'msg': "Email already exist" })
        }
        let addTeacher = teachersInfo(req.body);
        addTeacher.save((err, user) => {
            if (err) {
                return res.status(400).json({ 'msg': err });
            }
            return res.status(200).json(user);
        })
    })
}

// Viewing Teacher's Info
exports.viewTeachersInfo = (req, res) => {
    teachersInfo.find({ _id: req.params.id }, (err, teacher) => {
        if (err) {
            return res.send({ error: err, status: false });
        }
        return res.send({ status: true, data: teacher });
    })
}

exports.viewListOfTeachers = (function (req, res) {
    teachersInfo.find({ activeStatus: req.params.activeStatus }, function (err, teacher) {
        if (err) {
            return res.send({ error: err, status: false });
        }
        return res.send({ status: true, data: teacher });
    });
});

// Update Teacher's Info
exports.updateTeachersInfo = (req, res) => {
    var data = {
        lastName: req.body.lastName,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        nameExt: req.body.nameExt,
        employeeNumber: req.body.employeeNumber,
        itemNumber: req.body.itemNumber,
        dateOfBirth: req.body.dateOfBirth,
        placeOfBirth: req.body.placeOfBirth,
        age: req.body.age,
        gender: req.body.gender,
        maritalStatus: req.body.maritalStatus,
        homeAddress: req.body.homeAddress,
        schoolAssignment: req.body.schoolAssignment,
        district: req.body.district,
        currentPosition: req.body.currentPosition,
        employeeStatus: req.body.employeeStatus,
        designation: req.body.designation,
        firstDayOfService: req.body.firstDayOfService,
        dateOfLastPromotion: req.body.dateOfLastPromotion,
        salaryGrade: req.body.salaryGrade,
        stepIncrement: req.body.stepIncrement,
        eligibility: req.body.eligibility,
        contactNumber: req.body.contactNumber,
        depEdEmailAddress: req.body.depEdEmailAddress,
        tin: req.body.tin,
        philHealthNumber: req.body.philHealthNumber,
        gsisBPNumber: req.body.gsisBPNumber,
        pagIbigNumber: req.body.pagIbigNumber,
        availableServiceCredits: req.body.availableServiceCredits,
        activeStatus: req.body.activeStatus
    }
    teachersInfo.findByIdAndUpdate({ _id: req.body._id }, data, (err, teacher) => {
        if (err) {
            return res.send({ error: err, status: false });
        }
        return res.send({ status: true, data: teacher });
    })
}



var mongoose = require('mongoose');

form10QuarterInfo = new mongoose.Schema({
    studentLRN: {type: Number, required: true},
    studentSchool: {type: String, required: true},
    studentSchoolID: {type: Number, required: true},
    studentDistrict: {type: String, required: true},
    studentDistrict: {type: String, required: true},
    studentDistrict: {type: String, required: true},
    studentClassifiedAsGrade: {type: String, required: true},
    studentSection: {type: String, required: true},
    studentSchoolYear: {type: String, required: true},
    studentAdviser: {type: String, required: true},
    studentAdviser: {type: String, required: false}    
})

module.exports = mongoose.model("Form10QuarterInfo", form10QuarterInfo);
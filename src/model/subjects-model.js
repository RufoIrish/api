var mongoose = require('mongoose');

subjects = new mongoose.Schema({
    studentId: {type: String, required: true},
    motherTongue: {type: Number, required: true},
    filipino: {type: Number, required: true},
    english: {type: Number, required: true},
    mathematics: {type: Number, required: true},
    science: {type: Number, required: true},
    aralingPanlipunan: {type: Number, required: true},
    eppTle: {type: Number, required: true},
    Mapeh: {type: Number, required: false},
    music: {type: Number, required: false},
    pe: {type: Number, required: false},
    arts: {type: Number, required: false},
    health: {type: Number, required: false},
    edukasyonSaPagpapakatao: {type: Number, required: false},
    arabicLanguage: {type: Number, required: false},
    islamicLanguage: {type: Number, required: false},
    quarter: {type: String, required: true}
})

module.exports = mongoose.model("Subjects", subjects);
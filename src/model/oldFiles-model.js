var mongoose = require("mongoose");

oldFilesSchema = new mongoose.Schema({
    fullName: { type: String, required: "Full name is required" },
    lrn: { type: String, required: "LRN is required", unique: false },
    fileUrl: { type: String, required: "file is required" },
    date: { type: String, required: "Year Graduated is required" }
})

module.exports = mongoose.model('oldFiles', oldFilesSchema);



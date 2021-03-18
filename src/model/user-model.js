var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: "username is required" },
    password: { type: String, required: "password is required" },
    role: { type: String, required: true }
})

userSchema.pre('save', function (next) {
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        })
    })
})

userSchema.methods.comparePassword = function (password, hashedPassword) {
    // bcrypt.compare(hashedPassword, this.password,(err, isMatch) => {
    //     if (err) return cb(err);
    //     cb(null, isMatch)
    // })
    console.log(hashedPassword);
    console.log(password);
    const result = bcrypt.compareSync(hashedPassword, password);
    console.log(result);
    return result;
}
module.exports = mongoose.model('User', userSchema);
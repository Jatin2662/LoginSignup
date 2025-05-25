


const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['guest', 'user', 'admin'],
        default: 'user'
    }
});


const UserModel = mongoose.model('users', userSchema);
module.exports = UserModel;
const mongoose = require('mongoose')

const user = require('./user.model')

const Schema = mongoose.Schema;

const reminderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId, ref: 'user'
    },
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    description: {
        type: String,
        required: false,
        trim: true,
        },
}, {
    timestamps: true,
});

//exposes the module to the project
module.exports = mongoose.model('reminder', reminderSchema, 'reminders')
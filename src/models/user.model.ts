import { Schema, Model } from 'mongoose';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
}, {
    timestamps: true,
});

//exposes the module to the project
export const User: Model<any> = new Model(userSchema)
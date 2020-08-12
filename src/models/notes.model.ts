import { Schema, Model } from 'mongoose';

const userSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    note: {
        type: String,
        required: true,
        trim: true,
        },
}, {
    timestamps: true,
});

//exposes the module to the project
export const User: Model<any> = new Model(userSchema)
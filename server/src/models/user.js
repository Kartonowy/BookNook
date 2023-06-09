import moongoose from 'mongoose'
const { Schema } = moongoose

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    favbooks: {
        type: Array,
        required: false,
    },
    searchAmount: {
        type: Number,
        required: false,
        default: 0,
    }
}, { timestamps: true , collection : 'Users' })

const User = moongoose.model("User", userSchema);

export default User;
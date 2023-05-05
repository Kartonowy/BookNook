import moongoose from 'mongoose'
const { Schema } = moongoose

const userSchema = new Schema({
    username: {
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
    }
}, { timestamps: true })

const User = moongoose.model("User", userSchema);

export default User;
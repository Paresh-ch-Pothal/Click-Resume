const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    jdUpload:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'jdupload',
            }
        ]
},{
    timestamps: true
})

const Admin = mongoose.model("admin", adminSchema)
module.exports = Admin
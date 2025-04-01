const mongoose = require("mongoose")

const jdUploadSchema = new mongoose.Schema({
    jobRole: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    requiredSkills: {
        type: [String],
        required: true
    },
    experience: {
        type: Number,
        required: true
    },
    cgpa: {
        type: Number,
        required: true
    },
    jobType: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'admin',
        required: true
    },
    studentsApplied: [
        {
            user:
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
            },
            ats: {
                type: Number,
                default: 0
            }
        }
    ]
}, {
    timestamps: true
})


const JDUpload = mongoose.model("jdupload", jdUploadSchema)
module.exports = JDUpload
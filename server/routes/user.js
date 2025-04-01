const express=require("express")
const router=express.Router()
const Auth = require("../models/auth")
const Admin = require("../models/admin")
const User = require("../models/user")
const fetchuser = require("../middleware/fetchuser")
const JDUpload = require("../models/jdupload")


//upadting the user with the ats score and job id

router.post("/updateUserATSAndJOB", fetchuser, async (req, res) => {
    try {
        const userId = req.user._id;
        const jsonbody = req.body;

        if (!jsonbody || !Array.isArray(jsonbody)) {
            return res.status(400).json({ success: false, message: "Invalid or missing JSON body" });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        for (const entry of jsonbody) {
            const jobId = entry._id;
            const atsScore = entry["ATS Score"];

            // ✅ Update the user's ATS score
            const existingIndex = user.atsScore.findIndex(item => item.jobId.toString() === jobId);
            if (existingIndex !== -1) {
                user.atsScore[existingIndex].score = atsScore;
            } else {
                user.atsScore.push({ jobId, score: atsScore });
            }

            // ✅ Update the job's `studentsApplied` array
            const job = await JDUpload.findById(jobId);
            if (job) {
                const studentIndex = job.studentsApplied.findIndex(s => s.user.toString() === userId);

                if (studentIndex !== -1) {
                    // Update existing student's ATS score
                    job.studentsApplied[studentIndex].ats = atsScore;
                } else {
                    // Add new student entry
                    job.studentsApplied.push({ user: userId, ats: atsScore });
                }

                await job.save();
            }
        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "ATS scores updated successfully",
            updatedATS: user.atsScore
        });

    } catch (error) {
        console.error("Error updating ATS scores:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
});





module.exports=router
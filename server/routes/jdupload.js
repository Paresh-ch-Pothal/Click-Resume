const express = require("express")
const router = express.Router()
const Auth = require("../models/auth")
const Admin = require("../models/admin")
const User = require("../models/user")
const JDUpload = require("../models/jdupload")
const fetchuser = require("../middleware/fetchuser")


// upload the Job
router.post("/uploadJob", fetchuser, async (req, res) => {
    try {
        const userId = req.user._id
        const { jobRole, jobDescription, requiredSkills, experience, cgpa, jobType, companyName } = req.body
        if (!jobRole || !jobDescription || !requiredSkills || !experience || !cgpa || !jobType || !companyName) {
            return res.status(400).json({ message: "Please fill all the fields", success: false })
        }
        const job = await JDUpload.create({
            jobRole, jobDescription, requiredSkills, experience, cgpa, jobType, companyName, recruiter: userId
        })
        return res.status(200).json({ success: true, job })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Some internal issue is There", success: false })
    }
})


//retreiving all th job in json format
router.get("/getAllJobs", async (req, res) => {
    try {
        const jobs = await JDUpload.find().select("jobRole jobDescription requiredSkills experience cgpa")
        if (jobs.length == 0) {
            return res.status(200).json({ success: false, message: "No Jobs Found" })
        }
        return res.status(200).json({ success: true, jobs })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Some internal issue is There", success: false })
    }
})


//fetching jobs of a particular recruiter
router.get("/getJobsRecruiter", fetchuser, async (req, res) => {
    try {
        const userId = req.user._id;
        const jobs = await JDUpload.find({ recruiter: userId })
        if (jobs.length == 0) {
            return res.status(200).json({ success: false, message: "No Jobs Found" })
        }
        return res.status(200).json({ success: true, jobs })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Some internal issue is There", success: false })
    }
})


//fetching resumes of a particular job
router.get("/fetchUploadedResume/:id", async (req, res) => {
    try {
        const jobId = req.params.id
        const job = await JDUpload.findById(jobId).populate("studentsApplied")
        if (!job) {
            return res.status(500).json({ success: false, message: "No Job Found" })
        }
        return res.status(200).json({ success: true, job })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Some internal issue is There", success: false })
    }
})


router.get("/GetResumeFromJob/:id", fetchuser, async (req, res) => {
    try {
        const jobId = req.params.id;
        const userId = req.user._id;
        const job = await JDUpload.findById(jobId);

        // Check if the current user is the recruiter for the job
        if (!job || job.recruiter.toString() !== userId.toString()) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }

        const resume = job.studentsApplied;

        // Populate the 'user' field in the studentsApplied array
        await job.populate({
            path: 'studentsApplied.user',
            select: 'name email'
        });

        // Sort the 'studentsApplied' array based on ATS score in descending order
        const orderedResume = resume.sort((a, b) => b.ats - a.ats);

        return res.status(200).json({ success: true, orderedResume });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Some internal issue is there", success: false });
    }
});





module.exports = router

import React, { useEffect, useState } from "react";
import "../css/admindashboard.css";
import { ToastContainer, toast, Slide } from 'react-toastify';
import loadingAnimation from "../assets/animation2.json";
import TouchRipple from "@mui/material/ButtonBase/TouchRipple";

const AdminDashboard = () => {
    const [jobData, setJobData] = useState({
        jobRole: "",
        jobDescription: "",
        requiredSkills: "",
        experience: "",
        cgpa: "",
        jobType: "",
        companyName: "",
    });
    const [loading, setLoading] = useState(false); // Add loading state

    const host = import.meta.env.VITE_API_URL;

    

    

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { jobRole, jobDescription, requiredSkills, experience, cgpa, jobType, companyName } = jobData;
        if (!jobRole || !jobDescription || !requiredSkills || !experience || !cgpa || !jobType || !companyName) {
            alert("Please fill all the fields");
            return;
        }
        try {
            const response = await fetch(`${host}/api/job/uploadJob`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body: JSON.stringify({ jobData, jobRole, jobDescription, requiredSkills, experience, cgpa, jobType, companyName })
            })
            const data = await response.json()
            if (data.success) {
                toast.success('Job Uploaded SuccessFully', {
                    position: "bottom-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                });
            }
            console.log(data)
        } catch (error) {

        }

    };


    const [jobs, setJobs] = useState([]);

    const fetchJobsRecruiter = async () => {
        try {
            const response = await fetch(`${host}/api/job/getJobsRecruiter`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                }
            })
            const data = await response.json()
            if (data.success) {
                setJobs(data.jobs)
            }
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchJobsRecruiter()
    }, [])

    const [resumes, setResumes] = useState([]);

    const showResumeAccordingtoJob=async(jobId)=>{
        try {
            setLoading(true)
            const response=await fetch(`${host}/api/job/GetResumeFromJob/${jobId}`,{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                }
            })
            const data=await response.json()
            if (data.success){
                setResumes(data.orderedResume)
            }
            setLoading(false)
            console.log(data)
        } catch (error) {
            
        }
    }

    const handleJobClick=(jobId)=>{
        // fetchResumes(jobId);
        showResumeAccordingtoJob(jobId)
    }


    


    return (
        <div className="admin-dashboard">
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Slide}
            />
            {/* Left Side - Job Upload */}
            <div className="job-upload">
                <h2>Upload Job</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="jobRole" placeholder="Job Role" onChange={handleChange} required />
                    <textarea name="jobDescription" placeholder="Job Description" onChange={handleChange} required />
                    <input type="text" name="requiredSkills" placeholder="Required Skills (comma-separated)" onChange={handleChange} required />
                    <input type="number" name="experience" placeholder="Experience (Years)" onChange={handleChange} required />
                    <input type="number" name="cgpa" step="0.1" placeholder="CGPA" onChange={handleChange} />
                    <input type="text" name="jobType" placeholder="Job Type" onChange={handleChange} required />
                    <input type="text" name="companyName" placeholder="Company Name" onChange={handleChange} required />
                    <button type="submit" className="submit-btn">Submit</button>
                </form>
            </div>

            {/* Right Side - Resume List */}
            <div className="resume-container">
                {/* Left Side - Jobs List */}
                <div className="job-list">
                    <h2>Uploaded Jobs</h2>
                    {jobs.length === 0 ? (
                        <p>No jobs uploaded yet.</p>
                    ) : (
                        <ul className="job-list-scrollable" >
                            {jobs.map((job, index) => (
                                <li key={index} className="job-item" onClick={()=>{handleJobClick(job._id)}}>
                                    <h3>{job.jobRole}</h3>
                                    <div className="resumes-container">
                                        <ul>
                                            <p>Description: {job.jobDescription.slice(0,50)}...</p>
                                            <p>CGPA: {job.cgpa}</p>
                                            <p>Experience: {job.experience}</p>
                                        </ul>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Right Side - Resume List */}
                <div className="resume-list">
                    <h2>Uploaded Resumes</h2>
                    {resumes.length === 0 ? (
                        <p>No resumes uploaded yet.</p>
                    ) : (
                        <ul>
                            {resumes.map((resume, index) => (
                                <li key={index}>{resume.user.name} - {resume.user.email} - ATS : {resume.ats.toFixed(2)}%</li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

        </div>
    );
};

export default AdminDashboard;

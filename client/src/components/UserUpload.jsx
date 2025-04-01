import React, { useEffect, useState } from "react";
import "../css/userupload.css";
import Lottie from "react-lottie";
import loadingAnimation from "../assets/animation2.json";

const UserUpload = () => {
    const [jobRole, setJobRole] = useState(""); // Add jobRole state
    const [resume, setResume] = useState(null); // Add resume state
    const [loading, setLoading] = useState(false); // Add loading state

    // Handle resume file input change
    const handleResumeChange = (e) => {
        setResume(e.target.files[0]);
    };

    // Handle job role selection change
    const handleJobRoleChange = (e) => {
        setJobRole(e.target.value);
    };



    const [allJobs, setAllJobs] = useState([])
    const [uniqueJobRole, setUniqueJobRole] = useState([])
    const host = import.meta.env.VITE_API_URL;
    const hostFlaks = import.meta.env.VITE_API_URL_FLASK;

    const getUniqueJobRole = async (jobs) => {
        if (!jobs || jobs.length === 0) {
            console.log("No jobs available to send.");
            return;
        }

        try {
            const response = await fetch(`${hostFlaks}/uniqueJobRoleFromMERN`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ allJobs: jobs })  // Use passed jobs
            });

            const data = await response.json();
            if (data.success) {
                setUniqueJobRole(data.uniqueJobRole)
            }
            console.log(data);
        } catch (error) {
            console.error("Error fetching unique job roles:", error);
        }
    };

    const getAllJobs = async () => {
        try {
            const response = await fetch(`${host}/api/job/getAllJobs`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const data = await response.json();
            console.log(data.jobs);

            if (data.success) {
                setAllJobs(data.jobs);
                getUniqueJobRole(data.jobs);
            }
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    useEffect(() => {
        getAllJobs()
    }, [])

    const [text, setText] = useState([])

    // const handleGetResumeText = async () => {
    //     if (!resume) {
    //         console.error("No resume file selected.");
    //         return;
    //     }

    //     const formData = new FormData();
    //     formData.append("resume", resume);

    //     try {
    //         uploadResumeAndGetText(formData);
    //     } catch (error) {
    //         console.error("Error uploading resume:", error);
    //     }
    // }


    const uploadResumeAndGetText = async () => {
        try {
            if (!resume) {
                console.error("No resume file selected.");
                return null;  // Return null if no resume
            }

            const formData = new FormData();
            formData.append("resume", resume);
            const response = await fetch(`${hostFlaks}/upload`, {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            console.log(text)
            if (data.success) {
                setText(data.text);
                console.log(data.text)
                return data.text;
            }

            console.error("Error extracting text:", data.error);
            return null;
        } catch (error) {
            console.error("Upload failed:", error);
            return null;
        }
    };

    const calculateAtsScore = async (allJobs, structuredData, selectedOption) => {
        try {
            const response = await fetch(`${hostFlaks}/calculate_ats_scoreMERN`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    allJobs,
                    text: structuredData,
                    selectedOption
                })
            });

            const data = await response.json();
            if (data.success) {
                console.log("ATS Score Results:", data.topMatches);
                return data.topMatches;
            } else {
                console.error("Error:", data.error);
                return [];
            }
        } catch (error) {
            console.error("Failed to fetch ATS score:", error);
            return [];
        }
    };

    const GetFeedback = async (structuredData) => {
        try {
            const response = await fetch(`${hostFlaks}/feedbackMERN`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: structuredData
                })
            })
            const data = await response.json()
            if (data.success) {
                setFeedBackData(data.data)
            }
            console.log(data)
        } catch (error) {

        }
    }

    const [atsScore, setAtsScore] = useState([])
    const [feedbackData, setFeedBackData] = useState([])

    const handleSubmit = async () => {
        setLoading(true); // Start loading animation
        try {
            const extractedText = await uploadResumeAndGetText();
            if (!extractedText) return;

            const atsScoreResults = await calculateAtsScore(allJobs, extractedText, jobRole);
            setAtsScore(atsScoreResults);
            const feedback = await GetFeedback(extractedText);
            console.log("ATS Score Results:", atsScoreResults);
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setLoading(false); // Stop loading animation once data is fetched
        }
    };


    const mapAssessmentToSliderValue = (assessment) => {
        switch (assessment) {
            case "weak":
                return 30; // low value for weak
            case "medium":
                return 60; // medium value
            case "strong":
                return 90; // high value for strong
            default:
                return 50; // default to medium
        }
    };

    const updateUserATS=async()=>{
        try {
            const response=await fetch(`${host}/api/user/updateUserATSAndJOB`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body: JSON.stringify(atsScore)
            })
            const data=await response.json()
            if(data.success){

            }
            console.log(data)
        } catch (error) {
            
        }
    }

    useEffect(()=>{
        updateUserATS()
    },[atsScore])





    return (
        <div className="file-upload-container">
            {/* Upload Section */}
            <div className="upload-box">
                <h2>Upload Your Resume</h2>

                {/* Job Role Dropdown */}
                <select
                    className="job-role-select"
                    value={jobRole}
                    onChange={handleJobRoleChange}
                    required
                >
                    <option value="">Select Job Role</option>
                    {uniqueJobRole.map((job, index) => (
                        <option key={index} value={job}>{job}</option>
                    ))}
                    <option value="None">None</option>
                </select>

                {/* Resume File Input */}
                <input
                    type="file"
                    className="file-input"
                    onChange={handleResumeChange}
                    required
                />

                {/* Submit Button */}
                <button onClick={handleSubmit} className="submit-btn">Submit</button>
            </div>

            {/* Loading Animation */}
            {loading && (
                <div className="loading-overlay">
                    <Lottie options={{
                        animationData: loadingAnimation, // Your Lottie animation JSON
                        loop: true,
                        autoplay: true,
                    }} height={150} width={150} />
                </div>
            )}

            {/* Left & Right Sections */}
            <div className="results-container">
                {/* Left Section: ATS Score & Job Suggestions */}
                <div className="left-section">
                    {atsScore.length > 0 ? (
                        atsScore.length === 1 ? (
                            <h2>ATS Score: {atsScore[0]["ATS Score"].toFixed(2)}%</h2>
                        ) : (
                            atsScore.map((ats, index) => (
                                <div className="job-item-box" key={index}>
                                    <div className="job-role">
                                        {ats.jobRole}
                                    </div>
                                    <div className="ats-score">
                                        Score: {ats["ATS Score"].toFixed(2)}%
                                    </div>
                                </div>
                            ))
                        )
                    ) : (
                        <div>No ATS Score Is Present</div>
                    )}
                </div>

                {/* Right Section: Feedback & Strength Slider */}
                <div className="right-section">
                    <h3>Resume Feedback</h3>
                    <div className="feedback-container">
                        <div className="feedback-section">
                            <h4>Strengths</h4>
                            <ul>
                                {feedbackData.Strengths && feedbackData.Strengths.length > 0 ? (
                                    feedbackData.Strengths.map((item, index) => <li key={index}>{item}</li>)
                                ) : (
                                    <li>No strengths identified</li>
                                )}
                            </ul>
                        </div>

                        <div className="feedback-section">
                            <h4>Weaknesses</h4>
                            <ul>
                                {feedbackData.Weaknesses && feedbackData.Weaknesses.length > 0 ? (
                                    feedbackData.Weaknesses.map((item, index) => <li key={index}>{item}</li>)
                                ) : (
                                    <li>No weaknesses identified</li>
                                )}
                            </ul>
                        </div>

                        <div className="feedback-section">
                            <h4>Suggestions</h4>
                            <ul>
                                {feedbackData.Suggestions && feedbackData.Suggestions.length > 0 ? (
                                    feedbackData.Suggestions.map((item, index) => <li key={index}>{item}</li>)
                                ) : (
                                    <li>No suggestions available</li>
                                )}
                            </ul>
                        </div>

                        <div className="overall-assessment">
                            <h4>Overall Assessment</h4>
                            <div className={`assessment ${feedbackData["Overall Assessment"]}`}>
                                {feedbackData["Overall Assessment"]}
                            </div>
                        </div>

                        <div className="feedback-slider-container">
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={mapAssessmentToSliderValue(feedbackData["Overall Assessment"])}
                                className="strength-slider"
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserUpload;

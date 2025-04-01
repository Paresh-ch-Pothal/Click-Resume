import React from "react";
import "../css/about.css";

const About = () => {
  return (
    <section className="about-us">
      {/* Banner Section */}
      <div className="banner">
        <div className="overlay">
          <h1>About Our ATS System</h1>
          <p>
            Transforming resumes into opportunities with AI-powered analysis and job matching.
          </p>
        </div>
      </div>

      {/* About Content */}
      <div className="container">
        <p className="about-text">
          Our AI-driven ATS system helps job seekers optimize their resumes and improve their chances of landing their dream jobs. 
          With advanced parsing and scoring, we provide tailored job recommendations and feedback.
        </p>

        <div className="features">
          <div className="feature-box">
            <h3>Smart Resume Analysis</h3>
            <p>
              Our system scans resumes and evaluates them against job descriptions to provide a precise ATS score.
            </p>
          </div>
          <div className="feature-box">
            <h3>Tailored Job Suggestions</h3>
            <p>
              Get AI-driven job recommendations based on your resume, skills, and experience.
            </p>
          </div>
          <div className="feature-box">
            <h3>Real-Time Feedback</h3>
            <p>
              Receive instant feedback with a visual strength indicator to enhance your resume effectively.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

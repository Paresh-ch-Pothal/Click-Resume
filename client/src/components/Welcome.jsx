import React from 'react'
import '../css/welcome.css';

const Welcome = () => {
    return (
        <div className="welcome-page">
            <div className="hero-section">
                <div className="content-box">
                    <h1>Welcome to ATS System</h1>
                    <p>Your ultimate solution for streamlining your recruitment process.</p>
                    <button className="cta-button">Get Started</button>
                </div>
            </div>

            <section className="features">
                <h2>Key Features</h2>
                <div className="feature-cards">
                    <div className="feature-card">
                        <img src="https://via.placeholder.com/150" alt="Tracking Icon" />
                        <h3>Applicant Tracking</h3>
                        <p>Track applicants through every stage of the hiring process.</p>
                    </div>
                    <div className="feature-card">
                        <img src="https://via.placeholder.com/150" alt="Resume Icon" />
                        <h3>Resume Parsing</h3>
                        <p>Automatically parse resumes and extract relevant data.</p>
                    </div>
                    <div className="feature-card">
                        <img src="https://via.placeholder.com/150" alt="Analytics Icon" />
                        <h3>Analytics & Reporting</h3>
                        <p>Analyze your recruitment data with detailed reports.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Welcome

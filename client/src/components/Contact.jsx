import React from "react";
import "../css/contact.css";

const Contact = () => {
  return (
    <section className="contact-us">
      <div className="container">
        <h2>Contact Us</h2>
        <p className="contact-text">Get in touch with us for any inquiries or visit us at our office.</p>

        <div className="contact-details">
          <div className="details-box">
            <h3>Our Address</h3>
            <p>1234 ATS Tower, Business Street, New York, USA</p>
          </div>
          <div className="details-box">
            <h3>Email</h3>
            <p>support@atscompany.com</p>
          </div>
          <div className="details-box">
            <h3>Phone</h3>
            <p>+1 234 567 890</p>
          </div>
          <div className="details-box">
            <h3>Landline</h3>
            <p>+1 987 654 321</p>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-container">
          <iframe
            title="company-location"
            src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=New+York,USA"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default Contact;

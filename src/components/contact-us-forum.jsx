import React, { useState } from "react";

function ContactUsForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    jobRole: "",
    company: "",
    country: "",
    areaOfInterest: "",
    helpDescription: "",
    howDidYouHear: "",
    agreeToEmails: false,
  });

  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false); // New state for loader

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);

    setLoading(true); // Show loader while submitting
    setResponseData(null); // Clear previous response

    try {
      const response = await fetch("http://localhost:8000/generate_data/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          country: formData.country,
          position: formData.jobRole,
          interest: formData.areaOfInterest,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Response Data:", data);

        setResponseData(data);
      } else {
        const error = await response.json();
        alert("Error: " + error.detail);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error with the submission. Please try again.");
    } finally {
      setLoading(false); // Hide loader after request completes
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "50px" }}>
      <h1
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "10px",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        Contact Us
      </h1>
      <p
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        Please fill out the form, and we’ll get in touch shortly.
      </p>
      <div>
        {" "}
        <form onSubmit={handleSubmit}>
          {/* Name Fields */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <input
              type="text"
              name="name"
              placeholder="Name *"
              value={formData.name}
              onChange={handleChange}
              required
              style={{ flex: 1, padding: "10px" }}
            />
          </div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ flex: 1, padding: "10px" }}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone *"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{ flex: 1, padding: "10px" }}
            />
          </div>

          {/* Job Role and Company */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <select
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              required
              style={{ flex: 1, padding: "10px" }}
            >
              <option value="">Job Role *</option>
              <option value="Developer">Developer/Engineer</option>
              <option value="IT Executive">IT Executive</option>
              <option value="C-Level">C-Level</option>
              <option value="Solution or Systems Architect">
                Solution or Systems Architect
              </option>
              <option value="Student">Student</option>
              <option value="Other">Other</option>
            </select>
            <input
              type="text"
              name="company"
              placeholder="Company *"
              value={formData.company}
              onChange={handleChange}
              required
              style={{ flex: 1, padding: "10px" }}
            />
          </div>

          {/* Country and Area of Interest */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              style={{ flex: 1, padding: "10px" }}
            >
              <option value="">Country *</option>
              <option value="USA">USA</option>
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Canada">Canada</option>
              <option value="UK">UK</option>
            </select>
            <select
              name="areaOfInterest"
              value={formData.areaOfInterest}
              onChange={handleChange}
              required
              style={{ flex: 1, padding: "10px" }}
            >
              <option value="">Area of Interest *</option>
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
              <option value="Finance">Finance</option>
            </select>
          </div>

          {/* Description */}
          <div style={{ marginBottom: "10px" }}>
            <textarea
              name="helpDescription"
              placeholder="How Can We Help You? (Please provide a description of your requirement)"
              value={formData.helpDescription}
              onChange={handleChange}
              required
              style={{ width: "100%", padding: "10px", height: "80px" }}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              backgroundColor: "#000",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              cursor: "pointer",
            }}
            disabled={loading} // Disable the button while loading
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>

      {/* Loader */}
      {loading && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>Loading...</p>
        </div>
      )}

      {/* Display response data */}
      {responseData && (
        <div style={{ marginTop: "20px" }}>
          <h2>Generated Data</h2>
          <p>
            <strong>Professional Summary:</strong>{" "}
            {responseData.professional_summary}
          </p>
          <p>
            <strong>Social Media Links:</strong>{" "}
            {responseData.social_media_links}
          </p>
          <p>
            <strong>Company Summary:</strong> {responseData.company_summary}
          </p>
          <p>
            <strong>Company Competitors:</strong>{" "}
            {responseData.company_competitors}
          </p>
          <p>
            <strong>Additional Insights:</strong>{" "}
            {responseData.additional_insights}
          </p>
        </div>
      )}
    </div>
  );
}

export default ContactUsForm;
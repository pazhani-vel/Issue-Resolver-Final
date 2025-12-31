import React, { useState, useContext } from "react";
import UserDetailsForm from "./UserDetailsForm";
import IssueDetailsForm from "./IssueDetailsForm";
import LocationCheckbox from "./LocationCheckbox";
import { addIssue, saveUser } from "../../firebase/firestore";
import { UserContext } from "../../context/UserContext";

const ReportIssueForm = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [issueData, setIssueData] = useState({});
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [image, setImage] = useState(null); // will store base64 string
  const [loading, setLoading] = useState(false);

  // Convert selected image to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result); // base64 string
    };
    reader.readAsDataURL(file);
  };

  const generateSummary = async () => {
  const res = await fetch("/api/generateSummary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description: issueData.description,
    }),
  });

  if (!res.ok) {
    throw new Error("AI API failed");
  }

  const data = await res.json();
  return data.summary;
};




  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userData.Name || !userData.Email || !userData.User_ID || !userData.Role) 
      return alert("Fill all user details");

    if (!issueData.description || !issueData.category) 
      return alert("Fill issue details (Category and Description)");

    if (!location.lat || !location.lon) 
      return alert("Location not detected yet");

    setLoading(true);

    try {

      // Save/update user
      await saveUser(userData.Email, userData);

      const finalIssueData = {
        ...issueData,
        reportedBy: userData.Email.toLowerCase(),
        location,
        imageUrl: image, // store base64 string
        status: "Pending",
        createdAt: new Date().toISOString(),
        votes:0
      };

      await addIssue(finalIssueData);
      alert("✅ Issue submitted successfully!");

      // Reset form
      setIssueData({});
      setLocation({ lat: null, lon: null });
      setImage(null);

    } catch (err) {
      console.error("Submission Error:", err);
      alert("Submit failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="report-page">
      <form className="issue-form" onSubmit={handleSubmit}>

        <div className="form-block">
          <UserDetailsForm userData={userData} setUserData={setUserData} />
        </div>

        <div className="form-block">
          <IssueDetailsForm issueData={issueData} setIssueData={setIssueData} />
        </div>

        <div className="form-block">
          <LocationCheckbox setLocation={setLocation} />
        </div>

        <div className="form-block">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          {image && <p>Selected file: {image.substring(0, 30)}... (base64)</p>}
        </div>

        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Issue"}
        </button>

      </form>
    </div>
  );
};

export default ReportIssueForm;

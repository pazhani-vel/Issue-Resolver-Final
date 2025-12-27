import React, { useState, useContext } from "react";
import UserDetailsForm from "./UserDetailsForm";
import IssueDetailsForm from "./IssueDetailsForm";
import LocationCheckbox from "./LocationCheckbox";
import { addIssue, saveUser } from "../../firebase/firestore";
import { uploadImage } from "../../firebase/storage";
import { UserContext } from "../../context/UserContext";
import { GoogleGenerativeAI } from "@google/generative-ai";

const ReportIssueForm = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [issueData, setIssueData] = useState({});
  const [location, setLocation] = useState({ lat: null, lon: null });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // Initialize Gemini outside the function to avoid re-creating it on every click
  const genAI = new GoogleGenerativeAI("AIzaSyBpWUyP3EOJdxhpxv4WfqaYDG3952JaGS0");
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // --- 1. FIXED VALIDATION ---
    if (!userData.Name || !userData.Email || !userData.User_ID || !userData.Role) 
      return alert("Fill all user details");
    
    // REMOVED !issueData.shortDescription from here because Gemini will fill it
    if (!issueData.description || !issueData.category) 
      return alert("Fill issue details (Category and Description)");
    
    if (!location.lat || !location.lon) 
      return alert("Location not detected yet");

    setLoading(true);
    try {
      // --- 2. GEMINI INTEGRATION ---
      console.log("Generating AI summary...");
      const prompt = `Summarize the following issue description into exactly 1 short, professional sentences: "${issueData.description}"`;
      
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const aiSummary = response.text();
      console.log("AI Summary:", aiSummary);

      // --- 3. FIREBASE OPERATIONS ---
      await saveUser(userData.Email, userData);

      let imageUrl = null;
      if (image) imageUrl = await uploadImage(image);

      const finalIssueData = {
        ...issueData,
        shortDescription: aiSummary, // Storing Gemini's output
        reportedBy: userData.Email.toLowerCase(),
        location,
        imageUrl: imageUrl,
        status: "Pending",
        createdAt: new Date().toISOString(),
      };

      await addIssue(finalIssueData);
      alert("✅ Issue submitted with AI summary");

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
    <form onSubmit={handleSubmit}>
      <UserDetailsForm userData={userData} setUserData={setUserData} />
      {/* Ensure IssueDetailsForm doesn't require users to type in shortDescription manually */}
      <IssueDetailsForm issueData={issueData} setIssueData={setIssueData} />
      <LocationCheckbox setLocation={setLocation} />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit" disabled={loading}>
        {loading ? "Generating Summary & Submitting..." : "Submit Issue"}
      </button>
    </form>
  );
};

export default ReportIssueForm;
export const uploadImage = async (file) => {
  if (!file) return null;

  try {
    // just simulate uploading, or upload to your backend/local folder
    // e.g., send to your Node server, but ignore the URL
    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://localhost:5000/upload", {
      method: "POST",
      body: formData,
    });

    // Always return null for Firestore
    return null;
  } catch (err) {
    console.error("Image upload error:", err);
    return null; // Never break your app
  }
};

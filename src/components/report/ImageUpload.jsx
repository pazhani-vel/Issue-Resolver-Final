import React from "react";

const ImageUpload = ({ image, setImage }) => {
  return (
    <div style={{ margin: "10px 0" }}>
      <h3>Upload Image</h3>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />
      {image && <p>Selected file: {image.name}</p>}
    </div>
  );
};

export default ImageUpload;

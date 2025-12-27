import React, { useState } from "react";

export const getCurrentLocation = () =>
  new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject("Geolocation not supported");
    navigator.geolocation.getCurrentPosition(
      pos => resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      err => reject(err.message)
    );
  });

const LocationCheckbox = ({ setLocation }) => {
  const [checked, setChecked] = useState(false);

  const handleChange = async e => {
    const isChecked = e.target.checked;
    setChecked(isChecked);

    if (isChecked) {
      try {
        const coords = await getCurrentLocation();
        setLocation(coords);
      } catch (err) {
        alert("Failed to get location: " + err);
        setChecked(false);
      }
    } else {
      setLocation({ lat: null, lon: null });
    }
  };

  return (
    <div>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <label>Detect my location</label>
    </div>
  );
};

export default LocationCheckbox;

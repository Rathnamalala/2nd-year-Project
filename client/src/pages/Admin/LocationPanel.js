// LocationPanel.js
import React, { useState } from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const LocationPanel = ({ isOpen, onClose, onLocationSelect }) => {
  const [location, setLocation] = useState({ lat: 0, lng: 0 });

  const handleMapClick = (event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setLocation({ lat, lng });
  };

  const handleSaveLocation = () => {
    onLocationSelect(location);
    onClose();
  };

  return (
    <div className={`location-panel ${isOpen ? "open" : ""}`}>
      <div className="location-map">
        <GoogleMap
          defaultZoom={12}
          defaultCenter={{ lat: location.lat, lng: location.lng }}
          onClick={handleMapClick}
        >
          <Marker position={{ lat: location.lat, lng: location.lng }} />
        </GoogleMap>
      </div>
      <div className="location-actions">
        <button onClick={handleSaveLocation}>Save Location</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default withGoogleMap(LocationPanel);

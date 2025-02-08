import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const states = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"
];

const Home: React.FC = () => {
  const [city, setCity] = useState("");
  const [stateCode, setStateCode] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    console.log(`Searching for events in ${city}, ${stateCode}`);
    navigate(`/results?city=${city}&stateCode=${stateCode}`);
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-50 frosted-glass">
      <div className="w-75">
        <h2 className="text-center mb-4">Search for Events</h2>
        <div className="row mb-3">
          <div className="col-md-8">
            <input
              type="text"
              className="form-control"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-control custom-select"
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
            >
              <option value="">State</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="d-grid">
          <button className="btn btn-primary" onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;

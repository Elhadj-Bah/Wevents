import { useState, FormEvent } from "react";
import { LocationData } from "../interfaces/LocationInterface";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
import getEvents from "../api/eventApi";
import "../css/searchForm.css"

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

interface SearchFormProps{
  // setEventData: (eventData: any) => void;
  // setWeatherData: (weatherData: any) => void
  setData: (data: {events: any; weather: any}) => void;
}

const searchForm = ({setData}: SearchFormProps) => {
  const [location, setLocation] = useState<LocationData>({
    city: "",
    stateCode: "",
  });

  const [selectedState, setSelectedState] = useState<string>("");

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
  
    if (!location.city || !location.stateCode) {
      console.error("City and state are required.");
      return;
    }
  
    try {
      console.log(`Searching for events in ${location.city}, ${location.stateCode}`);
      const data = await getEvents(location);
      console.log(data);
      setData({
        events: data.eventData,
        weather: data.forecastData
      })


    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocation({
      ...location,
      [name]: value,
    });
  };

  return (
        <form className="form" onSubmit={handleSearch}>
          
          <div className="row mb-3">
            <div className="col-md-8">
              <input
                type="text"
                name="city"
                className="form-control"
                placeholder="Enter city"
                value={location.city || ""}
                onChange={handleLocationChange}
              />
            </div>

            <div className="col-md-4">
              <DropdownButton
                id="state-dropdown"
                title={selectedState || "Select state"}
                className="w-100"
              >
                <div style={{maxHeight: "300px", overflowY: "auto"}}>
                    {states.map((state) => (
                    <Dropdown.Item
                        key={state}
                        onClick={() => {
                        setSelectedState(state);
                        setLocation((prev) => ({...prev, stateCode: state}));
                        }}
                    >
                        {state}
                    </Dropdown.Item>
                    ))}
                </div>
              </DropdownButton>
            </div>
          </div>
          <div className="d-grid">
            <button className="btn btn-primary" onClick={handleSearch}>
              Search
            </button>
          </div>
        </form>
  );
};

export default searchForm;

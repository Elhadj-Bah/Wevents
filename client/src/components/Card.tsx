import React, { useState } from "react";

interface CardProps {
  eventId: string;
  name: string;
  url: string;
  localStartDate: string;
  localStartTime: string;
  FirstImageData: {
    ratio: string;
    url: string;
    width: number;
    height: number;
    fallback: boolean;
  };
  weather?: {
    temp: number;
    description: string;
    icon: string;
  };
}

const Card: React.FC<CardProps> = ({
  eventId,
  name,
  url,
  localStartDate,
  localStartTime,
  FirstImageData,
  weather,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title">{name}</h5>
          <button
            className={`btn btn-link p-0 ${
              isFavorite ? "text-danger" : "text-muted"
            }`}
            onClick={toggleFavorite}
          >
            <i className={`bi bi-heart${isFavorite ? "-fill" : ""}`}></i>
          </button>
        </div>
        {FirstImageData.url && (
          <img
            src={FirstImageData.url}
            className="card-img standardized-img"
            alt={name}
          />
        )}
        <p className="card-text">Date: {localStartDate}</p>
        <p className="card-text">Time: {localStartTime}</p>
        {weather && (
          <>
            <p className="card-text">Temperature: {weather.temp}°C</p>
            <p className="card-text">Description: {weather.description}</p>
            <img
              src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
              alt={weather.description}
            />
          </>
        )}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          Event Details
        </a>
      </div>
    </div>
  );
};

export default Card;

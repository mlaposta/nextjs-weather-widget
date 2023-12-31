import React, { useState, useEffect } from 'react';

import styles from '../styles/widget.module.css';

interface WeatherWidgetProps {
  city?: string;
  coordinates?: { lat: number; lon: number };
}

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ city, coordinates }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let query = '';

        if (city) {
          query = `q=${city}`;
        } else if (coordinates) {
          query = `lat=${coordinates.lat}&lon=${coordinates.lon}`;
        } else {
          console.error('Please provide either city or coordinates.');
          return;
        }

        const response = await fetch(`/api/weather?${query}`);
        const data: WeatherData = await response.json();

        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [city, coordinates]);

  console.log(weatherData);

  return (
    <div className={styles.weatherWidget}>
      {!weatherData ? (
        <div>Loading weather ...</div>
      ) : (
        <>
          <h2>{weatherData.name}</h2>

          <p className={styles.weather}>{weatherData.weather[0].description}</p>

          <div className={styles.currentWeather}>
            <img
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
            <div>{Math.round(weatherData.main.temp)}°C</div>
          </div>

          <p className={styles.feelsLike}>
            Feels like: {Math.round(weatherData.main.feels_like)}°C
          </p>
        </>
      )}
    </div>
  );
};

export default WeatherWidget;

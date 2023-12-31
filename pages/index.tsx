import React from 'react';
import WeatherWidget from '../components/weatherWidget';

const Home: React.FC = () => {
  return (
    <div className='App'>
      {/* Example using city name */}
      <WeatherWidget city='Montreal' />

      {/* Example using coordinates */}
      {/* <WeatherWidget coordinates={{ lon: -73.5878, lat: 45.5088 }} /> */}
    </div>
  );
};

export default Home;

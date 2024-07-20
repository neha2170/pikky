import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FlightCard from './FlightCard';

const FlightList = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const { data } = await axios.get('/api/flights');
        setFlights(data);
        setFilteredFlights(data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredFlights.map(flight => (
        <FlightCard key={flight._id} flight={flight} />
      ))}
    </div>
  );
};

export default FlightList;

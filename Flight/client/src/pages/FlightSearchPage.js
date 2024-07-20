import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FlightCard from '../components/FlightCard';

const FlightSearchPage = () => {
  const [flights, setFlights] = useState([]);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [search, setSearch] = useState('');
  const [token, setToken] = useState(''); // State for Bearer token

  // Fetch token from localStorage or another secure place
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken'); // or any other place you store the token
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/flights', {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the Bearer token
          },
        });
        setFlights(response.data);
        setFilteredFlights(response.data);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    if (token) {
      fetchFlights();
    }
  }, [token]); // Refetch flights when token changes

  const handleSearch = () => {
    const results = flights.filter(flight =>
      flight.flightNumber.toLowerCase().includes(search.toLowerCase()) ||
      flight.origin.toLowerCase().includes(search.toLowerCase()) ||
      flight.destination.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredFlights(results);
  };

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search flights by number, origin, or destination"
          className="p-2 border border-gray-300 rounded w-full"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white p-2 rounded mt-2"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFlights.map(flight => (
          <FlightCard key={flight._id} flight={flight} />
        ))}
      </div>
    </div>
  );
};

export default FlightSearchPage;

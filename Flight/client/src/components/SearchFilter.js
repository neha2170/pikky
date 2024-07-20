import React, { useState } from 'react';
import axios from 'axios';

const SearchFilter = () => {
  const [query, setQuery] = useState('');
  const [filteredFlights, setFilteredFlights] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(`/api/flights?search=${query}`);
      setFilteredFlights(data);
    } catch (error) {
      console.error('Error searching flights:', error);
    }
  };

  return (
    <div className="mb-4">
      <form onSubmit={handleSearch} className="flex items-center space-x-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search flights..."
          className="p-2 border border-gray-300 rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded-lg"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchFilter;

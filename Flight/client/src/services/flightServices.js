import axios from 'axios';

const fetchFlights = async () => {
  const response = await axios.get('/api/flights');
  return response.data;
};

const updateFlightStatus = async (id, status) => {
  const response = await axios.put(`/api/flights/${id}/status`, { status });
  return response.data;
};

export default {
  fetchFlights,
  updateFlightStatus
};

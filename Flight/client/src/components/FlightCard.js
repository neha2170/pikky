import React, { useState, useEffect } from 'react';
import { Button, Badge, Card, CardContent, Typography, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const FlightCard = ({ flight }) => {
  const [status, setStatus] = useState(flight.status);
    const [statusOptions, setStatusOptions] = useState([]);
    // Fetch the token from local storage
  const token = localStorage.getItem('authToken'); 

  useEffect(() => {
    // Fetch status options from the API
    const fetchStatusOptions = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/flight/status', {
          headers: {
            'Authorization': `Bearer ${token}`, 
          }
        });

        // Assuming the API returns an array of status objects
        setStatusOptions(data.map(option => option.name));
      } catch (error) {
        console.error('Error fetching status options:', error);
      }
    };

    if (token) {
      fetchStatusOptions();
    } else {
      console.warn('No authentication token found.');
    }
  }, [token]);

  const handleStatusChange = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);

    if (!token) {
      alert('No authentication token found.');
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/flights/${flight._id}/status`,
        { status: newStatus },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert('Status updated successfully');
    } catch (error) {
      console.error('Error updating flight status:', error);
      alert('Error updating status');
    }
  };

  return (
    <Card className="mb-4">
      <CardContent>
        <Typography variant="h5" component="div">
          {flight.flightNumber}
        </Typography>
        <Typography color="text.secondary">
          From: {flight.origin}
        </Typography>
        <Typography color="text.secondary">
          To: {flight.destination}
        </Typography>
        <Typography color="text.secondary">
          Scheduled: {new Date(flight.scheduledDeparture).toLocaleString()}
        </Typography>
        <Badge
          color={
            status === 'In-flight' ? 'success' :
            status === 'Delayed' ? 'warning' : 'error'
          }
        >
          {status}
        </Badge>
        <FormControl className="mt-2" fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
  value={status}
  onChange={handleStatusChange}
  label="Status"
  sx={{
    width: '450px',
    '& .MuiSelect-select': {
      padding: '6px 16px',
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderWidth: '1px',
    },
  }}
>
  {statusOptions.map(option => (
    <MenuItem key={option} value={option}>
      {option}
    </MenuItem>
  ))}
</Select>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export default FlightCard;

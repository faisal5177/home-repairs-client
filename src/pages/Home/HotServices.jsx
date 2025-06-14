import React, { useEffect, useState } from 'react';
import HotServicesCard from './HotServicesCard';

const HotServices = ({ services: propServices }) => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Only fetch if no props provided
    if (!propServices) {
      fetch('http://localhost:3000/services')
        .then((res) => res.json())
        .then((data) => {
          setServices(data.slice(0, 6));
        })
        .catch((err) => console.error('Failed to load services', err));
    }
  }, [propServices]);

  const finalServices = propServices || services;

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        {propServices ? 'All Services' : 'Popular Services'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {finalServices.map((service) => (
          <HotServicesCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default HotServices;

import React, { useEffect, useState } from 'react';
import HotServicesCard from './HotServicesCard';

const HotServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/services')
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []); 

  return (
    <div className="max-w-7xl mx-auto px-4 py-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Popular Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <HotServicesCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default HotServices;

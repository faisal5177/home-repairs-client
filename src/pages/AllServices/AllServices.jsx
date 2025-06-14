import React, { useEffect, useState } from 'react';
import HotServices from '../Home/HotServices';

const AllServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/services')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched All Services:', data);
        setServices(data);
      })
      .catch((error) => console.error('Error fetching services:', error));
  }, []);

  return (
    <div>
      {/* Banner Layout */}
      <div className="flex flex-col md:flex-row items-center justify-between rounded-xl shadow-lg p-4 md:p-8 my-8 gap-4">
        {/* Left image */}
        <img
          src="https://i.ibb.co/mryByQXM/Homecare-logo.png"
          alt="Homecare Logo"
          className="w-40 md:w-56"
        />

        {/* Center text */}
        <div className="text-center flex-1">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
            Trusted Home Repair Services
          </h2>
          <p className="text-sm md:text-base mt-2 text-gray-600">
            Skilled professionals for every home maintenance need.
          </p>
        </div>

        {/* Right image */}
        <img
          src="https://i.ibb.co/N62g9PLt/home-repairs-tools.webp"
          alt="Repair Tools"
          className="w-40 md:w-56"
        />
      </div>

      <HotServices services={services} />
    </div>
  );
};

export default AllServices;

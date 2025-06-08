import React, { useEffect, useState } from 'react';
import HotServices from '../Home/HotServices';

const AllServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/services')
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched All Services:", data);
        setServices(data); 
      })
      .catch((error) => console.error("Error fetching services:", error));
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold text-center my-5">All Services</h2>
      <HotServices services={services} />
    </div>
  );
};

export default AllServices;
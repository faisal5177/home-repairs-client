import React, { useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import { useState } from 'react';
import { RiDeleteBinLine } from 'react-icons/ri';

const MyApplications = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/service-application?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, [user.email]);

  const handleDelete = (serviceId) => {
    fetch(`http://localhost:3000/service-application/${serviceId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(() => {
        setServices(services.filter((service) => service._id !== serviceId));
      })
      .catch((error) => console.error('Error deleting service:', error));
  };

  return (
    <div className="my-5 border rounded-lg shedo-2xl">
      <h2 className='text-xl font-bold my-5'>My Service Bookings: {services.length}</h2>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>Name</th>
              <th>Services Name</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={service.providerImage} alt="" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{service.providerName}</div>
                      <div className="text-sm opacity-50">
                        {service.serviceArea}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  {service.serviceName}
                  <br />
                  <span>
                    {new Date(service.createdAt).toLocaleDateString()}
                  </span>
                </td>
                <td>{service.price}</td>
                <th>
                  <button
                    className="btn btn-ghost btn-xs"
                    onClick={() => handleDelete(service._id)} 
                  >
                    <RiDeleteBinLine className="text-red-600" />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyApplications;

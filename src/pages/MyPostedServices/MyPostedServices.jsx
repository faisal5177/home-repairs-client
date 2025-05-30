import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const MyPostedServices = () => {
  const [services, setServices] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/services?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setServices(data));
    }
  }, [user?.email]);

  return (
    <div className="my-5 border rounded-lg shadow-2xl p-6">
      <h2 className="text-3xl">My Posted Services: {services.length}</h2>
      <div className="overflow-x-auto mt-4">
        <table className="table">
          {/* Head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Service Name</th>
              <th>Booking Date and time</th>
              <th>Price</th>
              <th>Status</th>
              <th>Application Count</th>
            </tr>
          </thead>

          <tbody>
            {services.map((service, index) => (
              <tr key={service._id || index} className="bg-base-200">
                <th>{index + 1}</th>
                <td>{service.serviceName}</td>
                <td>{service.createdAt}</td>
                <td>${service.price}</td>
                <td>{service.status || 'Pending'}</td>
                <td>${service.applicationCount}</td>
                <td>
                  <Link to={`/viewApplications/${service._id}`}>
                    <button className="hover:text-blue-700 text-sm">
                      View Application
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyPostedServices;

import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';

const ViewApplications = () => {
  const { user } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/service-application?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setServices(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load bookings', err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(
        `http://localhost:3000/service-application/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) throw new Error(await res.text());

      const updated = services.map((service) =>
        service._id === id ? { ...service, status: newStatus } : service
      );
      setServices(updated);

      Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: `Status updated to "${newStatus}"`,
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: err.message,
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center text-lg">Loading booked services...</div>
    );
  }

  return (
    <div className="my-5 border rounded-lg shadow-xl p-6">
      <h2 className="text-3xl mb-4">Booked Services ({services.length})</h2>

      {services.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No one has booked your services yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Service Name</th>
                <th>Booked By</th>
                <th>Booking Date</th>
                <th>Location</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service._id}>
                  <td>{index + 1}</td>
                  <td>{service.serviceName}</td>
                  <td>{service.applicant_email}</td>
                  <td>{new Date(service.createdAt).toLocaleDateString()}</td>
                  <td>{service.location}</td>
                  <td>${service.price}</td>
                  <td>
                    <select
                      onChange={(e) =>
                        handleStatusChange(service._id, e.target.value)
                      }
                      value={service.status || 'Pending'}
                      className="select select-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Working">Working</option>
                      <option value="Complete">Complete</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ViewApplications;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const MyPostedServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/services?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setServices(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to fetch services:', err);
          setLoading(false);
        });
    }
  }, [user?.email]);

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      fetch(`http://localhost:3000/services/${id}`, {
        method: 'DELETE',
      })
        .then(async (res) => {
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(errorText || 'Failed to delete service');
          }
          return res.json();
        })
        .then(() => {
          setServices((prev) => prev.filter((service) => service._id !== id));
          Swal.fire('Deleted!', 'Your service has been deleted.', 'success');
        })
        .catch((err) => {
          console.error('Delete failed:', err);
          Swal.fire('Error', 'Something went wrong!', 'error');
        });
    }
  };

  return (
    <div className="my-5 border rounded-lg shadow-2xl p-6">
      <h2 className="text-3xl mb-4">Manage My Services ({services.length})</h2>

      {loading ? (
        <p className="text-center text-gray-500 text-lg">Loading...</p>
      ) : services.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven’t added any services yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Service Name</th>
                <th>Booking Date</th>
                <th>Price</th>
                <th>Location</th>
                <th>Applications</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service._id}>
                  <td>{index + 1}</td>
                  <td>{service.serviceName || 'N/A'}</td>
                  <td>
                    {service.createdAt
                      ? new Date(service.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td>${service.price ?? 'N/A'}</td>
                  <td>{service.serviceArea || 'N/A'}</td>
                  <td>{service.applicationCount ?? 0}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/editService/${service._id}`}
                      className="btn btn-sm btn-warning"
                    >
                      Update
                    </Link>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDelete(service._id)}
                    >
                      Delete
                    </button>
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

export default MyPostedServices;

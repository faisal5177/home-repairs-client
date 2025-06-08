import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';

const MyPostedServices = () => {
  const [services, setServices] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/services?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setServices(data))
        .catch((err) => console.error('Failed to fetch services:', err));
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
          setServices(services.filter((service) => service._id !== id));
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
      {services.length === 0 ? (
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
                  <td>{service.serviceName}</td>
                  <td>{new Date(service.createdAt).toLocaleDateString()}</td>
                  <td>${service.price}</td>
                  <td>{service.serviceArea}</td>
                  <td>{service.applicationCount}</td>
                  <td className="flex gap-2">
                    <Link
                      to={`/editService/${service._id}`}
                      className="btn btn-sm btn-warning"
                    >
                      Edit
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

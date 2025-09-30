import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { RiDeleteBinLine } from 'react-icons/ri';
import axios from 'axios';
import Swal from 'sweetalert2';

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:3000/service-application?email=${user.email}`, {
        withCredentials: true,
      })
      .then((res) => {
        setApplications(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, [user?.email]);

  const handleDelete = async (applicationId) => {
    if (!applicationId) {
      console.error('Invalid application ID:', applicationId);
      Swal.fire({
        icon: 'error',
        title: 'Invalid ID',
        text: 'Application ID is missing!',
      });
      return;
    }

    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this application.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(
        `http://localhost:3000/service-application/${applicationId}`,
        {
          method: 'DELETE',
          credentials: 'include',
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Failed to delete the application');
      }

      setApplications((prev) =>
        prev.filter((app) => app._id !== applicationId)
      );

      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Your application has been removed.',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Delete error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to delete application',
      });
    }
  };

  if (loading) {
    return (
      <div className="text-center text-lg">Loading your applications...</div>
    );
  }

  return (
    <div className="my-5 border rounded-lg shadow-xl p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Applied Services ({applications.length})
      </h2>

      {applications.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          You haven’t applied for any services yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Provider</th>
                <th>Service Name</th>
                <th>Service Date</th>
                <th>Location</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app, index) => (
                <tr key={app._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={app.providerImage || '/default-avatar.png'}
                            alt="Provider"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {app.providerName || 'N/A'}
                        </div>
                        <div className="text-sm opacity-50">
                          {app.serviceArea || 'N/A'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{app.serviceName || 'N/A'}</td>
                  <td>
                    {app.serviceDate
                      ? new Date(app.serviceDate).toLocaleDateString()
                      : 'N/A'}
                  </td>
                  <td>{app.location || 'N/A'}</td>
                  <td>{app.status || 'Pending'}</td>
                  <td className="flex items-center mt-3 gap-2">
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleDelete(app._id)}
                      title="Delete Application"
                    >
                      <RiDeleteBinLine className="text-red-600 w-5 h-5" />
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

export default MyApplications;

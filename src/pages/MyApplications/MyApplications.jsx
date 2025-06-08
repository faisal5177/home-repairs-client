import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { RiDeleteBinLine } from 'react-icons/ri';
import { MdSystemUpdateAlt } from 'react-icons/md';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyApplications = () => {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/service-application?email=${user.email}`
        );
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching applications:', error);
        setLoading(false);
      }
    };

    if (user?.email) {
      fetchApplications();
    }
  }, [user?.email]);

  const handleDelete = async (applicationId) => {
    try {
      const res = await fetch(
        `http://localhost:3000/service-application/${applicationId}`,
        { method: 'DELETE' }
      );

      if (!res.ok) throw new Error('Failed to delete the application');

      setApplications((prev) =>
        prev.filter((app) => app._id !== applicationId)
      );
    } catch (error) {
      console.error('Delete error:', error);
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
        My Applied Services ({applications.length})
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
                          <img src={app.providerImage} alt="Provider" />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{app.providerName}</div>
                        <div className="text-sm opacity-50">
                          {app.serviceArea}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>{app.serviceName}</td>
                  <td>{new Date(app.serviceDate).toLocaleDateString()}</td>
                  <td>{app.location}</td>
                  <td>{app.status || 'Pending'}</td>
                  <td className="flex items-center gap-2">
                    <button
                      className="btn btn-ghost btn-xs"
                      onClick={() => handleDelete(app._id)}
                      title="Delete Application"
                    >
                      <RiDeleteBinLine className="text-red-600" />
                    </button>
                    <Link
                      to={`/viewApplications/${app._id}`}
                      className="btn btn-ghost btn-xs"
                      title="View/Edit Application"
                    >
                      <MdSystemUpdateAlt className="text-blue-700" />
                    </Link>
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

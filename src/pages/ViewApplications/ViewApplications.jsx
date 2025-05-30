import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const ViewApplications = () => {
  const applications = useLoaderData();
  const [appList, setAppList] = useState(applications);

  const handleStatusUpdate = (id, newStatus) => {
    fetch(`http://localhost:3000/service-application/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text(); // Read raw HTML or error
          throw new Error(`Server responded with ${res.status}: ${errorText}`);
        }
        return res.json();
      })
      .then(() => {
        const updated = appList.map((app) =>
          app._id === id ? { ...app, status: newStatus } : app
        );
        setAppList(updated);

        // Show success alert here
        Swal.fire({
          icon: 'success',
          title: 'Status Updated',
          text: `The application status has been updated to "${newStatus}".`,
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        console.error('Status update error:', err);
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: err.message,
        });
      });
  };

  return (
    <div>
      <h2 className="text-3xl mb-4">
        Bookings for this service: {appList.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Applicant Email</th>
              <th>Location</th>
              <th>Service Date</th>
              <th>Status</th>
              <th>Update Status</th>
            </tr>
          </thead>
          <tbody>
            {appList.map((app) => (
              <tr key={app._id}>
                <td>{app.applicant_email}</td>
                <td>{app.location}</td>
                <td>{new Date(app.serviceDate).toLocaleDateString()}</td>
                <td>{app.status || 'Pending'}</td>
                <td>
                  <select
                    onChange={(e) =>
                      handleStatusUpdate(app._id, e.target.value)
                    }
                    defaultValue={app.status || 'default'}
                    className="select select-sm"
                  >
                    <option disabled value="default">
                      Change Status
                    </option>
                    <option value="Pending">Pending</option>
                    <option value="Working">Working</option>
                    <option value="Complete">Complet</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;

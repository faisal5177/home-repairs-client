import React from 'react';
import { useLoaderData } from 'react-router-dom';

const ViewApplications = () => {
  const applications = useLoaderData();

  return (
    <div>
      <h2 className="text-3xl mb-4">
        Bookings for this service: {applications.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Applicant Email</th>
              <th>LinkedIn</th>
              <th>GitHub</th>
              <th>Location</th>
              <th>Service Date</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app._id}>
                <td>{app.applicant_email}</td>
                <td><a href={app.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a></td>
                <td><a href={app.github} target="_blank" rel="noopener noreferrer">GitHub</a></td>
                <td>{app.location}</td>
                <td>{new Date(app.serviceDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewApplications;

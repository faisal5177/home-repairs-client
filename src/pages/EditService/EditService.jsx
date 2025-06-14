import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const EditService = () => {
  const [service, setService] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  // Fetch existing service data
  useEffect(() => {
    fetch(`http://localhost:3000/services/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch service');
        return res.json();
      })
      .then((data) => setService(data))
      .catch((err) => {
        console.error('Error fetching service:', err);
        Swal.fire('Error', 'Failed to load service data', 'error');
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/services/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          serviceArea: service.serviceArea,
          applicationDate: service.applicationDate, // Correct key here
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update service');
      }

      Swal.fire('Updated!', 'Your service has been updated.', 'success');
      navigate('/myPostedServices');
    } catch (error) {
      console.error('Update failed:', error);
      Swal.fire('Error', 'Something went wrong!', 'error');
    }
  };

  if (!service) {
    return <p>Loading service...</p>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Edit Your Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Location</label>
          <input
            type="text"
            name="serviceArea"
            value={service.serviceArea || ''}
            onChange={handleChange}
            className="w-full input input-bordered"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Booking Date</label>
          <input
            type="date"
            name="applicationDate"
            value={service.applicationDate?.slice(0, 10) || ''}
            onChange={handleChange}
            className="w-full input input-bordered"
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Update Service
        </button>
      </form>
    </div>
  );
};

export default EditService;

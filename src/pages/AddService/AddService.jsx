import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';

const AddService = ({ setServices }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleAddService = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const initialData = Object.fromEntries(formData.entries());

    if (isNaN(initialData.price) || parseFloat(initialData.price) <= 0) {
      setLoading(false);
      return Swal.fire('Error', 'Price must be a positive number', 'error');
    }

    const newService = {
      imageURL:
        initialData.service_image ||
        user?.photoURL ||
        'https://placehold.co/150',
      serviceName: initialData.service_name,
      price: parseFloat(initialData.price),
      serviceArea: initialData.location,
      description: initialData.description,
      providerName: user?.displayName || 'Unknown',
      providerEmail: user?.email || 'Not Available',
      providerImage:
        user?.photoURL || 'https://i.ibb.co/2FsfXqM/default-avatar.png',
      createdBy: user?.uid || 'N/A',
    };

    console.log('Service to be added:', newService);

    try {
      const response = await fetch(`http://localhost:3000/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok && data.serviceId) {
        Swal.fire('Success', 'Service has been added successfully!', 'success');
        e.target.reset();

        if (setServices) {
          setServices((prev) => [
            ...prev,
            { ...newService, _id: data.serviceId },
          ]);
        }

        navigate('/myPostedServices');
      } else {
        Swal.fire('Error', data?.error || 'Failed to add service!', 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      setLoading(false);
      Swal.fire('Error', err.message || 'Something went wrong!', 'error');
    }
  };

  return (
    <div className="mx-auto px-10 w-full border-2 border-gray-300 rounded-lg shadow-lg my-10">
      <h2 className="text-2xl font-bold text-center mt-5">Add a New Service</h2>

      <div className="text-center my-4">
        <h3 className="text-lg font-semibold">Service Provider</h3>
        <img
          src={user?.photoURL || 'https://i.ibb.co/2FsfXqM/default-avatar.png'}
          alt="Image"
          width="50"
          className="mx-auto rounded-full"
        />
        <p>
          <strong>Name:</strong> {user?.displayName || 'Unknown'}
        </p>
        <p>
          <strong>Email:</strong> {user?.email || 'Not Available'}
        </p>
      </div>

      <form onSubmit={handleAddService} className="card-body">
        <div className="form-control">
          <label className="label">Service Image URL</label>
          <input
            type="text"
            name="service_image"
            className="w-full input input-bordered"
          />
        </div>

        <div className="form-control">
          <label className="label">Service Name</label>
          <input
            type="text"
            name="service_name"
            className="w-full input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">Price</label>
          <input
            type="number"
            name="price"
            className="w-full input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">Service Location</label>
          <input
            type="text"
            name="location"
            className="w-full input input-bordered"
            required
          />
        </div>

        <div className="form-control">
          <label className="label">Description</label>
          <textarea
            name="description"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        <div className="form-control mt-6">
          <button
            type="submit"
            className="btn btn-primary w-full font-bold"
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add Service'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddService;

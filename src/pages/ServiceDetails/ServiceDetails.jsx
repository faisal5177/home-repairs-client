import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { LiaMapMarkerAltSolid } from 'react-icons/lia';

const ServiceDetails = () => {
  const {
    serviceName,
    _id,
    imageURL,
    price,
    serviceArea,
    providerName,
    providerImage,
    description,
  } = useLoaderData();

  return (
    <div className="max-w-md mx-auto mt-10 shadow-lg rounded-lg overflow-hidden bg-white">
      <img
        className="w-full h-64 object-cover"
        src={imageURL}
        alt={serviceName}
      />
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-semibold text-gray-800">{serviceName}</h2>
          <span className="text-xl font-medium text-green-700">${price}</span>
        </div>

        <div className="flex items-center text-gray-500 mb-4">
          <LiaMapMarkerAltSolid className="mr-2 text-xl text-red-500" />
          <span>{serviceArea}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4">{description}</p>

        <div className="flex items-center mt-6">
          <img
            className="w-12 h-12 rounded-full object-cover mr-4"
            src={providerImage}
            alt={providerName}
          />
          <div>
            <p className="text-sm font-medium text-gray-700">{providerName}</p>
            <p className="text-xs text-gray-500">Service Provider</p>
          </div>
        </div>

        <div className="mt-6">
          <Link to={`/serviceApply/${_id}`}>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
            Book Now
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;

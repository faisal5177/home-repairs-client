import { TbCurrencyTaka } from 'react-icons/tb';
import { Link } from 'react-router-dom';

const HotServicesCard = ({ service }) => {
  const {
    _id,
    serviceName,
    imageURL,
    price,
    providerImage,
    description,
    providerName,
  } = service;

  return (
    <div className="border rounded-xl shadow-md bg-white hover:shadow-lg transition duration-300">
      <img
        className="rounded-t-xl w-full h-48 object-cover"
        src={imageURL}
        alt={serviceName}
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{serviceName}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-3">{description}</p>
        <div className="flex items-center gap-3 mb-4">
          <img
            src={providerImage || '/fallback-avatar.png'}
            alt={providerName}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/fallback-avatar.png';
            }}
            className="w-10 h-10 rounded-full object-cover"
          />
          <p className="font-medium">{providerName}</p>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center text-xl font-bold text-green-600">
            <span>{price}</span>
            <TbCurrencyTaka className="ml-1" />
          </div>
          <Link to={`/services/${_id}`}>
            <button className="btn btn-primary btn-sm">View Detail</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HotServicesCard;

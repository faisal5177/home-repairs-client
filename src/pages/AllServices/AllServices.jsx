import React, { useEffect, useState } from 'react';
import HotServices from '../Home/HotServices';
import { FaAngleRight, FaAngleLeft } from 'react-icons/fa6';

const AllServices = () => {
  const [sort, setSort] = useState(false);
  const itemsPerPage = 6;

  const [currentPage, setCurrentPage] = useState(1);
  const [services, setServices] = useState([]);
  const [pageCount, setPageCount] = useState(0);

  // ✅ Fetch services for current page and sort
  useEffect(() => {
    fetch(
      `http://localhost:3000/services?page=${currentPage}&limit=${itemsPerPage}&sort=${sort}`
    )
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, [currentPage, sort]);

  // ✅ Fetch total count of services ONCE and when itemsPerPage changes
  useEffect(() => {
    fetch('http://localhost:3000/services-count')
      .then((res) => res.json())
      .then((data) => {
        const total = data.count;
        const pages = Math.ceil(total / itemsPerPage);
        setPageCount(pages);
      });
  }, [itemsPerPage]);

  // ✅ Reset to page 1 whenever sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [sort]);

  // Pagination buttons array
  const pages = [...Array(pageCount).keys()].map((i) => i + 1);

  return (
    <div>
      {/* Banner */}
      <div className="flex flex-col md:flex-row items-center justify-between rounded-xl shadow-lg p-4 md:p-8 my-8 gap-4">
        <img
          src="https://i.ibb.co/mryByQXM/Homecare-logo.png"
          alt="Homecare Logo"
          className="w-40 md:w-56"
        />

        <div className="text-center flex-1">
          <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
            Trusted Home Repair Services
          </h2>
          <p className="text-sm md:text-base mt-2 text-gray-600">
            Skilled professionals for every home maintenance need.
          </p>
        </div>

        <img
          src="https://i.ibb.co/N62g9PLt/home-repairs-tools.webp"
          alt="Repair Tools"
          className="w-40 md:w-56"
        />
      </div>

      {/* Sort Button */}
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setSort(!sort)}
          className={`font-bold btn btn-neutral ${sort && 'btn-success'}`}
        >
          {sort ? 'Sorted By Price (Low to High)' : 'Sort By Price'}
        </button>
      </div>

      {/* Services List */}
      <HotServices services={services} />

      {/* Pagination */}
      <div className="flex justify-center gap-2 my-6 items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          <FaAngleLeft />
        </button>

        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-4 py-2 border rounded ${
              page === currentPage
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-200'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, pageCount))
          }
          disabled={currentPage === pageCount}
          className="px-3 py-2 border rounded hover:bg-gray-100 disabled:opacity-50"
        >
          <FaAngleRight />
        </button>
      </div>
    </div>
  );
};

export default AllServices;

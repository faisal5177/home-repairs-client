import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useAuth from './../../hooks/useAuth';

const ServiceApply = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [startDate, setStartDate] = useState(null);

  const submitServiceApplication = (e) => {
    e.preventDefault();
    const form = e.target;
    const linkedIn = form.linkedIn.value;
    const github = form.github.value;
    const location = form.location.value;

    const serviceApplication = {
      service_id: id,
      applicant_email: user.email,
      linkedIn,
      github,
      serviceDate: startDate,
      location,
      status: 'Pending',
    };

    fetch('http://localhost:3000/service-applications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(serviceApplication),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId || data.success) {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your application has been submitted!',
            showConfirmButton: false,
            timer: 1500,
          });
          navigate('/allServices');
        }
      });
  };

  return (
    <div className="card bg-base-100 w-full shadow-2xl p-6 mt-10 border rounded-lg mx-auto text-center mb-5">
      <h1 className="text-3xl font-bold text-center mb-6">
        Book Service and Good Luck!
      </h1>
      <form onSubmit={submitServiceApplication} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">LinkedIn URL</span>
          </label>
          <input
            type="url"
            name="linkedIn"
            placeholder="LinkedIn URL"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Github URL</span>
          </label>
          <input
            type="url"
            name="github"
            placeholder="Github URL"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            type="text"
            name="location"
            placeholder="Enter your location"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Service Date</span>
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="input input-bordered w-full"
            placeholderText="Select service date"
            popperPlacement="right-start"
            popperModifiers={[
              {
                name: 'offset',
                options: {
                  offset: [0, 10],
                },
              },
            ]}
            required
          />
        </div>

        <div className="form-control mt-6">
          <button className="btn w-1/3 btn-primary">Book</button>
        </div>
      </form>
    </div>
  );
};

export default ServiceApply;

import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import SocialLogin from '../shared/SocialLogin';
import Lottie from 'lottie-react';
import signInLottieData from '../../assets/lottie/signIn.json';

const SignIn = () => {
  const { signInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSignIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    const passwordValidationRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!passwordValidationRegex.test(password)) {
      alert(
        'Password must be at least 8 characters long, include one uppercase letter and one number.'
      );
      return;
    }

    signInUser(email, password)
      .then((result) => {
        console.log('Sign in successful:', result.user.email);
        navigate(from, { replace: true });
      })
      .catch((error) => {
        console.error('Sign in failed:', error.message);
        alert('Sign in failed: ' + error.message);
      });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left w-96">
          <Lottie animationData={signInLottieData} />
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-5xl font-bold ml-8 mt-4">Login now!</h1>
          <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6 w-full">
              <button className="btn btn-primary w-full">Login</button>
            </div>

            <SocialLogin />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

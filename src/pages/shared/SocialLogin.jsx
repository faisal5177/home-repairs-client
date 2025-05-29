import React, { useContext } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useNavigate } from 'react-router-dom'; 
import AuthContext from '../../context/AuthContext';


const SocialLogin = () => {
  const { signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log(result.user);
        navigate('/'); 
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
      <div className="divider">OR</div>
      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline w-full flex items-center gap-2 justify-center"
      >
        <FcGoogle className="text-2xl" /> Continue with Google
      </button>
    </div>
  );
};

export default SocialLogin;

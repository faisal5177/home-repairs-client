import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { easeOut } from 'framer-motion';
import { Link } from 'react-router-dom';

const leftImages = [
  'https://i.ibb.co/d4GySw33/room-cleaning.jpg',
  'https://i.ibb.co/Pv4QDnCY/banner-img-1.webp',
  'https://i.ibb.co/6S62n9w/banner-img-2.jpg',
  'https://i.ibb.co/1GgFdfht/banner-img-3.jpg',
];

const rightImages = [
  'https://i.ibb.co/BW3rqLL/electrician-home.jpg',
  'https://i.ibb.co/HpzLYM8z/banner-img-4.jpg',
  'https://i.ibb.co/20z1q5w9/banner-img-5.jpg',
  'https://i.ibb.co/vxcGxL4D/banner-img-6.webp',
];

const Banner = ({ user }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % leftImages.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero bg-base-200 min-m-screen border rounded-lg shadow-2xl mb-5">
      <div className="hero-content ml-10 flex-col -mt-[120px] py-16 lg:flex-row-reverse">
        {/* Images */}
        <div className="flex-1 flex-col-reverse min-h-[350px] flex">
          <motion.img
            key={leftImages[currentIndex]}
            animate={{ y: [50, 0, 50] }}
            transition={{ duration: 10, repeat: Infinity }}
            src={leftImages[currentIndex]}
            className="w-[230px] h-auto object-cover rounded-t-[40px] rounded-br-[40px] border-l-8 border-b-8 border-sky-500 -mt-10 rounded-3xl rounded-bl-none shadow-2xl"
            alt="Cleaning Service"
          />
          <motion.img
            key={rightImages[currentIndex]}
            animate={{ x: [-100, -150, -100] }}
            transition={{ duration: 10, repeat: Infinity }}
            src={rightImages[currentIndex]}
            className="w-[230px] h-auto object-cover rounded-t-[40px] rounded-br-[40px] border-l-8 border-b-8 border-sky-500 -mt-20 rounded-3xl ml-[250px] right-24 rounded-bl-none shadow-2xl"
            alt="Electrician Service"
          />
        </div>

        {/* Text */}
        <div className="flex-1 mr-10">
          <motion.h1
            animate={{ x: 50 }}
            transition={{
              duration: 2,
              delay: 1,
              ease: easeOut,
              repeat: Infinity,
            }}
            className="text-5xl font-bold mt-20"
          >
            Most Used{' '}
            <motion.span
              animate={{ color: ['#ecf94a', '#34f0bd', '#f05834'] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Services
            </motion.span>
          </motion.h1>
          <p className="py-6 text-sm">
            <span className="font-bold text-xl mr-1 text-green-400">
              Cleaning services
            </span>{' '}
            help maintain hygiene in homes and offices.
            <br />
            <span className="font-bold mr-1 text-xl text-red-400">
              Electrician services
            </span>{' '}
            are essential for resolving electrical issues.
          </p>
          {user && (
            <Link to="/allServices">
              <button className="btn btn-primary">All Services</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;

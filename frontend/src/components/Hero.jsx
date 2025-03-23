// import { Link } from "react-router-dom";


// const Hero = () => {
//   return (
//     <section className="section">
//       <div className="container mx-auto text-center">
//         <h2 className="text-5xl font-extrabold mb-4">Reserve Your Ride in Seconds</h2>
//         <p className="text-lg mb-6">Fast, safe, and reliable vehicle reservation at your fingertips.</p>
//         <Link to={'/help'} className="mt-2 bg-black-primary text-white py-4 px-6 rounded-full hover:text-black hover:bg-yellow-dark hover:border-2 transition-colors">Get Started</Link>
//       </div>
//     </section>
//   );
// };

// export default Hero



import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section
      className="section bg-cover bg-center relative"
      style={{
        backgroundImage: "url('src/assets/bg-hero2.jpg')", // Add the URL of your background image here
      }}
    >
      <div className="absolute inset-0 bg-black opacity-70"></div> {/* Optional: dark overlay */}
      <div className="container mx-auto text-center relative z-10 px-4 sm:px-8">
        <h2 className="text-5xl font-extrabold text-white mb-4">
          Reserve Your Ride in Seconds
        </h2>
        <p className="text-lg text-white mb-6">
          Fast, safe, and reliable vehicle reservation at your fingertips.
        </p>
        <Link
          to={'/help'}
          className="mt-2 bg-yellow-600 text-white py-4 px-8 rounded-full shadow-lg hover:bg-yellow-500 hover:scale-105 transform transition duration-300 ease-in-out"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
};

export default Hero;


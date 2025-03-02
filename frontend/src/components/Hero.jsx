import { Link } from "react-router-dom";


const Hero = () => {
  return (
    <section className="section">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-extrabold mb-4">Reserve Your Ride in Seconds</h2>
        <p className="text-lg mb-6">Fast, safe, and reliable vehicle reservation at your fingertips.</p>
        <Link to={'/help'} className="mt-2 bg-black-primary text-white py-4 px-6 rounded-full hover:text-black hover:bg-yellow-dark hover:border-2 transition-colors">Get Started</Link>
      </div>
    </section>
  );
};

export default Hero

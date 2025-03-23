// import { Link } from 'react-router-dom'

// const Dashboard = () => {
//   return (
//     <div className="main-div">
//       <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg w-96">
//         <h2 className="text-2xl m-4 font-bold text-center text-yellow-500">
//           Dashboard
//         </h2>
//         <Link to="/booking" className='flex justify-center m-4 text-yellow-50 border-yellow-600 font-semibold rounded-full p-3 bg-yellow-400 hover:bg-yellow-500'>New Booking</Link>

//         <Link to="/customer/bookings" className='flex justify-center m-4 text-yellow-50 border-yellow-600 font-semibold rounded-full p-3 bg-yellow-400 hover:bg-yellow-500'>My Bookings</Link>
        
//       </div>
//     </div>
//   );
// };

// export default Dashboard;






import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center bg-cover bg-center" style={{ backgroundImage: 'url(src/assets/bg.jpg)' }}>
      <div className="min-h-screen max-w6xl w-full bg-black/85 shadow-2xl p-8 space-y-6 flex flex-col sm:flex-row justify-between items-center">

      <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6">Welecome ..Start Your journey...</h2>
          
        <div className="flex flex-col items-center w-full sm:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-center text-yellow-500 mb-6">
            New journey...
          </h2>

          <Link
            to="/booking"
            className="transition-all duration-300 transform hover:scale-105 bg-yellow-400 text-white text-lg font-semibold rounded-full py-4 px-8 shadow-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 w-full sm:w-auto"
          >
            New Booking
          </Link>
        </div>

        <div className="flex flex-col items-center w-full sm:w-1/2 space-y-6">
          <h2 className="text-3xl font-bold text-center text-yellow-600 mb-6">
            My Bookings...
          </h2>

          <Link
            to="/customer/bookings"
            className="transition-all duration-300 transform hover:scale-105 bg-yellow-400 text-white text-lg font-semibold rounded-full py-4 px-8 shadow-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-opacity-50 w-full sm:w-auto"
          >
            My Bookings
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;




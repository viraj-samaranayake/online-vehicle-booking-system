import { useState, useEffect } from 'react';
import { FaRegIdCard, FaUsers } from 'react-icons/fa';
import { GoSearch } from 'react-icons/go';
import { IoMdAdd } from 'react-icons/io';
import { MdBookmark } from 'react-icons/md';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [vehicleStats, setVehicleStats] = useState({
    totalCount: 0,
    availableCount: 0,
    busyCount: 0,
    vehicleTypeStats: {
      car: { available: 0, busy: 0, total: 0 },
      suv: { available: 0, busy: 0, total: 0 },
      miniCar: { available: 0, busy: 0, total: 0 },
    },
  });


  const [driverCount, setDriverCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [newBookings, setNewBookings] = useState([]);  // State for new bookings
  const [completedBookings, setCompletedBookings] = useState([]);

  useEffect(() => {
    const fetchVehicleStats = async () => {
      try {
        const vehicleResponse = await fetch('http://localhost:8081/admin/cars');
        const vehicleData = await vehicleResponse.json();
        const totalCount = vehicleData.length;
        const availableCount = vehicleData.filter(vehicle => vehicle.status === true).length;
        const busyCount = vehicleData.filter(vehicle => vehicle.status === false).length;

        const vehicleTypeStats = {
          car: { available: 0, busy: 0, total: 0 },
          suv: { available: 0, busy: 0, total: 0 },
          miniCar: { available: 0, busy: 0, total: 0 },
        };

        vehicleData.forEach(vehicle => {
          if (vehicle.vehicleType === 'Car') vehicleTypeStats.car.total++;
          if (vehicle.vehicleType === 'SUV') vehicleTypeStats.suv.total++;
          if (vehicle.vehicleType === 'Mini Car') vehicleTypeStats.miniCar.total++;

          if (vehicle.status === true) {
            if (vehicle.vehicleType === 'Car') vehicleTypeStats.car.available++;
            if (vehicle.vehicleType === 'SUV') vehicleTypeStats.suv.available++;
            if (vehicle.vehicleType === 'Mini Car') vehicleTypeStats.miniCar.available++;
          } else if (vehicle.status === false) {
            if (vehicle.vehicleType === 'Car') vehicleTypeStats.car.busy++;
            if (vehicle.vehicleType === 'SUV') vehicleTypeStats.suv.busy++;
            if (vehicle.vehicleType === 'Mini Car') vehicleTypeStats.miniCar.busy++;
          }
        });

        setVehicleStats({
          totalCount,
          availableCount,
          busyCount,
          vehicleTypeStats,
        });
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    };

    const fetchDriverCount = async () => {
      try {
        const driverResponse = await fetch('http://localhost:8081/admin/drivers');
        const driverData = await driverResponse.json();
        setDriverCount(driverData.length);
      } catch (error) {
        console.error('Error fetching driver data:', error);
      }
    };

    const fetchCustomerCount = async () => {
      try {
        const customerResponse = await fetch('http://localhost:8081/customers');
        const customerData = await customerResponse.json();
        setCustomerCount(customerData.length);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    const fetchBookingCount = async () => {

      try {
        const bookingResponse = await fetch('http://localhost:8081/bookings');
        const bookingData = await bookingResponse.json();
    
        // Sort the bookingData to ensure the latest bookings come first
        const sortedBookings = bookingData.sort((a, b) => new Date(b.createdDateTime) - new Date(a.createdDateTime));
        
        setBookingCount(sortedBookings.length);
    
        // Filter bookings where bookingStatus is false (new bookings)
        const newBookings = sortedBookings.filter(booking => booking.bookingStatus === false);
        setNewBookings(newBookings);
    
        // Filter bookings where bookingStatus is true (completed bookings)
        const completedBookings = sortedBookings.filter(booking => booking.bookingStatus === true);
        setCompletedBookings(completedBookings);
    
      } catch (error) {
        console.error('Error fetching Booking data', error);
      }
    }

    fetchVehicleStats();
    fetchDriverCount();
    fetchCustomerCount();
    fetchBookingCount();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 mt-24 px-4">
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6">
        <h2 className="text-3xl py-4 font-semibold text-center text-yellow-800">
          Admin Dashboard
        </h2>

        {/* Vehicle Stats Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl text-yellow-700">Total Vehicles</h3>
            <p className="text-3xl font-bold text-yellow-800">{vehicleStats.totalCount}</p>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg border border-green-300 shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl text-yellow-700"><span className='inline-block w-4 h-4 rounded-full mr-2 bg-green-500'></span>Available Vehicles</h3>
            <p className="text-3xl font-bold text-yellow-800">{vehicleStats.availableCount}</p>
          </div>

          <div className="p-6 bg-gray-100 rounded-lg border border-red-300 shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl text-yellow-700"><span className='inline-block w-4 h-4 rounded-full mr-2 bg-red-500'></span>Busy Vehicles</h3>
            <p className="text-3xl font-bold text-yellow-800">{vehicleStats.busyCount}</p>
          </div>

            {/* new card */}
          <div className={` ${newBookings.length > 0 ? 'animate-bounce border-blue-500':''} p-6 bg-blue-50 rounded-lg border shadow-md hover:shadow-xl transition duration-300 hover:text-blue-500`}>
            <h3 className="text-xl text-yellow-700"><span className='inline-block w-4 h-4 rounded-full mr-2 bg-blue-500'></span>New Received Bookings</h3>
            <p className="text-3xl font-bold text-yellow-800">{newBookings.length}</p>
          </div>


        </div>

        {/* Vehicle Type Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {['car', 'suv', 'miniCar'].map((type) => (
            <div key={type} className="p-6 bg-yellow-50 rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h4 className="text-xl font-semibold text-yellow-700 capitalize">{type.toLocaleUpperCase()}</h4>
              <p className='text-gray-600'>Total: {vehicleStats.vehicleTypeStats[type].total}</p>
              <p className='text-gray-600'>Available: {vehicleStats.vehicleTypeStats[type].available}</p>
              <p className='text-gray-600'>Busy: {vehicleStats.vehicleTypeStats[type].busy}</p>
            </div>
          ))}
        </div>

        {/* Driver and Customer Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

          <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl text-yellow-700">Total Drivers<FaRegIdCard /></h3>
            <p className="text-3xl font-bold text-yellow-800">{driverCount}</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl text-yellow-700">Total Customers<FaUsers /></h3>
            <p className="text-3xl font-bold text-yellow-800">{customerCount}</p>
          </div>

          <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition duration-300">
            <h3 className="text-xl text-yellow-700">Total Completed Bookings<MdBookmark /></h3>
            <p className="text-3xl font-bold text-yellow-800">{completedBookings.length}</p>
          </div>
        </div>




          {/* New Received Bookings Section */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <h3 className="text-xl text-yellow-700 mb-4">New Received Bookings</h3>
          <ul className="space-y-4">
            {newBookings.length > 0 ? (
              newBookings.map((booking) => (
                <li key={booking._id} className="border-b pb-2">
                  <p className="font-semibold">{booking.customerName}</p>
                  <p>{booking.startLocation} to {booking.destination}</p>
                  <p className="text-sm text-gray-500">Created on: {new Date(booking.createdDateTime).toLocaleString()}<Link to={`/admin/bookings/${booking.id}`} className='font-bold text-blue-500 px-3 py-2 mx-2 border border-blue-400 rounded-full hover:bg-blue-100 transition-colors'>View</Link></p>
                </li>
              ))
            ) : (
              <p className='text-gray-600'>No new bookings</p>
            )}
          </ul>
        </div>




        {/* Action Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">

          <Link to="/admin/drivers/add" className="admin-dashborad-link">
            <IoMdAdd />&nbsp;Add Drivers
          </Link>
          <Link to="/admin/drivers" className="admin-dashborad-link">
            <GoSearch />&nbsp;View Drivers
          </Link>
          <Link to="/admin/cars/add" className="admin-dashborad-link">
            <IoMdAdd />&nbsp;Add Vehicles
          </Link>
          <Link to="/admin/cars" className="admin-dashborad-link">
            <GoSearch />&nbsp;View Vehicles
          </Link>
          <Link to="/admin/bookings" className="admin-dashborad-link">
            <GoSearch />&nbsp;View Bookings
          </Link>
          
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

















// import { useState, useEffect } from 'react';
// import { FaRegIdCard, FaUsers } from 'react-icons/fa';
// import { GoSearch } from 'react-icons/go';
// import { IoMdAdd } from 'react-icons/io';
// import { MdBookmark } from 'react-icons/md';
// import { Link } from 'react-router-dom';

// const AdminDashboard = () => {
//   const [vehicleStats, setVehicleStats] = useState({
//     totalCount: 0,
//     availableCount: 0,
//     busyCount: 0,
//     vehicleTypeStats: {
//       car: { available: 0, busy: 0, total: 0 },
//       suv: { available: 0, busy: 0, total: 0 },
//       miniCar: { available: 0, busy: 0, total: 0 },
//     },
//   });
//   const [driverCount, setDriverCount] = useState(0);
//   const [customerCount, setCustomerCount] = useState(0);
//   const [bookingCount, setBookingCount] = useState(0);
//   const [newBookings, setNewBookings] = useState([]);  // State for new bookings

//   useEffect(() => {
//     const fetchVehicleStats = async () => {
//       try {
//         const vehicleResponse = await fetch('http://localhost:8081/admin/cars');
//         const vehicleData = await vehicleResponse.json();
//         const totalCount = vehicleData.length;
//         const availableCount = vehicleData.filter(vehicle => vehicle.status === true).length;
//         const busyCount = vehicleData.filter(vehicle => vehicle.status === false).length;

//         const vehicleTypeStats = {
//           car: { available: 0, busy: 0, total: 0 },
//           suv: { available: 0, busy: 0, total: 0 },
//           miniCar: { available: 0, busy: 0, total: 0 },
//         };

//         vehicleData.forEach(vehicle => {
//           if (vehicle.vehicleType === 'Car') vehicleTypeStats.car.total++;
//           if (vehicle.vehicleType === 'SUV') vehicleTypeStats.suv.total++;
//           if (vehicle.vehicleType === 'Mini Car') vehicleTypeStats.miniCar.total++;

//           if (vehicle.status === true) {
//             if (vehicle.vehicleType === 'Car') vehicleTypeStats.car.available++;
//             if (vehicle.vehicleType === 'SUV') vehicleTypeStats.suv.available++;
//             if (vehicle.vehicleType === 'Mini Car') vehicleTypeStats.miniCar.available++;
//           } else if (vehicle.status === false) {
//             if (vehicle.vehicleType === 'Car') vehicleTypeStats.car.busy++;
//             if (vehicle.vehicleType === 'SUV') vehicleTypeStats.suv.busy++;
//             if (vehicle.vehicleType === 'Mini Car') vehicleTypeStats.miniCar.busy++;
//           }
//         });

//         setVehicleStats({
//           totalCount,
//           availableCount,
//           busyCount,
//           vehicleTypeStats,
//         });
//       } catch (error) {
//         console.error('Error fetching vehicle data:', error);
//       }
//     };

//     const fetchDriverCount = async () => {
//       try {
//         const driverResponse = await fetch('http://localhost:8081/admin/drivers');
//         const driverData = await driverResponse.json();
//         setDriverCount(driverData.length);
//       } catch (error) {
//         console.error('Error fetching driver data:', error);
//       }
//     };

//     const fetchCustomerCount = async () => {
//       try {
//         const customerResponse = await fetch('http://localhost:8081/customers');
//         const customerData = await customerResponse.json();
//         setCustomerCount(customerData.length);
//       } catch (error) {
//         console.error('Error fetching customer data:', error);
//       }
//     };

//     const fetchBookingCount = async () => {
//       try {
//         const bookingResponse = await fetch('http://localhost:8081/bookings');
//         const bookingData = await bookingResponse.json();
//         setBookingCount(bookingData.length);
//         // Filter bookings where bookingStatus is false
//         const newBookings = bookingData.filter(booking => booking.bookingStatus === false);
//         setNewBookings(newBookings);
//       } catch (error) {
//         console.error('Error fetching Booking data', error);
//       }
//     };

//     fetchVehicleStats();
//     fetchDriverCount();
//     fetchCustomerCount();
//     fetchBookingCount();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4">
//       <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6">
//         <h2 className="text-3xl font-semibold text-center text-yellow-800">
//           Admin Dashboard
//         </h2>

//         {/* Vehicle Stats Card */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
//           <div className="p-6 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition duration-300">
//             <h3 className="text-xl text-yellow-700">Total Vehicles</h3>
//             <p className="text-3xl font-bold text-yellow-800">{vehicleStats.totalCount}</p>
//           </div>

//           <div className="p-6 bg-gray-100 rounded-lg border border-green-300 shadow-md hover:shadow-xl transition duration-300">
//             <h3 className="text-xl text-yellow-700"><span className='inline-block w-4 h-4 rounded-full mr-2 bg-green-500'></span>Available Vehicles</h3>
//             <p className="text-3xl font-bold text-yellow-800">{vehicleStats.availableCount}</p>
//           </div>

//           <div className="p-6 bg-gray-100 rounded-lg border border-red-300 shadow-md hover:shadow-xl transition duration-300">
//             <h3 className="text-xl text-yellow-700"><span className='inline-block w-4 h-4 rounded-full mr-2 bg-red-500'></span>Busy Vehicles</h3>
//             <p className="text-3xl font-bold text-yellow-800">{vehicleStats.busyCount}</p>
//           </div>
//         </div>

//         {/* Vehicle Type Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {['car', 'suv', 'miniCar'].map((type) => (
//             <div key={type} className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
//               <h4 className="text-xl font-semibold text-yellow-700 capitalize">{type}</h4>
//               <p className='text-gray-600'>Total: {vehicleStats.vehicleTypeStats[type].total}</p>
//               <p className='text-gray-600'>Available: {vehicleStats.vehicleTypeStats[type].available}</p>
//               <p className='text-gray-600'>Busy: {vehicleStats.vehicleTypeStats[type].busy}</p>
//             </div>
//           ))}
//         </div>

//         {/* Driver and Customer Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition duration-300">
//             <h3 className="text-xl text-yellow-700">Total Drivers<FaRegIdCard /></h3>
//             <p className="text-3xl font-bold text-yellow-800">{driverCount}</p>
//           </div>

//           <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition duration-300">
//             <h3 className="text-xl text-yellow-700">Total Customers<FaUsers /></h3>
//             <p className="text-3xl font-bold text-yellow-800">{customerCount}</p>
//           </div>

//           <div className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-xl transition duration-300">
//             <h3 className="text-xl text-yellow-700">Total Bookings<MdBookmark /></h3>
//             <p className="text-3xl font-bold text-yellow-800">{bookingCount}</p>
//           </div>
//         </div>

//         {/* New Received Bookings Section */}
//         <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
//           <h3 className="text-xl text-yellow-700">New Received Bookings</h3>
//           <ul className="space-y-4">
//             {newBookings.length > 0 ? (
//               newBookings.map((booking) => (
//                 <li key={booking._id} className="border-b pb-2">
//                   <p className="font-semibold">{booking.customerName}</p>
//                   <p>{booking.startLocation} to {booking.destination}</p>
//                   <p className="text-sm text-gray-500">Created on: {new Date(booking.createdDateTime).toLocaleString()}</p>
//                 </li>
//               ))
//             ) : (
//               <p>No new bookings</p>
//             )}
//           </ul>
//         </div>

//         {/* Action Links */}
//         <div className="flex flex-wrap justify-center gap-4 mt-6">
//           <Link to="/admin/drivers/add" className="flex items-center justify-center bg-yellow-400 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-yellow-500 transition duration-300">
//             <IoMdAdd />&nbsp;Add Drivers
//           </Link>
//           <Link to="/admin/drivers" className="flex items-center justify-center bg-yellow-400 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-yellow-500 transition duration-300">
//             <GoSearch />&nbsp;View Drivers
//           </Link>
//           <Link to="/admin/cars/add" className="flex items-center justify-center bg-yellow-400 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-yellow-500 transition duration-300">
//             <IoMdAdd />&nbsp;Add Vehicles
//           </Link>
//           <Link to="/admin/cars" className="flex items-center justify-center bg-yellow-400 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-yellow-500 transition duration-300">
//             <GoSearch />&nbsp;View Vehicles
//           </Link>
//           <Link to="/admin/viewbookings" className="flex items-center justify-center bg-yellow-400 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-yellow-500 transition duration-300">
//             <GoSearch />&nbsp;View Bookings
//           </Link>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminDashboard

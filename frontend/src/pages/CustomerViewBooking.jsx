// import { useEffect, useState } from 'react';
// import { FaCheckCircle } from 'react-icons/fa';
// import { MdPending } from 'react-icons/md';

// const CustomerViewBooking = () => {
//   const [bookings, setBookings] = useState([]);
//   const [filteredBookings, setFilteredBookings] = useState([]);
//   const [searchDate, setSearchDate] = useState('');

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await fetch('http://localhost:8081/bookings');
//         const data = await response.json();
//         setBookings(data);
//         setFilteredBookings(data);
//       } catch (error) {
//         console.error('Error fetching booking details', error);
//       }
//     };

//     fetchBookings();
//   }, []);

//   const handleSearch = (event) => {
//     setSearchDate(event.target.value);

//     if (event.target.value === '') {
//       setFilteredBookings(bookings);
//     } else {
//       const filtered = bookings.filter(booking =>
//         new Date(booking.createdDateTime).toLocaleDateString() === new Date(event.target.value).toLocaleDateString()
//       );
//       setFilteredBookings(filtered);
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 min-h-screen">
//       <h1 className="text-4xl font-semibold mb-8 text-center text-yellow-700">
//         Your Bookings
//       </h1>

//       {/* Date Search Field */}
//       <div className="mb-6 flex justify-center items-center">
//         <label htmlFor="searchDate" className="mr-3 text-lg text-yellow-600 font-medium">
//           Search by Date
//         </label>
//         <input
//           type="date"
//           id="searchDate"
//           value={searchDate}
//           onChange={handleSearch}
//           className="border px-4 py-2 text-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400"
//         />
//       </div>

//       {/* Bookings Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredBookings.length > 0 ? (
//           filteredBookings.map((booking) => (
//             <div key={booking._id} className="bg-white shadow-lg rounded-lg p-10 hover:shadow-xl transition-shadow duration-300">
//               <h3 className="text-xl font-semibold text-yellow-700 mb-3">
//                 ID: {booking.id}
//               </h3>
//               <div className="space-y-2">
//                 {/* <p className="text-gray-700">
//                   <strong>Customer Name:</strong> {booking.customerName}
//                 </p> */}
//                 <p className="text-gray-600">
//                   <strong>Booked Date:</strong> {new Date(booking.createdDateTime).toLocaleString()}
//                 </p>
//                 <p className="text-gray-600">
//                   <strong>Pickup Location:</strong> {booking.startLocation}
//                 </p>
//                 <p className="text-gray-600">
//                   <strong>Destination:</strong> {booking.destination}
//                 </p>

//                 {/* <p className={`text-lg font-semibold ${booking.bookingStatus ? 'text-green-600' : 'text-yellow-600'}`}>
//                   <strong>Your Booking:</strong> {booking.bookingStatus ? '<FaCheckCircle /> Accepted' : '🔃 Pending'}
                  
//                 </p> */}

//                 <p className={`flex items-center text-lg font-semibold ${booking.bookingStatus ? 'text-green-600' : 'text-yellow-600'}`}>
//                     <strong>Your Booking: &nbsp;</strong> 
//                     {booking.bookingStatus ? (
//                         <>
//                         <FaCheckCircle /> &nbsp;Accepted
//                         </>
//                     ) : (
//                         <>
//                         <MdPending /> &nbsp;Pending
//                         </>
                    
//                     )}
//                 </p>

//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="col-span-full text-center text-yellow-600">
//             No bookings found for the selected date.
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default CustomerViewBooking







import { useEffect, useState } from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdPending } from 'react-icons/md';

const CustomerViewBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:8081/bookings');
        const data = await response.json();
        
        // Sort bookings by createdDateTime in descending order (latest first)
        const sortedBookings = data.sort((a, b) => new Date(b.createdDateTime) - new Date(a.createdDateTime));
        
        setBookings(sortedBookings);
        setFilteredBookings(sortedBookings);
      } catch (error) {
        console.error('Error fetching booking details', error);
      }
    };

    fetchBookings();
  }, []);

  const handleSearch = (event) => {
    setSearchDate(event.target.value);

    if (event.target.value === '') {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter(booking =>
        new Date(booking.createdDateTime).toLocaleDateString() === new Date(event.target.value).toLocaleDateString()
      );
      setFilteredBookings(filtered);
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen mt-20">
      <h1 className="text-4xl font-semibold mb-8 text-center text-yellow-700">
        Your Bookings
      </h1>

      {/* Date Search Field */}
      <div className="mb-6 flex justify-center items-center">
        <label htmlFor="searchDate" className="mr-3 text-lg text-yellow-600 font-medium">
          Search by Date
        </label>
        <input
          type="date"
          id="searchDate"
          value={searchDate}
          onChange={handleSearch}
          className="border px-4 py-2 text-gray-500 rounded-lg focus:outline-none focus:ring-1 focus:ring-yellow-400"
        />
      </div>

      {/* Bookings Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <div key={booking._id} className="bg-white shadow-lg rounded-lg p-10 hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-xl font-semibold text-yellow-700 mb-3">
                ID: {booking.id}
              </h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <strong>Booked Date:</strong> {new Date(booking.createdDateTime).toLocaleString()}
                </p>
                <p className="text-gray-600">
                  <strong>Pickup Location:</strong> {booking.startLocation}
                </p>
                <p className="text-gray-600">
                  <strong>Destination:</strong> {booking.destination}
                </p>

                <p className={`flex items-center text-lg font-semibold ${booking.bookingStatus ? 'text-green-600' : 'text-yellow-600'}`}>
                    <strong>Your Booking: &nbsp;</strong> 
                    {booking.bookingStatus ? (
                        <>
                        <FaCheckCircle /> &nbsp;Accepted
                        </>
                    ) : (
                        <>
                        <MdPending /> &nbsp;Pending
                        </>
                    )}
                </p>

              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-yellow-600">
            No bookings found for the selected date.
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomerViewBooking

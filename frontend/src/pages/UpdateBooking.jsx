// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';


// function UpdateBooking() {
//   const { id } = useParams(); // Get the car ID from the URL
//   const navigate = useNavigate();
  

//   const [booking, setBooking] = useState({
//     customerName: '',
//     address: '',
//     phone: '',
//     startLocation: '',
//     destination: '',
//     createdDateTime: '',
//     bookingStatus: false, // Add the status field here
//   });


//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchBooking = async () => {
//       try {
//         const response = await fetch(`http://localhost:8081/bookings/${id}`);
//         const data = await response.json();
//         setBooking(data);
//         setLoading(false);
//       } catch (error) {
//         setError('Failed to fetch Booking details');
//         setLoading(false);
//       }
//     };
//     fetchBooking();
//   }, [id]);


//   const handleStatusToggle = async () => {
//     try {
//       // Toggle the status (Available <-> Busy)
//       const updatedStatus = !booking.bookingStatus;

//       // Update the status in the local state
//       setBooking((prevBooking) => ({
//         ...prevBooking,
//         bookingStatus: updatedStatus,
//       }));

//       // Send the updated status to the server
//       const response = await fetch(`http://localhost:8081/bookings/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ ...booking, bookingStatus: updatedStatus }),
//       });

//       if (!response.ok) {
//         throw new Error('Failed to update Booking status');
//       }
//     } catch (error) {
//       setError('Failed to update Booking status');
//     }
//   };

  


//   if (loading) {
//     return <div>Loading...</div>;
//   }


//   return (
//     <div className="container mx-auto p-4 min-h-screen">
//       <h1 className="text-3xl text-center font-semibold text-yellow-800 m-8">Accept Booking</h1>

//       {error && <p className="text-red-600 mb-4">{error}</p>}

//       <form onSubmit={handleStatusToggle} className="space-y-4">

//         <div className='flex items-center gap-6'>
//           {/* Toggle button for status */}
//           <button
//             type="button"
//             onClick={handleStatusToggle}
//             className={`py-2 px-8 my-8 rounded-full ${booking.bookingStatus ? 'border text-red-800 border-red-600 bg-red-200 hover:bg-red-300' : 'border text-green-800 border-green-600 bg-green-200 hover:bg-green-300'} transition-all duration-200`}
//           >
//             {booking.bookingStatus ? 'Reset' : 'Accept'}
//           </button>
//           <label className="block text-gray-700">Now:&nbsp;<span className={`inline-block w-3.5 h-3.5 rounded-full mr-2 ${booking.bookingStatus ? 'bg-green-500' : 'bg-blue-500'}`}></span><span className='font-bold'>{booking.bookingStatus ? 'Accepted✅':'Pending🔃'}</span></label>

//         </div>

//         <div>
//         <label htmlFor="customerName" className="block text-gray-700">Customer Name</label>
//             <input 
//             id="customerName" 
//             name="customerName"
//             value={booking.customerName} 
//             readOnly
//             className="w-full p-2 border border-gray-300 rounded-lg"
//             />
//         </div>

//         <div>
//           <label htmlFor="phone" className="block text-gray-700">Phone No</label>
//           <input
//             type="text"
//             id="phone"
//             name="phone"
//             value={booking.phone}
//             readOnly
//             className="w-full p-2 border border-gray-300 rounded-lg"
//           />
//         </div>

//         <div>
//           <label htmlFor="startLocation" className="block text-gray-700">Pickup Location</label>
//           <input
//             type="text"
//             id="startLocation"
//             name="startLocation"
//             value={booking.startLocation}
//             readOnly
//             className="w-full p-2 border border-gray-300 rounded-lg"
//           />
//         </div>

//         <div>
//           <label htmlFor="destination" className="block text-gray-700">Destination</label>
//           <input
//             type="text"
//             id="destination"
//             name="destination"
//             value={booking.destination}
//             readOnly
//             className="w-full p-2 border border-gray-300 rounded-lg"
//           />
//         </div>

//         <div className="flex justify-between mt-4 pt-4">
//           <button
//             type="submit"
//             className="text-md text-blue-600 bg-blue-50 outline outline-1 outline-blue-700 hover:bg-blue-200 px-4 py-2 rounded-full transition-all duration-200"
//           >
//             Accept Booking
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate(`/admin`)}
//             className="text-md text-gray-600 bg-gray-100 outline outline-1 outline-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full transition-all duration-200"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default UpdateBooking













import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateBooking() {
  const { id } = useParams(); // Get the car ID from the URL
  const navigate = useNavigate();
  

  const [booking, setBooking] = useState({
    customerName: '',
    address: '',
    phone: '',
    startLocation: '',
    destination: '',
    createdDateTime: '',
    bookingStatus: false, // Add the status field here
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`http://localhost:8081/bookings/${id}`);
        const data = await response.json();
        setBooking(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch Booking details ',error);
        setError('Failed to fetch Booking details');
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);

  const handleStatusToggle = async () => {
    try {

      // Toggle the status (Accept <-> Reset)
      const updatedStatus = !booking.bookingStatus;

      // Update the status in the local state
      setBooking((prevBooking) => ({
        ...prevBooking,
        bookingStatus: updatedStatus,
      }));

      
      // Send the updated status to the server
      const response = await fetch(`http://localhost:8081/bookings/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...booking, bookingStatus: updatedStatus }),
      });

      if (response.ok) {
        alert(`Booking is ${updatedStatus ? 'Accepted':'Reset'}`);
        // navigate(`/admin/bookings`); // Redirect to the driver list page after successful update
      }
      
    } catch (error) {
      console.error('Failed to update Booking status ',error);
      setError('Failed to update Booking status');
    }
  
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen mt-20">
      <h1 className="text-3xl text-center font-semibold text-yellow-800 m-8">Accept Booking</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
        <div className='flex items-center gap-6'>
          {/* Toggle button for status */}
          <button
            type="button"
            onClick={handleStatusToggle}
            className={`py-2 px-8 my-8 rounded-full ${booking.bookingStatus ? 'border text-red-800 border-red-600 bg-red-200 hover:bg-red-300' : 'border text-green-800 border-green-600 bg-green-200 hover:bg-green-300'} transition-all duration-200`}
          >
            {booking.bookingStatus ? 'Reset' : 'Accept'}
          </button>
          <label className="block text-gray-700">Now:&nbsp;<span className={`inline-block w-3.5 h-3.5 rounded-full mr-2 ${booking.bookingStatus ? 'bg-green-500' : 'bg-blue-500'}`}></span><span className='font-bold'>{booking.bookingStatus ? 'Accepted✅':'Pending🔃'}</span></label>
        </div>

        {/* Disable other input fields when booking is accepted */}
        <div>
          <label htmlFor="customerName" className="block text-gray-700">Customer Name</label>
          <input 
            id="customerName" 
            name="customerName"
            value={booking.customerName} 
            readOnly={booking.bookingStatus}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-700">Phone No</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={booking.phone}
            readOnly={booking.bookingStatus}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="startLocation" className="block text-gray-700">Pickup Location</label>
          <input
            type="text"
            id="startLocation"
            name="startLocation"
            value={booking.startLocation}
            readOnly={booking.bookingStatus}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="destination" className="block text-gray-700">Destination</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={booking.destination}
            readOnly={booking.bookingStatus}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex justify-between mt-4 pt-4">
        
          {/* Disable the 'Accept Booking' button if status is already accepted */}
          <button
            type="button"
            onClick={handleStatusToggle}
            className="text-md text-blue-600 bg-blue-50 outline outline-1 outline-blue-700 hover:bg-blue-200 px-4 py-2 rounded-full transition-all duration-200"
            disabled={booking.bookingStatus}
          >
            Accept Booking
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="text-md text-gray-600 bg-gray-100 outline outline-1 outline-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateBooking

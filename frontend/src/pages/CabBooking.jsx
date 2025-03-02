import { useState } from 'react';
import axios from 'axios';

const CustomerRegisterForm = () => {

  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setTelephone] = useState('');
  const [startLocation, setFromLocation] = useState('');
  const [destination, setToDestination] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBooking = {
      customerName,
      address,
      phone,
      startLocation,
      destination,
    };

    try {
      const response = await axios.post(
        'http://localhost:8081/bookings',
        newBooking
      );
      setStatus(`${response.data.customerName}, Your booking is successfull..!`);
      setCustomerName('');
      setAddress('');
      setTelephone('');
      setFromLocation('');
      setToDestination('');
    } catch (error) {
      console.error('error occurred while the Booking',error);
      setStatus('An error occurred while the Booking.');
    }
  };

  return (
    <div className="main-div">
      <div className="form-card">
        <h2 className="text-2xl font-bold text-center text-yellow-500">
          Cab Booking
        </h2>
        {status && <p className="mt-2 text-center text-green-600">{status}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="customerName"
              className="block text-sm font-medium text-gray-700"
            >
              Customer Name
            </label>
            <input
              type="text"
              id="customerName"
              autoFocus={true}
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="telePhone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone No
            </label>
            <input
              type="text"
              id="telePhone"
              value={phone}
              onChange={(e) => setTelephone(e.target.value)}
              className="form-input"
              required
            />
          </div>


          <div className="mb-4">
            <label
              htmlFor="fromLocation"
              className="block text-sm font-medium text-gray-700"
            >
              Pickup Location
            </label>
            <input
              type="text"
              id="fromLocation"
              value={startLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="toDestination"
              className="block text-sm font-medium text-gray-700"
            >
              Destination
            </label>
            <input
              type="text"
              id="toDestination"
              value={destination}
              onChange={(e) => setToDestination(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button
            type="submit"
            className="form-button"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  )
}

export default CustomerRegisterForm






















// import React, { useState } from 'react';
// import axios from 'axios';
// import { GoogleMap, LoadScript, Marker, DirectionsService, DirectionsRenderer } from '@react-google-maps/api';

// const CustomerRegisterForm = () => {
//   const [customerName, setCustomerName] = useState('');
//   const [address, setAddress] = useState('');
//   const [phone, setTelephone] = useState('');
//   const [startLocation, setFromLocation] = useState('');
//   const [destination, setToDestination] = useState('');
//   const [status, setStatus] = useState('');
//   const [directions, setDirections] = useState(null);
//   const [startCoords, setStartCoords] = useState(null);
//   const [endCoords, setEndCoords] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const newBooking = {
//       customerName,
//       address,
//       phone,
//       startLocation,
//       destination,
//     };

//     try {
//       const response = await axios.post(
//         'http://localhost:8081/api/bookings',
//         newBooking
//       );
//       setStatus(`Your ${response.data.customerName} booking is successful!`);
//       setCustomerName('');
//       setAddress('');
//       setTelephone('');
//       setFromLocation('');
//       setToDestination('');
//     } catch (error) {
//       setStatus('Error occurred while registering the customer.');
//     }
//   };

//   // Load the Google Maps API key and the map itself
//   const handleMapClick = (e, type) => {
//     const lat = e.latLng.lat();
//     const lng = e.latLng.lng();

//     if (type === 'start') {
//       setStartCoords({ lat, lng });
//       setFromLocation(`${lat}, ${lng}`);
//     } else {
//       setEndCoords({ lat, lng });
//       setToDestination(`${lat}, ${lng}`);
//     }
//   };

//   const calculateRoute = () => {
//     if (startCoords && endCoords) {
//       const DirectionsServiceInstance = new window.google.maps.DirectionsService();
//       DirectionsServiceInstance.route(
//         {
//           origin: startCoords,
//           destination: endCoords,
//           travelMode: window.google.maps.TravelMode.DRIVING,
//         },
//         (result, status) => {
//           if (status === 'OK') {
//             setDirections(result);
//           } else {
//             console.error('Error fetching directions', result);
//           }
//         }
//       );
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg w-96">
//         <h2 className="text-2xl font-bold text-center text-yellow-500">Cab Booking</h2>
//         {status && <p className="mt-2 text-center text-green-600">{status}</p>}
//         <form onSubmit={handleSubmit} className="mt-4">
//           <div className="mb-4">
//             <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">
//               Customer Name
//             </label>
//             <input
//               type="text"
//               id="customerName"
//               autoFocus
//               value={customerName}
//               onChange={(e) => setCustomerName(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//               Address
//             </label>
//             <input
//               type="text"
//               id="address"
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="telePhone" className="block text-sm font-medium text-gray-700">
//               Phone No
//             </label>
//             <input
//               type="text"
//               id="telePhone"
//               value={phone}
//               onChange={(e) => setTelephone(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="fromLocation" className="block text-sm font-medium text-gray-700">
//               Pickup Location
//             </label>
//             <input
//               type="text"
//               id="fromLocation"
//               value={startLocation}
//               onChange={(e) => setFromLocation(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="toDestination" className="block text-sm font-medium text-gray-700">
//               Destination
//             </label>
//             <input
//               type="text"
//               id="toDestination"
//               value={destination}
//               onChange={(e) => setToDestination(e.target.value)}
//               className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
//               required
//             />
//           </div>

//           {/* Google Map component */}
//           <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
//             <GoogleMap
//               id="google-map"
//               mapContainerStyle={{ width: '100%', height: '180px' }}
//               zoom={14}
//               center={startCoords || { lat: 37.7749, lng: -122.4194 }}
//               onClick={(e) => handleMapClick(e, 'start')}
//             >
//               {startCoords && <Marker position={startCoords} />}
//               {endCoords && <Marker position={endCoords} />}
//             </GoogleMap>
//           </LoadScript>

//           <button
//             type="button"
//             onClick={calculateRoute}
//             className="w-full mt-4 py-2 px-4 bg-yellow-500 text-white font-semibold rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//           >
//             Calculate Route
//           </button>

//           <button
//             type="submit"
//             className="w-full mt-4 py-2 px-4 bg-yellow-500 text-white font-semibold rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
//           >
//             Confirm Booking
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CustomerRegisterForm;











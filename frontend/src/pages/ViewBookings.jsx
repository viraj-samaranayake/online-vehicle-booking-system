import { useEffect, useState } from 'react';

const ViewBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:8081/bookings');
        const data = await response.json();
        setBookings(data);
        setFilteredBookings(data);
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
        Cab Bookings
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

      {/* Bookings Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-yellow-100 text-yellow-700">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Booking ID</th>
              <th className="px-6 py-3 text-left font-semibold">Customer Name</th>
              <th className="px-6 py-3 text-left font-semibold">Date</th>
              <th className="px-6 py-3 text-left font-semibold">Pickup Location</th>
              <th className="px-6 py-3 text-left font-semibold">Destination</th>
              <th className="px-6 py-3 text-left font-semibold">Phone</th>
              <th className="px-6 py-3 text-left font-semibold">Address</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr key={booking._id} className="hover:bg-yellow-50">
                  <td className="px-6 py-4 border text-gray-700">{booking.id}</td>
                  <td className="px-6 py-4 border text-gray-700">{booking.customerName}</td>
                  <td className="px-6 py-4 border text-gray-700">{new Date(booking.createdDateTime).toLocaleString()}</td>
                  <td className="px-6 py-4 border text-gray-700">{booking.startLocation}</td>
                  <td className="px-6 py-4 border text-gray-700">{booking.destination}</td>
                  <td className="px-6 py-4 border text-gray-700">{booking.phone}</td>
                  <td className="px-6 py-4 border text-gray-700">{booking.address}</td>
                  <td className="px-6 py-4 border text-gray-700">{booking.bookingStatus ? '✅ Accepted':'🔃 Pending'}</td>

                  {/* <td className="px-6 py-3 border text-black">{new Date(booking.createdAt).toLocaleDateString()}</td> */}

                  {/* <td className="px-6 py-3 border text-black">{new Date(booking.createdDateTime).toLocaleString()}</td> */}
			
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-6 py-3 text-center text-yellow-500">
                  No bookings found for the selected date.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ViewBookings

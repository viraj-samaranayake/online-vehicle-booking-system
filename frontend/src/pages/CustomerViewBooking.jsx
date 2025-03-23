import { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { MdPending } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const CustomerViewBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [searchDate, setSearchDate] = useState('');
  const [customerId, setCustomerId] = useState(null);
  const [drivers, setDrivers] = useState({}); // Store drivers by ID
  const navigate = useNavigate(); // ✅ Use navigate for routing

  // Get customer ID using email stored in localStorage
  useEffect(() => {
    const fetchCustomerId = async () => {
      const email = localStorage.getItem('email');
      if (!email) return;

      try {
        const response = await fetch(
          `http://localhost:8081/customers/${email}`
        );
        const customerData = await response.json();

        if (customerData?.id) {
          setCustomerId(customerData.id);
        }
      } catch (error) {
        console.error('Error fetching customer details:', error);
      }
    };

    fetchCustomerId();
  }, []);

  // Fetch bookings for the logged-in customer
  useEffect(() => {
    if (!customerId) return;

    const fetchBookings = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/bookings/customers/${customerId}`
        );
        const data = await response.json();

        // Sort bookings by date (latest first)
        const sortedBookings = data.sort(
          (a, b) => new Date(b.createdDateTime) - new Date(a.createdDateTime)
        );

        setBookings(sortedBookings);
        setFilteredBookings(sortedBookings);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [customerId]);

  // Fetch driver details based on driverId in each booking
  useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        // Loop through all bookings to fetch driver details by driverId
        for (let booking of bookings) {
          if (booking.driverId && !drivers[booking.driverId]) {
            const driverResponse = await fetch(
              `http://localhost:8081/admin/drivers/${booking.driverId}`
            );
            const driverData = await driverResponse.json();
            setDrivers((prevDrivers) => ({
              ...prevDrivers,
              [booking.driverId]: driverData,
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching driver details:', error);
      }
    };

    if (bookings.length > 0) {
      fetchDriverDetails();
    }
  }, [bookings, drivers]);

  // Filter bookings based on selected date
  const handleSearch = (event) => {
    setSearchDate(event.target.value);

    if (event.target.value === '') {
      setFilteredBookings(bookings);
    } else {
      const filtered = bookings.filter(
        (booking) =>
          new Date(booking.createdDateTime).toLocaleDateString() ===
          new Date(event.target.value).toLocaleDateString()
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
        <label
          htmlFor="searchDate"
          className="mr-3 text-lg text-yellow-600 font-medium"
        >
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

      {/* Bookings List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => {
            const driver = drivers[booking.driverId]; // Get the driver details from the drivers map

            return (
              <div
                key={booking.id}
                className="bg-white shadow-lg rounded-lg p-10 hover:shadow-xl transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold text-yellow-700 mb-3">
                  Booking ID: {booking.id}
                </h3>
                <div className="space-y-2">
                  <p className="text-gray-600">
                    <strong>Booked Date:</strong>{' '}
                    {new Date(booking.createdDateTime).toLocaleString()}
                  </p>

                  <p className="text-gray-600">
                    <strong>Trip Date:</strong>{' '}
                    {new Date(booking.tripDateTime).toLocaleString()}
                  </p>

                  <p className="text-gray-600">
                    <strong>Vehicle :</strong> {booking.licensePlateNo} |{' '}
                    {booking.vehicleType}
                  </p>
                  <p className="text-gray-600">
                    <strong>Driver:</strong>{' '}
                    {driver ? driver.name : 'No driver assigned'} |{' '}
                    <strong>Mobile:</strong> {driver ? driver.mobileNo : 'N/A'}
                  </p>

                  <p className="text-gray-600">
                    <strong>Pickup Location:</strong> {booking.startLocation}
                  </p>
                  <p className="text-gray-600">
                    <strong>Destination:</strong> {booking.destination}
                  </p>
                  <p className="text-gray-600">
                    <strong>Distance:</strong> {booking.distance} Km
                  </p>

                  <p
                      className={`flex items-center text-lg font-semibold ${
                        booking.bookingStatus === 'accepted'
                          ? 'text-green-600'
                          : booking.bookingStatus === 'pending'
                          ? 'text-yellow-600'
                          : booking.bookingStatus === 'cancelled'
                          ? 'text-red-600'
                          : 'text-blue-600' // For completed or other cases
                      }`}
                    >
                      <span>Your Booking: &nbsp;</span>
                      {booking.bookingStatus === 'accepted' ? (
                        <>
                          <FaCheckCircle /> &nbsp;Accepted
                          <button
                            onClick={() => navigate(`/customer/bookings/bill/${booking.id}`)}
                            className="mx-4 p-5 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-full transition"
                          >
                            View Bill
                          </button>
                        </>
                      ) : booking.bookingStatus === 'pending' ? (
                        <>
                          <MdPending /> &nbsp;Pending
                        </>
                      ) : booking.bookingStatus === 'cancelled' ? (
                        <>
                          <FaTimesCircle /> &nbsp;Cancelled
                        </>
                      ) : booking.bookingStatus === 'completed' ? (
                        <>
                          <FaCheckCircle /> &nbsp;Completed
                          <button
                            onClick={() => navigate(`/customer/bookings/bill/${booking.id}`)}
                            className="mx-4 p-5 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-full transition"
                          >
                            View Bill
                          </button>
                        </>
                      ) : null}
                    </p>

                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-yellow-600">
            No bookings found for the selected date.
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerViewBooking;

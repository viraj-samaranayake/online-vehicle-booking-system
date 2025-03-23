import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateBooking() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState({
    customerName: '',
    customerId: '',
    address: '',
    driverId: '',
    driverName: '',
    vehicleType: '',
    licensePlateNo: '',
    phone: '',
    bookingDate: '',
    startLocation: '',
    destination: '',
    distance: '',
    createdDateTime: '',
    bookingStatus: 'pending', // Default to 'pending' as a string
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
        console.error('Failed to fetch Booking details', error);
        setError('Failed to fetch Booking details');
        setLoading(false);
      }
    };
    fetchBooking();
  }, [id]);





  const handleStatusChange = async (event) => {
    const updatedStatus = event.target.value;


    // Ask for confirmation before proceeding
    const isConfirmed = window.confirm(
      `Are you sure you want to mark this booking as ${updatedStatus.charAt(0).toUpperCase() + updatedStatus.slice(1)}?`
    );

    if (!isConfirmed) {
      return; // Stop the update if the user cancels
    }


    setBooking((prevBooking) => ({
      ...prevBooking,
      bookingStatus: updatedStatus,
    }));

    // Update booking status in DB
    try {
      const response = await fetch(`http://localhost:8081/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...booking, bookingStatus: updatedStatus }),
      });

      if (response.ok) {
        
        confirm(`Booking is ${updatedStatus.charAt(0).toUpperCase() + updatedStatus.slice(1)}`);

        // If booking is accepted, save the bill
        if (updatedStatus === 'accepted') {
          await saveBill(); // Save bill when the booking status is accepted
        }

        // If booking is cancelled, update the car status to available (true)
        if (updatedStatus === 'cancelled') {
          // Fetch the driver details to get the assigned car ID
          const bookingResponse = await fetch(
            `http://localhost:8081/bookings/${id}`
          );
          const bookingData = await bookingResponse.json();
          const driverId = bookingData.driverId;

          // Fetch the driver details by driverId
          const driverResponse = await fetch(
            `http://localhost:8081/admin/drivers/${driverId}`
          );
          const driverData = await driverResponse.json();

          // Get the carId from the assigned car of the driver
          const carId = driverData.assignedCar.id;

          // Fetch the current car details to keep the other data intact
          const carResponse = await fetch(
            `http://localhost:8081/admin/cars/${carId}`
          );
          const carData = await carResponse.json();

          // Update only the car status to available (true)
          const updateCarResponse = await fetch(
            `http://localhost:8081/admin/cars/${carId}`,
            {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...carData, // Keep other car data the same
                status: true, // Update only the status to available
              }),
            }
          );

          if (!updateCarResponse.ok) {
            console.error('Failed to update Car status to available');
            setError('Failed to update Car status');
          }
        }
      }
    } catch (error) {
      console.error('Failed to update Booking status', error);
      setError('Failed to update Booking status');
    }
  };






  const saveBill = async () => {
    try {
      // Fetch BillValue for the selected vehicleType
      const billValueResponse = await fetch(
        `http://localhost:8081/admin/billvalues`
      );
      const billValues = await billValueResponse.json();

      const billValue = billValues.find(
        (bv) => bv.vehicleType === booking.vehicleType
      );
      if (!billValue) {
        setError('No BillValue found for this vehicle type');
        return;
      }

      // Calculate total fare
      let baseFare =
        booking.distance <= 20
          ? booking.distance * billValue.firstTwentyPerKm
          : 20 * billValue.firstTwentyPerKm +
            (booking.distance - 20) * billValue.twentyPlusPerKm;

      const taxAmount = baseFare * (billValue.tax / 100);
      const discountAmount = baseFare * (billValue.discount / 100);
      const totalFare = baseFare + taxAmount - discountAmount;

      // Bill Data
      const billData = {
        customerName: booking.customerName,
        bookingId: booking.id,
        driverName: booking.driverName,
        pickupLocation: booking.startLocation,
        destination: booking.destination,
        vehicleType: booking.vehicleType,
        licensePlateNo: booking.licensePlateNo,
        distance: booking.distance,
        tax: taxAmount.toFixed(2),
        discount: discountAmount.toFixed(2),
        total: totalFare.toFixed(2),
      };

      // Save Bill
      const response = await fetch('http://localhost:8081/bills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(billData),
      });

      if (!response.ok) {
        console.error('Failed to save Bill');
        setError('Failed to save Bill');
      }
    } catch (error) {
      console.error('Error saving Bill', error);
      setError('Error saving Bill');
    }
  };


  const handleComplete = async () => {
    try {
      // Step 1: First, update the booking status to 'completed'
      const responseBooking = await fetch(
        `http://localhost:8081/bookings/${id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...booking, bookingStatus: 'completed' }),
        }
      );

      if (!responseBooking.ok) {
        setError('Failed to update Booking status to completed');
        return;
      }

      // Step 2: Fetch the driver details using the driverId from the booking
      const responseDriver = await fetch(
        `http://localhost:8081/admin/drivers/${booking.driverId}`
      );
      const driver = await responseDriver.json();

      if (!driver || !driver.assignedCar) {
        setError('Driver or assigned car not found');
        return;
      }

      // Step 3: Get the car ID from the assigned car
      const carId = driver.assignedCar.id;

      // Step 4: Fetch the existing car details to preserve other data
      const responseCar = await fetch(
        `http://localhost:8081/admin/cars/${carId}`
      );
      const car = await responseCar.json();

      if (!car) {
        setError('Car not found');
        return;
      }

      // Step 5: Update only the car's status to 'available' while keeping other data the same
      const updatedCar = { ...car, status: true };

      const responseCarUpdate = await fetch(
        `http://localhost:8081/admin/cars/${carId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedCar), // Update only the status
        }
      );

      if (responseCarUpdate.ok) {
        // Successfully updated the car status to available
        setBooking((prevBooking) => ({
          ...prevBooking,
          bookingStatus: 'completed',
        }));
        alert(
          'Booking status updated to completed, and vehicle is now available.'
        );
        navigate('/admin');
      } else {
        setError('Failed to update Vehicle status');
      }
    } catch (error) {
      console.error('Error completing booking', error);
      setError('Failed to complete the booking and update vehicle status');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 min-h-screen mt-20 items-center">
      <h1 className="text-3xl text-center font-semibold text-yellow-800 m-8">
        Manage Booking Status
      </h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-5 justify-self-center"
      >
        <div>
          <label htmlFor="customerName" className="block text-gray-700">
            Customer Name
          </label>
          <input
            id="customerName"
            name="customerName"
            value={booking.customerName}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-700">
            Customer Phone No
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={booking.phone}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="license" className="block text-gray-700">
            Vehicle License No
          </label>
          <input
            type="text"
            id="license"
            name="license"
            value={booking.licensePlateNo}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="driverName" className="block text-gray-700">
            Driver Name
          </label>
          <input
            type="text"
            id="driverName"
            name="driverName"
            value={booking.driverName}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>


        <div>
          <label htmlFor="driverName" className="block text-gray-700">
            Requested Trip Date
          </label>
          <input
            type="text"
            id="driverName"
            name="driverName"
            value={new Date(booking.tripDateTime).toLocaleString()}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>


        <div>
          <label htmlFor="startLocation" className="block text-gray-700">
            Pickup Location
          </label>
          <input
            type="text"
            id="startLocation"
            name="startLocation"
            value={booking.startLocation}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="destination" className="block text-gray-700">
            Destination
          </label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={booking.destination}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="distance" className="block text-gray-700">
            Distance (Km)
          </label>
          <input
            type="text"
            id="distance"
            name="distance"
            value={booking.distance}
            readOnly
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="mt-4">
          <label className="block text-gray-700">Booking Status</label>
          <div className="flex items-center space-x-6">
            <div>
              <input
                type="radio"
                id="accepted"
                name="bookingStatus"
                value="accepted"
                checked={booking.bookingStatus === 'accepted'}
                onChange={handleStatusChange}
                disabled={
                  booking.bookingStatus === 'accepted' ||
                  booking.bookingStatus === 'completed'
                }
                className="m-2 bg"
              />
              <label htmlFor="accepted">Accept booking</label>
            </div>
            <div>
              <input
                type="radio"
                id="cancelled"
                name="bookingStatus"
                value="cancelled"
                checked={booking.bookingStatus === 'cancelled'}
                onChange={handleStatusChange}
                disabled={
                  booking.bookingStatus === 'cancelled' ||
                  booking.bookingStatus === 'accepted'
                }
                className="m-2"
              />
              <label htmlFor="cancelled">Cancel booking</label>
            </div>
          </div>
        </div>

        {booking.bookingStatus === 'accepted' && (
          <div className="mt-4">
            <button
              type="button"
              onClick={handleComplete}
              className="text-md text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-full transition-all duration-200"
            >
              Mark as Complete
            </button>
          </div>
        )}

        <div className="flex justify-between mt-4 pt-4">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="text-md text-gray-600 bg-gray-100 outline outline-1 outline-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full transition-all duration-200"
          >
            Back to Dashboard
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateBooking;

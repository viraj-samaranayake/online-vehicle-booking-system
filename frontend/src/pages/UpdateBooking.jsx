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
    startLocation: '',
    destination: '',
    distance: '',
    createdDateTime: '',
    bookingStatus: false,
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

  const handleStatusToggle = async () => {
    try {
      const updatedStatus = !booking.bookingStatus;

      setBooking((prevBooking) => ({
        ...prevBooking,
        bookingStatus: updatedStatus,
      }));

      // Update booking status in DB
      const response = await fetch(`http://localhost:8081/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...booking, bookingStatus: updatedStatus }),
      });

      if (response.ok) {
        alert(`Booking is ${updatedStatus ? 'Accepted' : 'Reset'}`);

        // If booking is accepted, save the bill
        if (updatedStatus) {
          await saveBill();
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
      const billValueResponse = await fetch(`http://localhost:8081/admin/billvalues`);
      const billValues = await billValueResponse.json();

      const billValue = billValues.find(bv => bv.vehicleType === booking.vehicleType);
      if (!billValue) {
        setError('No BillValue found for this vehicle type');
        return;
      }

      // // Generate a random distance (between 5km - 50km)
      // const distance = Math.floor(Math.random() * (50 - 5 + 1)) + 5;

      // Calculate total fare
      let baseFare = booking.distance <= 20 
        ? booking.distance * billValue.firstTwentyPerKm
        : (20 * billValue.firstTwentyPerKm) + ((booking.distance - 20) * billValue.twentyPlusPerKm);

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
        tax: billValue.tax,
        discount: billValue.discount,
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

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 min-h-screen mt-20 items-center">
      <h1 className="text-3xl text-center font-semibold text-yellow-800 m-8">Accept Booking</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={(e) => e.preventDefault()} className="space-y-5 justify-self-center">
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={handleStatusToggle}
            className={`py-2 px-8 my-8 rounded-full ${
              booking.bookingStatus
                ? 'border text-red-800 border-red-600 bg-red-200 hover:bg-red-300'
                : 'border text-green-800 border-green-600 bg-green-200 hover:bg-green-300'
            } transition-all duration-200`}
          >
            {booking.bookingStatus ? 'Reset' : 'Accept'}
          </button>
          <label className="block text-gray-700">
            Now:&nbsp;
            <span
              className={`inline-block w-3.5 h-3.5 rounded-full mr-2 ${
                booking.bookingStatus ? 'bg-green-500' : 'bg-blue-500'
              }`}
            ></span>
            <span className="font-bold">
              {booking.bookingStatus ? 'Accepted✅' : 'Pending🔃'}
            </span>
          </label>
        </div>

        <div>
          <label htmlFor="customerName" className="block text-gray-700">Customer Name</label>
          <input 
          id="customerName"
          name="customerName" 
          value={booking.customerName} 
          readOnly 
          className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

        <div>
          <label htmlFor="phone" className="block text-gray-700">Customer Phone No</label>
          <input type="text" id="phone" name="phone" value={booking.phone} readOnly className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

        <div>
          <label htmlFor="license" className="block text-gray-700">Vehicle License No</label>
          <input type="text" id="license" name="license" value={booking.licensePlateNo} readOnly className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

        <div>
          <label htmlFor="driverName" className="block text-gray-700">Driver Name</label>
          <input type="text" id="driverName" name="driverName" value={booking.driverName} readOnly className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

        <div>
          <label htmlFor="startLocation" className="block text-gray-700">Pickup Location</label>
          <input type="text" id="startLocation" name="startLocation" value={booking.startLocation} readOnly className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

        <div>
          <label htmlFor="destination" className="block text-gray-700">Destination</label>
          <input type="text" id="destination" name="destination" value={booking.destination} readOnly className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

        <div>
          <label htmlFor="distance" className="block text-gray-700">Distance(Km)</label>
          <input type="text" id="distance" name="distance" value={booking.distance} readOnly className="w-full p-2 border border-gray-300 rounded-lg" />
        </div>

        <div className="flex justify-between mt-4 pt-4">
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
  );
}

export default UpdateBooking;

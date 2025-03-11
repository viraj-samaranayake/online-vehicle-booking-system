import { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerRegisterForm = () => {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setTelephone] = useState('');
  const [startLocation, setFromLocation] = useState('');
  const [destination, setToDestination] = useState('');
  const [carTypes, setCarTypes] = useState([]); // Holds unique car types
  const [selectedCar, setSelectedCar] = useState('');
  const [status, setStatus] = useState('');

  // Fetch car types and remove duplicates
  useEffect(() => {
    const fetchCarTypes = async () => {
      try {
        const response = await axios.get('http://localhost:8081/admin/cars');

        // Extract unique car types using Set
        const uniqueCarTypes = [
          ...new Set(response.data.map((car) => car.vehicleType)),
        ];

        setCarTypes(uniqueCarTypes);
      } catch (error) {
        console.error('Error fetching car types:', error);
      }
    };
    fetchCarTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBooking = {
      customerName,
      address,
      phone,
      vehicleType: selectedCar,
      startLocation,
      destination,
    };

    try {
      const response = await axios.post(
        'http://localhost:8081/bookings',
        newBooking
      );
      setStatus(`${response.data.customerName}, Your booking is successful..!`);

      // Reset form fields
      setCustomerName('');
      setAddress('');
      setTelephone('');
      setFromLocation('');
      setToDestination('');
      setSelectedCar('');
    } catch (error) {
      console.error('Error occurred while booking:', error);
      setStatus('An error occurred while booking.');
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
            <label className="block text-sm font-medium text-gray-700">
              Customer Name
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone No
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setTelephone(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Vehicle Type
            </label>
            <select
              className="form-input"
              value={selectedCar}
              onChange={(e) => setSelectedCar(e.target.value)}
              required
            >
              <option value="">--Please Select--</option>
              {carTypes.map((vehicleType, index) => (
                <option key={index} value={vehicleType}>
                  {vehicleType}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Pickup Location
            </label>
            <input
              type="text"
              value={startLocation}
              onChange={(e) => setFromLocation(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Destination
            </label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setToDestination(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="form-button">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerRegisterForm;
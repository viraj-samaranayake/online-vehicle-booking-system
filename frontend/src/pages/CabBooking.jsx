import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CabBooking = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [address, setAddress] = useState('');
  const [driverId, setDriverId] = useState('');
  const [phone, setTelephone] = useState('');
  const [startLocation, setFromLocation] = useState('');
  const [destination, setToDestination] = useState('');
  const [carTypes, setCarTypes] = useState([]);
  const [selectedCar, setSelectedCar] = useState('');
  const [licensePlateNo, setLicensePlateNo] = useState('');
  const [status, setStatus] = useState('');
  const [cars, setCars] = useState([]);
  const [distance, setDistance] = useState(null); // State to store the generated random distance

  const [driverName, setDriverName] = useState('');

  const navigate = useNavigate();

  // Fetch customer details
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      const email = localStorage.getItem('email');
      if (email) {
        try {
          const response = await axios.get(
            `http://localhost:8081/customers/${email}`
          );
          const customer = response.data;
          setCustomerName(customer.name);
          setCustomerId(customer.id);
          setAddress(customer.address);
          setTelephone(customer.phone);
        } catch (error) {
          console.error('Error fetching customer details:', error);
        }
      }
    };
    fetchCustomerDetails();
  }, []);

  // Fetch car details
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:8081/admin/cars');
        setCars(response.data);

        // Extract unique vehicle types
        const uniqueCarTypes = [
          ...new Set(response.data.map((car) => car.vehicleType)),
        ];
        setCarTypes(uniqueCarTypes);
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    };
    fetchCars();
  }, []);


  const handleCarSelection = async (vehicleType) => {
    setSelectedCar(vehicleType);

    // Find all available cars of the selected type
    const availableCars = cars.filter(
      (car) => car.vehicleType === vehicleType && car.status === true
    );

    if (availableCars.length > 0) {
      // Randomly select a car from the available cars
      const randomCar =
        availableCars[Math.floor(Math.random() * availableCars.length)];

      // Set the license plate number and driver name of the randomly selected car
      setLicensePlateNo(randomCar.licensePlateNo);

      // Fetch the driver information for the selected car
      try {
        const response = await axios.get('http://localhost:8081/admin/drivers');
        const driver = response.data.find(
          (driver) =>
            driver.assignedCar.licensePlateNo === randomCar.licensePlateNo
        );

        if (driver) {
          setDriverName(driver.name); // Set the driver's name if found
          setDriverId(driver.id); // Set the driver's id
        } else {
          setDriverName('No driver assigned');
        }
      } catch (error) {
        console.error('Error fetching driver details:', error);
      }
    } else {
      setLicensePlateNo('No available cars');
      setDriverName('No driver assigned');
    }
  };

  // Handle booking submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Find available cars of selected type
    const availableCars = cars.filter(
      (car) => car.vehicleType === selectedCar && car.status === true
    );

    if (availableCars.length === 0) {
      setStatus('No available cars for the selected type.');
      return;
    }

    // Select the car that was already selected (random car)
    const selectedCarFromList = availableCars.find(
      (car) => car.licensePlateNo === licensePlateNo
    );

    if (!selectedCarFromList) {
      setStatus('Selected car is no longer available.');
      return;
    }

    const newBooking = {
      customerName,
      customerId,
      address,
      phone,
      driverId,
      driverName,
      vehicleType: selectedCar,
      licensePlateNo: selectedCarFromList.licensePlateNo, // Save the selected car’s license plate
      startLocation,
      destination,
      distance,
      bookingStatus: 'pending',
    };

    try {
      await axios.post('http://localhost:8081/bookings', newBooking);
      setStatus(`${customerName}, Your booking is successful!`);
      alert(`${customerName}, Your booking is successful!`);

      // Update the car's status to unavailable
      await axios.put(
        `http://localhost:8081/admin/cars/${selectedCarFromList.id}`,
        {
          ...selectedCarFromList,
          status: false,
        }
      );

      // Reset form fields
      setSelectedCar('');
      setLicensePlateNo('');
      setDriverName('');
      setFromLocation('');
      setToDestination('');
      setDistance(null); // Reset distance

      navigate(`/customer/bookings`);
    } catch (error) {
      console.error('Error occurred while booking:', error);
      setStatus('An error occurred while booking.');
    }
  };

  // Generate random distance when pickup or destination fields change
  useEffect(() => {
    if (startLocation && destination) {
      const randomDistance = Math.floor(Math.random() * 46) + 5; // Random number between 5 and 50
      setDistance(randomDistance);
    }
  }, [startLocation, destination]);

  return (
    <div className="main-div">
      <div className="form-card">
        <h2 className="text-2xl font-bold text-center text-yellow-500">
          Cab Booking
        </h2>
        {status && <p className="mt-2 text-center text-green-600">{status}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          {/* Customer Details */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Customer Name
            </label>
            <input
              type="text"
              readOnly
              value={customerName}
              className="form-input"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <input
              type="text"
              readOnly
              value={address}
              className="form-input"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Phone No
            </label>
            <input type="text" readOnly value={phone} className="form-input" />
          </div>

          {/* Vehicle Type Dropdown */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Vehicle Type
            </label>
            <select
              className="form-input"
              value={selectedCar}
              onChange={(e) => handleCarSelection(e.target.value)}
              required
            >
              <option value="">--Please Select--</option>
              {carTypes.map((vehicleType, index) => {
                const isAvailable = cars.some(
                  (car) =>
                    car.vehicleType === vehicleType && car.status === true
                );
                return (
                  <option
                    key={index}
                    value={vehicleType}
                    disabled={!isAvailable}
                    style={{ color: isAvailable ? 'green' : 'red' }} // Green for available, Red for unavailable
                  >
                    {vehicleType}{' '}
                    {isAvailable ? '(Available)' : '(Unavailable)'}
                  </option>
                );
              })}
            </select>
          </div>

          {/* License Plate No (Read-Only) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Assigned Vehicle
            </label>
            <input
              type="text"
              readOnly
              value={licensePlateNo}
              className="form-input"
            />
          </div>

          {/* Driver (Read-Only) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Assigned Driver
            </label>
            <input
              type="text"
              readOnly
              value={driverName}
              className="form-input"
            />
          </div>

          {/* Pickup Location */}
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

          {/* Destination */}
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

          {/* Distance (Read-Only) */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Estimated Distance (KM)
            </label>
            <input
              type="text"
              readOnly
              value={distance ? `${distance} KM` : 'N/A'}
              className="form-input"
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

export default CabBooking;

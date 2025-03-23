import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddDriver() {
  const [driver, setDriver] = useState({
    name: '',
    mobileNo: '',
    email: '',
    nicNo: '',
    assignedCar: { id: '' }, // This will store the selected car's ID in an object
    drivingLicenseNo: '',
    experienceYears: '',
  });

  const [cars, setCars] = useState([]); // To store the list of cars fetched from the API
  const [drivers, setDrivers] = useState([]); // To store the list of drivers
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriver({
      ...driver,
      [name]: value,
    });
  };

  // Fetch car data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const carResponse = await fetch('http://localhost:8081/admin/cars');
        const carData = await carResponse.json();

        const driverResponse = await fetch('http://localhost:8081/admin/drivers');
        const driverData = await driverResponse.json();

        if (carResponse.ok && driverResponse.ok) {
          setCars(carData);
          setDrivers(driverData);
        } else {
          setError('Failed to fetch cars or drivers.');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching data.');
      }
    };

    fetchData();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure that the selected car's id is passed as an object
    const driverData = {
      ...driver,
      assignedCar: { id: driver.assignedCar.id }, // Wrap the selected car ID in an object
    };

    try {
      const response = await fetch('http://localhost:8081/admin/drivers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(driverData),
      });

      if (response.ok) {
        setStatus('')
        alert('Driver added successfully!');
        navigate('/admin/drivers'); // Redirect to driver list after successful add
      } else {

      // Get the error text message from the API response
      const errorText = await response.text();
      console.log('Error Response:', errorText); // Log the error response text to the console

      // Display the error message based on the plain text response from the API
      if (errorText === 'This NIC already exists!') {
        setStatus('This NIC already exists!');
      } else if (errorText === 'This Email already exists!') {
        setStatus('This Email already exists!');
      } else if (errorText === 'This driving license already exists!') {
        setStatus('This driving license already exists!');
      } else {
        setError('Failed to add driver!'); // Default error message if none of the above
      }
    }

    } catch (error) {
      console.error('error occurred while adding the driver', error);
      setError('An error occurred while adding the driver.');
    }
  };

  // Filter cars that are not assigned to any driver
  const availableCars = cars.filter(
    (car) => !drivers.some((driver) => driver.assignedCar?.id === car.id)
  );

  return (
    <div className="main-div">
      <div className="form-card mt-16">
        <h2 className="text-2xl font-bold text-center text-yellow-500">
          Add New Driver
        </h2>

        {/* {error && <p className="text-red-600 text-center font-semibold m-4">{error}</p>} */}

        {status && <p className="text-red-600  text-center font-semibold m-4">{status}</p>}


        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mt-4">
          <div>
            <label htmlFor="name" className="block text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={driver.name}
              onChange={handleChange}
              placeholder="Enter name"
              autoFocus={true}
              required
              pattern="^[A-Za-z]+(?: [A-Za-z]+)?$"
              title="Enter a valid name only with letters"
              autoComplete="true"
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="nicNo" className="block text-gray-700">
              NIC No
            </label>
            <input
              type="text"
              name="nicNo"
              id="nicNo"
              value={driver.nicNo}
              onChange={handleChange}
              required
              pattern="^\d{9}[VX]$|^\d{12}$"
              title="Enter a valid NIC number: 9 digits followed by V or X, or 12 digits only"
              placeholder="Enter NIC No"
              className="form-input"
              autoComplete="true"
            />
          </div>

          <div>
            <label htmlFor="mobileNo" className="block text-gray-700">
              Mobile No
            </label>
            <input
              type="text"
              name="mobileNo"
              id="mobileNo"
              value={driver.mobileNo}
              onChange={handleChange}
              required
              pattern="^\d{10}$"
              title="Enter a valid 10-digit phone number"
              placeholder="Enter mobile number"
              className="form-input"
              autoComplete="true"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={driver.email}
              onChange={handleChange}
              required
              placeholder="Enter email address"
              className="form-input"
              autoComplete="true"
            />
          </div>

          <div>
            <label htmlFor="drivingLicenseNo" className="block text-gray-700">
              Driving License No
            </label>
            <input
              type="text"
              name="drivingLicenseNo"
              id="drivingLicenseNo"
              value={driver.drivingLicenseNo}
              onChange={handleChange}
              required
              pattern="^[A-Z]\d{7}$"
              title="Enter a valid driving license number (ex: B1234567)"
              placeholder="Enter license number"
              className="form-input"
              autoComplete="true"
            />
          </div>

          <div>
            <label htmlFor="experienceYears" className="block text-gray-700">
              Years of experience
            </label>
            <input
              type="number"
              name="experienceYears"
              id="experienceYears"
              value={driver.experienceYears}
              onChange={handleChange}
              required
              pattern="^[0-9]{1,2}$"
              title="Enter a valid number of years"
              placeholder="Enter experience years"
              className="form-input"
              autoComplete="true"
            />
          </div>

          <div>
            <label htmlFor="assignedCar" className="block text-gray-700">
              Assign Car
            </label>
            <select
              name="assignedCar"
              id="assignedCar"
              value={driver.assignedCar.id} // Access id from the object
              onChange={(e) => {
                setDriver({
                  ...driver,
                  assignedCar: { id: e.target.value }, // Store selected car id in an object
                });
              }}
              required
              className="form-input"
            >
              <option value="">Select Car</option>
              {availableCars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.brand} | {car.model} | {car.licensePlateNo}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="form-button">
            Add Driver
          </button>

          <button
            type="button"
            onClick={() => navigate(`/admin`)}
            className="mt-4 bg-gray-400 text-white w-full px-4 py-2 rounded-full hover:bg-gray-500 transition-all"
          >
          Back to Dashboard
          </button>
          
        </form>
      </div>
    </div>
  );
}

export default AddDriver;




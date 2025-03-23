import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateDriver() {
  const { id } = useParams(); // Get the driver ID from the URL
  const navigate = useNavigate();

  const [driver, setDriver] = useState({
    name: '',
    nicNo: '',
    mobileNo: '',
    email: '',
    drivingLicenseNo: '',
    assignedCar: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const response = await fetch(
          `http://localhost:8081/admin/drivers/${id}`
        );
        const data = await response.json();
        setDriver(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch driver details', error);
        setError('Failed to fetch driver details');
        setLoading(false);
      }
    };
    fetchDriver();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriver((prevDriver) => ({
      ...prevDriver,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    // if (!driver.name || !driver.nicNo || !driver.mobileNo || !driver.email) {
    //   setError('Please fill in all fields.');
    //   return;
    // }

    try {
      const response = await fetch(
        `http://localhost:8081/admin/drivers/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(driver),
        }
      );

      if (response.ok) {
        navigate(`/admin/drivers`); // Redirect to the driver list page after successful update
      } else {
        setError('Failed to update driver details');
      }
    } catch (error) {
      console.error('error occurred while updating the driver', error);
      setError('An error occurred while updating the driver');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen mt-20">
      <h1 className="text-3xl text-center font-semibold text-yellow-800 m-8">
        Update Driver
      </h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 justify-self-center">
        <div>
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={driver.name}
            onChange={handleChange}
            required
            pattern="^[A-Za-z]+(?: [A-Za-z]+)?$"
            title="Enter a valid name only with letters"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="nicNo" className="block text-gray-700">
            NIC No
          </label>
          <input
            readOnly
            type="text"
            id="nicNo"
            name="nicNo"
            value={driver.nicNo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="mobileNo" className="block text-gray-700">
            Mobile No
          </label>
          <input
            type="text"
            id="mobileNo"
            name="mobileNo"
            value={driver.mobileNo}
            onChange={handleChange}
            required
            pattern="^\d{10}$"
            title="Enter a valid 10-digit phone number"
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={driver.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        <div>
          <label htmlFor="drivingLicenseNo" className="block text-gray-700">
            Driving License No
          </label>
          <input
            type="text"
            id="drivingLicenseNo"
            name="drivingLicenseNo"
            value={driver.drivingLicenseNo}
            readOnly
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>

        {/* Assigned Car Details */}
        {driver.assignedCar && (
          <div>
            <h3 className="text-xl font-semibold mt-4">Assigned Car Details</h3>
            <div className="mt-2">
              <label htmlFor="vehicleType" className="block text-gray-700">
                Vehicle Type
              </label>
              <input
                readOnly
                type="text"
                id="vehicleType"
                name="vehicleType"
                value={driver.assignedCar.vehicleType}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mt-2">
              <label htmlFor="licensePlateNo" className="block text-gray-700">
                License Plate No
              </label>
              <input
                readOnly
                type="text"
                id="licensePlateNo"
                name="licensePlateNo"
                value={driver.assignedCar.licensePlateNo}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between mt-4 pt-4">
          <button
            type="submit"
            className="text-md mx-4 text-blue-600 bg-blue-50 outline outline-1 outline-blue-700 hover:bg-blue-200 px-4 py-2 rounded-full transition-all duration-200"
          >
            Update Driver
          </button>
          <button
            type="button"
            onClick={() => navigate(`/admin/drivers`)}
            className="text-md gap-4 text-gray-600 bg-gray-100 outline outline-1 outline-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateDriver;

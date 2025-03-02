import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddDriver() {
  const [driver, setDriver] = useState({
    name: '',
    mobileNo: '',
    email: '',
    nicNo: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriver({
      ...driver,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!driver.name || !driver.nicNo || !driver.mobileNo || !driver.email) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8081/admin/drivers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(driver),
      });

      if (response.ok) {
        alert('Driver added successfully!');
        navigate('/admin/drivers'); // Redirect to driver list after successful add
      } else {
        setError('Failed to add driver!');
      }
    } catch (error) {
      console.error('error occurred while adding the driver',error);
      setError('An error occurred while adding the driver.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="form-card">
      <h2 className="text-2xl font-bold text-center text-yellow-500">
        Add New Driver
      </h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
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
            autoComplete='true'
            pattern="^[A-Za-z]+$"
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
            //pattern='^[0-9]'
            value={driver.nicNo}
            onChange={handleChange}
            placeholder="Enter NIC No"
            className="form-input"
            autoComplete='true'
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
            pattern="[0-9]{10}"
            placeholder="Enter mobile number"
            className="form-input"
            autoComplete='true'
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
            placeholder="Enter email address"
            className="form-input"
            autoComplete='true'
          />
        </div>


        <button
            type="submit"
            className="form-button"
          >
            Add Driver
          </button>

      </form>
      </div>
    </div>
  );
}

export default AddDriver;

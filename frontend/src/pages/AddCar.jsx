import { useState } from 'react';
import axios from 'axios';

const AddCar = () => {

  const [vehicleType, setType] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [licensePlateNo, setLicenseNo] = useState('');

  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCar = {
      vehicleType,
      brand,
      model,
      licensePlateNo,
    };

    try {
      const response = await axios.post(
        'http://localhost:8081/admin/cars',
        newCar
      );
      alert(`Car '${response.data.licensePlateNo}' added successfull`);
      //setStatus(`Car '${response.data.licensePlateNo}' added successfull`);
      setType('');
      setBrand('');
      setModel('');
      setLicenseNo('');
    } catch (error) {
      console.error('error occurred while adding the car',error);
      setStatus('Error occurred while adding the car.');
    }
  };

  return (
    <div className="main-div">
      <div className="form-card">
        <h2 className="text-2xl font-bold text-center text-yellow-500">
          Add New Car
        </h2>
        {status && <p className="mt-2 text-center text-green-600">{status}</p>}
        <form onSubmit={handleSubmit} className="mt-4">

          <div className="mb-4">
            <label
              htmlFor="vehicleType"
              className="form-label"
            >
              Vehicle Type
            </label>
            {/* <input
              type="text"
              id="vehicleType"
              value={vehicleType}
              autoFocus="true"
              onChange={(e) => setType(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            /> */}
            <select 
            id="vehicleType" 
            value={vehicleType} 
            required
            onChange={(e) => setType(e.target.value)}
            className="form-input">
              <option value="">---</option>
              <option value="Car">Car</option>
              <option value="SUV">SUV</option>
              <option value="Mini Car">Mini-Car</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="brand"
              className="form-label"
            >
              Brand
            </label>
            <input
              type="text"
              id="brand"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              pattern="^[A-Za-z]+$"
              className="form-input"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="model"
              className="form-label"
            >
              Model
            </label>
            <input
              type="text"
              id="model"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="licensePlateNo"
              className="form-label"
            >
              License No
            </label>
            <input
              type="text"
              id="licensePlateNo"
              value={licensePlateNo}
              onChange={(e) => setLicenseNo(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button
            type="submit"
            className="form-button"
          >
            Add Car
          </button>
          </form>
      </div>
    </div>
  );
};

export default AddCar;

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// function AddDriver() {
//   const [driver, setDriver] = useState({
//     name: '',
//     mobileNo: '',
//     email: '',
//     nicNo: '',
//     assignedCar: { id: '' }, // This will store the selected car's ID in an object
//     drivingLicenseNo: '',
//     experienceYears: '',
//   });

//   const [cars, setCars] = useState([]); // To store the list of cars fetched from the API
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDriver({
//       ...driver,
//       [name]: value,
//     });
//   };

//   // Fetch car data from the API when the component mounts
//   useEffect(() => {
//     const fetchCars = async () => {
//       try {
//         const response = await fetch('http://localhost:8081/admin/cars');
//         if (response.ok) {
//           const carData = await response.json();
//           setCars(carData); // Assuming the response is an array of car objects
//         } else {
//           setError('Failed to fetch cars.');
//         }
//       } catch (error) {
//         console.error('Error fetching cars:', error);
//         setError('An error occurred while fetching cars.');
//       }
//     };

//     fetchCars();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Ensure that the selected car's id is passed as an object
//     const driverData = {
//       ...driver,
//       assignedCar: { id: driver.assignedCar }, // Wrap the selected car ID in an object
//     };

//     try {
//       const response = await fetch('http://localhost:8081/admin/drivers', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(driverData),
//       });

//       if (response.ok) {
//         alert('Driver added successfully!');
//         navigate('/admin/drivers'); // Redirect to driver list after successful add
//       } else {
//         setError('Failed to add driver!');
//       }
//     } catch (error) {
//       console.error('error occurred while adding the driver', error);
//       setError('An error occurred while adding the driver.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <div className="form-card">
//         <h2 className="text-2xl font-bold text-center text-yellow-500">
//           Add New Driver
//         </h2>

//         {error && <p className="text-red-600 mb-4">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
//           <div>
//             <label htmlFor="name" className="block text-gray-700">
//               Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               id="name"
//               value={driver.name}
//               onChange={handleChange}
//               placeholder="Enter name"
//               autoFocus={true}
//               required
//               pattern="^[A-Za-z]{3,}$"
//               title="Enter a valid name with at least 3 letters"
//               autoComplete="true"
//               className="form-input"
//             />
//           </div>

//           <div>
//             <label htmlFor="nicNo" className="block text-gray-700">
//               NIC No
//             </label>
//             <input
//               type="text"
//               name="nicNo"
//               id="nicNo"
//               value={driver.nicNo}
//               onChange={handleChange}
//               required
//               pattern="^\d{9}[VX]$|^\d{12}$"
//               title="Enter a valid NIC number: 8 digits followed by V or X, or 12 digits only"
//               placeholder="Enter NIC No"
//               className="form-input uppercase"
//               autoComplete="true"
//             />
//           </div>

//           <div>
//             <label htmlFor="mobileNo" className="block text-gray-700">
//               Mobile No
//             </label>
//             <input
//               type="text"
//               name="mobileNo"
//               id="mobileNo"
//               value={driver.mobileNo}
//               onChange={handleChange}
//               required
//               pattern="^\d{10}$"
//               title="Enter a valid 10-digit phone number"
//               placeholder="Enter mobile number"
//               className="form-input"
//               autoComplete="true"
//             />
//           </div>

//           <div>
//             <label htmlFor="email" className="block text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               name="email"
//               id="email"
//               value={driver.email}
//               onChange={handleChange}
//               required
//               placeholder="Enter email address"
//               className="form-input"
//               autoComplete="true"
//             />
//           </div>

//           <div>
//             <label htmlFor="drivingLicenseNo" className="block text-gray-700">
//               Driving License No
//             </label>
//             <input
//               type="text"
//               name="drivingLicenseNo"
//               id="drivingLicenseNo"
//               value={driver.drivingLicenseNo}
//               onChange={handleChange}
//               required
//               pattern="^\d{10}$"
//               title="Enter a valid 10-digit driving license number"
//               placeholder="Enter license number"
//               className="form-input"
//               autoComplete="true"
//             />
//           </div>

//           <div>
//             <label htmlFor="experienceYears" className="block text-gray-700">
//               Years of experience
//             </label>
//             <input
//               type="number"
//               name="experienceYears"
//               id="experienceYears"
//               value={driver.experienceYears}
//               onChange={handleChange}
//               required
//               pattern="^[0-9]\d{2}*$"
//               title="Enter a valid number of years"
//               placeholder="Enter license number"
//               className="form-input"
//               autoComplete="true"
//             />
//           </div>

//           <div>
//             <label htmlFor="assignedCar" className="block text-gray-700">
//               Assign Car
//             </label>
//             <select
//               name="assignedCar"
//               id="assignedCar"
//               value={driver.assignedCar.id} // Access id from the object
//               onChange={(e) => {
//                 setDriver({
//                   ...driver,
//                   assignedCar: { id: e.target.value }, // Store selected car id in an object
//                 });
//               }}
//               required
//               className="form-input"
//             >
//               <option value="">Select Car</option>
//               {cars.map((car) => (
//                 <option key={car.id} value={car.id}>
//                   {car.brand} {car.model} | {car.licensePlateNo}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <button type="submit" className="form-button">
//             Add Driver
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default AddDriver;





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
  const [error, setError] = useState('');
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
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:8081/admin/cars');
        if (response.ok) {
          const carData = await response.json();
          setCars(carData); // Assuming the response is an array of car objects
        } else {
          setError('Failed to fetch cars.');
        }
      } catch (error) {
        console.error('Error fetching cars:', error);
        setError('An error occurred while fetching cars.');
      }
    };

    fetchCars();
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
        alert('Driver added successfully!');
        navigate('/admin/drivers'); // Redirect to driver list after successful add
      } else {
        setError('Failed to add driver!');
      }
    } catch (error) {
      console.error('error occurred while adding the driver', error);
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
              required
              pattern="^[A-Za-z]{3,}$"
              title="Enter a valid name with at least 3 letters"
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
              className="form-input uppercase"
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
              pattern="^\d{16}$"
              title="Enter a valid driving license number"
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
              pattern="^[0-9]\d{2}*$"
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
              {cars.map((car) => (
                <option key={car.id} value={car.id}>
                  {car.brand} {car.model} | {car.licensePlateNo}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="form-button">
            Add Driver
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddDriver;

// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';

// function UpdateCar() {
//   const { id } = useParams(); // Get the car ID from the URL
//   const navigate = useNavigate();
  
//   const [car, setCar] = useState({
//     vehicleType: '',
//     brand: '',
//     model: '',
//     licensePlateNo: '',
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchCar = async () => {
//       try {
//         const response = await fetch(`http://localhost:8081/admin/cars/${id}`);
//         const data = await response.json();
//         setCar(data);
//         setLoading(false);
//       } catch (error) {
//         setError('Failed to fetch car details');
//         setLoading(false);
//       }
//     };
//     fetchCar();
//   }, [id]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCar((prevCar) => ({
//       ...prevCar,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate form data
//     if (!car.vehicleType || !car.brand || !car.model || !car.licensePlateNo) {
//       setError('Please fill in all fields.');
//       return;
//     }
    
//     try {
//       const response = await fetch(`http://localhost:8081/admin/cars/${id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(car),
//       });

//       if (response.ok) {
//         navigate(`/admin/cars`); // Redirect to the driver list page after successful update
//       } else {
//         setError('Failed to update car details');
//       }
//     } catch (error) {
//       setError('An error occurred while updating the car');
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mx-auto p-4 min-h-screen">
//       <h1 className="text-3xl text-center font-semibold text-yellow-800 m-8">Update Car</h1>

//       {error && <p className="text-red-600 mb-4">{error}</p>}


//       <form onSubmit={handleSubmit} className="space-y-4">


//       <div>
//       {/* Toggle button for status */}
//       <button
//         onClick
//         className={`py-2 px-10 my-8 rounded-full text-white ${car.status ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} transition-all duration-200`}
//       >
//         {car.status ? 'Set as Busy' : 'Set as Available'}
//       </button>
//       </div>


//         <div>
//           <label htmlFor="vehicleType" className="block text-gray-700">Vehicle Type</label>
//           <input
//             type="text"
//             id="vehicleType"
//             name="vehicleType"
//             value={car.vehicleType}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//           />
//         </div>

//         <div>
//           <label htmlFor="brand" className="block text-gray-700">Brand</label>
//           <input
//             type="text"
//             id="brand"
//             name="brand"
//             value={car.brand}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//           />
//         </div>

//         <div>
//           <label htmlFor="model" className="block text-gray-700">Model</label>
//           <input
//             type="text"
//             id="model"
//             name="model"
//             value={car.model}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//           />
//         </div>

//         <div>
//           <label htmlFor="licensePlateNo" className="block text-gray-700">License No</label>
//           <input
//             type="text"
//             id="licensePlateNo"
//             name="licensePlateNo"
//             value={car.licensePlateNo}
//             onChange={handleChange}
//             className="w-full p-2 border border-gray-300 rounded-lg"
//           />
//         </div>

//         <div className="flex justify-between mt-4 pt-4">
//           <button
//             type="submit"
//             className="text-md text-blue-600 bg-blue-50 outline outline-1 outline-blue-700 hover:bg-blue-200 px-4 py-2 rounded-full transition-all duration-200"
//           >
//             Update Car
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate(`/admin/cars`)}
//             className="text-md text-gray-600 bg-gray-100 outline outline-1 outline-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full transition-all duration-200"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default UpdateCar;












import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateCar() {
  const { id } = useParams(); // Get the car ID from the URL
  const navigate = useNavigate();
  
  const [car, setCar] = useState({
    // vehicleType: '',
    brand: '',
    model: '',
    licensePlateNo: '',
    status: false, // Add the status field here
  });
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:8081/admin/cars/${id}`);
        const data = await response.json();
        setCar(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch car details',error);
        setError('Failed to fetch car details');
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar((prevCar) => ({
      ...prevCar,
      [name]: value,
    }));
  };

  const handleStatusToggle = async () => {
    try {
      // Toggle the status (Available <-> Busy)
      const updatedStatus = !car.status;

      // Update the status in the local state
      setCar((prevCar) => ({
        ...prevCar,
        status: updatedStatus,
      }));

      // Send the updated status to the server
      // const response = await fetch(`http://localhost:8081/admin/cars/${id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ ...car, status: updatedStatus }),
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to update status');
      // }
    } catch (error) {
      console.error('Failed to update car status',error);
      setError('Failed to update car status');
    }
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!car.vehicleType || !car.brand || !car.model || !car.licensePlateNo) {
      setError('Please fill in all fields.');
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:8081/admin/cars/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(car),
      });

      if (response.ok) {
        alert('Car updated successfull');
        navigate(`/admin/cars`); // Redirect to the driver list page after successful update
      } else {
        setError('Failed to update car details');
      }
    } catch (error) {
      console.error('Error occurred while updating the car',error);
      setError('An error occurred while updating the car');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 min-h-screen mt-20">
    
      <h1 className="text-3xl text-center font-semibold text-yellow-800 m-8">Update Car</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">

        <div className='flex items-center gap-6'>
          {/* Toggle button for status */}
          <button
            type="button"
            onClick={handleStatusToggle}
            className={`py-2 px-8 my-8 rounded-full ${car.status ? 'border text-red-800 border-red-600 bg-red-200 hover:bg-red-300' : 'border text-green-800 border-green-600 bg-green-200 hover:bg-green-300'} transition-all duration-200`}
          >
            {car.status ? 'Set as Busy' : 'Set as Available'}
          </button>
          <label className="block text-gray-700">Now:&nbsp;<span className={`inline-block w-3.5 h-3.5 rounded-full mr-2 ${car.status ? 'bg-green-500' : 'bg-red-500'}`}></span><span className='font-bold'>{car.status ? 'Available':'Busy'}</span></label>

        </div>

        <div>
        <label htmlFor="vehicleType" className="block text-gray-700">Type</label>
            <select 
            id="vehicleType" 
            name="vehicleType"
            value={car.vehicleType} 
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg">
              <option value="Car">Car</option>
              <option value="SUV">SUV</option>
              <option value="Mini Car">Mini-Car</option>
            </select>
        </div>

        <div>
          <label htmlFor="brand" className="block text-gray-700">Brand</label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={car.brand}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="model" className="block text-gray-700">Model</label>
          <input
            type="text"
            id="model"
            name="model"
            value={car.model}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div>
          <label htmlFor="licensePlateNo" className="block text-gray-700">License No</label>
          <input
            type="text"
            id="licensePlateNo"
            name="licensePlateNo"
            value={car.licensePlateNo}
            onChange={handleChange}
            required
            className="w-full p-2 border border-gray-300 rounded-lg"
          />
        </div>

        <div className="flex justify-between mt-4 pt-4">
          <button
            type="submit"
            className="text-md text-blue-600 bg-blue-50 outline outline-1 outline-blue-700 hover:bg-blue-200 px-4 py-2 rounded-full transition-all duration-200"
          >
            Update Car
          </button>
          <button
            type="button"
            onClick={() => navigate(`/admin/cars`)}
            className="text-md text-gray-600 bg-gray-100 outline outline-1 outline-gray-700 hover:bg-gray-200 px-4 py-2 rounded-full transition-all duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default UpdateCar

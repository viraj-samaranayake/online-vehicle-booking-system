import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ViewCar() {

  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [carToDelete, setCarToDelete] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      const response = await fetch('http://localhost:8081/admin/cars');
      const data = await response.json();
      setCars(data);
      setFilteredCars(data);
    };

    fetchCars();
  }, []);

  useEffect(() => {
    // Filter cars based on model when search query changes
    setFilteredCars(
      cars.filter(car => car.model.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, cars]);

  const deleteCar = async () => {
    if (carToDelete) {
      const response = await fetch(`http://localhost:8081/admin/cars/${carToDelete.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCars(cars.filter(car => car.id !== carToDelete.id));
        setFilteredCars(filteredCars.filter(car => car.id !== carToDelete.id));
        setShowDeleteModal(false);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 min-h-screen mt-20">
      <h1 className="text-3xl text-center font-semibold text-yellow-800 m-8">Vehicle List</h1>
      {/* <Link to={'/admin'} className='p-8'><FaBackwardStep/></Link> */}
    
      <input
        type="text"
        placeholder="Search by car model"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className=" search-input"
      />
      
      {filteredCars.length === 0 ? (
        <p className="text-gray-500">No cars found.</p>
      ) : (
        <div className="vehicle-card">
          {filteredCars.map(car => (

            <div key={car.id} className={`bg-white rounded-lg shadow-lg p-4 flex flex-col space-y-4 ${car.status ? 'border-[2px] border-l-green-500' : 'border border-l-red-500'}`}>
              <div className="text-xl font-medium text-gray-700">
              <span className="font-bold">{car.brand} </span><span className="text-gray-500">({car.model})</span>
              </div>
              <div className="text-gray-600 font-medium">
                <p>Type: {car.vehicleType}</p>
                <p>License: {car.licensePlateNo}</p>

                <p>Status: 
                  &nbsp;<span
                    className={`inline-block w-3.5 h-3.5 rounded-full mr-2 ${car.status ? 'bg-green-500' : 'bg-red-500'}`}
                  ></span>
                  {car.status ? 'Available' : 'Busy'}
                </p>

              </div>
              <div className="flex justify-between items-center mt-auto">
                <Link
                  to={`/admin/cars/${car.id}`}
                  className="car-updatelink"
                >
                  Update
                </Link>
                <button
                  onClick={() => {
                    setCarToDelete(car);
                    setShowDeleteModal(true);
                  }}
                  className="text-md text-red-600 bg-white outline outline-1 outline-red-500 hover:bg-red-200 px-3 py-1 rounded-full transition-all duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
            <p className="text-gray-700 mb-6">Are you sure, you want to delete this car?</p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-white bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={deleteCar}
                className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ViewCar













// import { useEffect, useState } from 'react';
// import { FaBackwardStep } from 'react-icons/fa6';
// import { Link } from 'react-router-dom';

// function ViewCar() {

//   const [cars, setCars] = useState([]);
//   const [filteredCars, setFilteredCars] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [carToDelete, setCarToDelete] = useState(null);

//   useEffect(() => {
//     const fetchCars = async () => {
//       const response = await fetch('http://localhost:8081/admin/cars');
//       const data = await response.json();
//       setCars(data);
//       setFilteredCars(data);
//     };

//     fetchCars();
//   }, []);

//   useEffect(() => {
//     // Filter cars based on model when search query changes
//     setFilteredCars(
//       cars.filter(car => car.model.toLowerCase().includes(searchQuery.toLowerCase()))
//     );
//   }, [searchQuery, cars]);

//   const deleteCar = async () => {
//     if (carToDelete) {
//       const response = await fetch(`http://localhost:8081/admin/cars/${carToDelete.id}`, {
//         method: 'DELETE',
//       });
//       if (response.ok) {
//         setCars(cars.filter(car => car.id !== carToDelete.id));
//         setFilteredCars(filteredCars.filter(car => car.id !== carToDelete.id));
//         setShowDeleteModal(false);
//       }
//     }
//   };

//   const toggleCarStatus = async (car) => {
//     const updatedCar = { ...car, status: !car.status };

//     // Update status locally first
//     setCars(cars.map(c => c.id === car.id ? updatedCar : c));
//     setFilteredCars(filteredCars.map(c => c.id === car.id ? updatedCar : c));

//     // Send request to update status on the backend
//     const response = await fetch(`http://localhost:8081/admin/cars/${car.id}/status`, {
//       method: 'PUT',
//       body: JSON.stringify({ status: updatedCar.status }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (!response.ok) {
//       // If the update fails, revert the status back
//       setCars(cars);
//       setFilteredCars(filteredCars);
//     }
//   };

//   return (
//     <div className="container mx-auto p-4 min-h-screen">
//       <h1 className="text-3xl text-center font-semibold text-yellow-800 m-8">Vehicle List</h1>
//       <Link to={'/admin'} className='p-8'><FaBackwardStep/></Link>
    
//       <input
//         type="text"
//         placeholder="Search by car model"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         className=" mb-6 py-2 px-3 border outline-yellow-200 border-gray-300 rounded-full w-full md:w-1/3"
//       />
      
//       {filteredCars.length === 0 ? (
//         <p className="text-gray-500">No cars found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filteredCars.map(car => (
//             <div key={car.id} className="bg-white rounded-lg shadow-lg p-4 flex flex-col space-y-4">
//               <div className="text-xl font-medium text-gray-700">
//                 {car.brand} <span className="text-gray-500">({car.model})</span>
//               </div>
//               <div className="text-gray-600 font-medium">
//                 <p>Type: {car.vehicleType}</p>
//                 <p>License: {car.licensePlateNo}</p>
//                 <p>Status: 
//                   {/* Displaying status with colored dot */}
//                   <span
//                     className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${car.status ? 'bg-green-500' : 'bg-red-500'}`}
//                   ></span>
//                   {car.status ? 'Available' : 'Busy'}
//                 </p>
//               </div>
              
//               {/* Toggle button for status */}
//               <button
//                 onClick={() => toggleCarStatus(car)}
//                 className={`w-1/2 py-2 px-4 rounded-full text-white ${car.status ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} transition-all duration-200`}
//               >
//                 {car.status ? 'Set as Busy' : 'Set as Available'}
//               </button>

//               <div className="flex justify-between items-center mt-auto">
//                 <Link
//                   to={`/admin/cars/${car.id}`}
//                   className="text-md text-blue-600 bg-white outline outline-1 outline-blue-500 hover:bg-blue-100 px-3 py-1 rounded-full transition-all duration-200"
//                 >
//                   Update
//                 </Link>
//                 <button
//                   onClick={() => {
//                     setCarToDelete(car);
//                     setShowDeleteModal(true);
//                   }}
//                   className="text-md text-red-600 bg-white outline outline-1 outline-red-500 hover:bg-red-200 px-3 py-1 rounded-full transition-all duration-200"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && (
//         <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Deletion</h3>
//             <p className="text-gray-700 mb-6">Are you sure, you want to delete this car?</p>
//             <div className="flex justify-between">
//               <button
//                 onClick={() => setShowDeleteModal(false)}
//                 className="text-white bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded-full"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={deleteCar}
//                 className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full"
//               >
//                 Confirm Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ViewCar;

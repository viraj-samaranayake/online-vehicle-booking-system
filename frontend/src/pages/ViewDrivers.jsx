import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ViewDriver() {
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [driverToDelete, setDriverToDelete] = useState(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      const response = await fetch('http://localhost:8081/admin/drivers');
      const data = await response.json();
      setDrivers(data);
      setFilteredDrivers(data);
    };

    fetchDrivers();
  }, []);

  useEffect(() => {
    // Filter drivers based on NIC No when search query changes
    setFilteredDrivers(
      drivers.filter(driver => driver.nicNo.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery, drivers]);

  const deleteDriver = async () => {
    if (driverToDelete) {
      const response = await fetch(`http://localhost:8081/admin/drivers/${driverToDelete.id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setDrivers(drivers.filter(driver => driver.id !== driverToDelete.id));
        setFilteredDrivers(filteredDrivers.filter(driver => driver.id !== driverToDelete.id));
        setShowDeleteModal(false);
      }
    }
  };
// container mx-auto p-4 min-h-screen
  return (
    <div className="container mx-auto p-4 min-h-screen mt-20">
      <h1 className="text-3xl text-center font-semibold text-yellow-800 m-8">Driver List</h1>
      
      <input
        name='search'
        type="number"
        placeholder="Search by NIC"
        value={searchQuery}
        pattern='^[0-9]+$'
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      
      {filteredDrivers.length === 0 ? (
        <p className="text-gray-500">No drivers found.</p>
      ) : (
        <div className="driver-card">
          {filteredDrivers.map(driver => (
            <div key={driver.id} className="bg-white rounded-lg shadow-lg p-4 flex flex-col space-y-4">
              <div className="text-xl font-semibold text-gray-700">
                {driver.name} <span className="text-gray-500 font-medium"> &nbsp;NIC: {driver.nicNo}</span>
              </div>
              <div className="text-gray-600">
                <p>Mobile: {driver.mobileNo}</p>
                <p>Email: {driver.email}</p>
              </div>
              <div className="flex justify-between items-center mt-auto">
                <Link
                  to={`/admin/drivers/${driver.id}`}
                  className="text-md text-blue-600 bg-white outline outline-1 outline-blue-500 hover:bg-blue-100 px-3 py-1 rounded-full transition-all duration-200"
                >
                  Update
                </Link>
                <button
                  onClick={() => {
                    setDriverToDelete(driver);
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
            <p className="text-gray-700 mb-6">Are you sure, you want to delete this driver?</p>
            <div className="flex justify-between">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-white bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded-full"
              >
                Cancel
              </button>
              <button
                onClick={deleteDriver}
                className="text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewDriver;

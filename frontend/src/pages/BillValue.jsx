import { useEffect, useState } from 'react';

const BillValue = () => {
  const [billValues, setBillValues] = useState([]);
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [formData, setFormData] = useState({
    vehicleType: '',
    firstTwentyPerKm: '',
    twentyPlusPerKm: '',
    tax: '',
    discount: ''
  });
  const [editingId, setEditingId] = useState(null);

 // Fetch vehicle types
useEffect(() => {
    const fetchCarTypes = async () => {
      try {
        const response = await fetch('http://localhost:8081/admin/cars');
        const data = await response.json();
        
        // Use Set to filter out duplicates and then convert back to array
        const uniqueVehicleTypes = [...new Set(data.map(car => car.vehicleType))];
        setVehicleTypes(uniqueVehicleTypes); // Set unique vehicle types in state
      } catch (error) {
        console.error('Error fetching car types:', error);
      }
    };
    fetchCarTypes();
  }, []);

  // Fetch bill values
  useEffect(() => {
    const fetchBillValues = async () => {
      try {
        const response = await fetch('http://localhost:8081/admin/billvalues');
        const data = await response.json();
        setBillValues(data);
      } catch (error) {
        console.error('Error fetching bill values:', error);
      }
    };
    fetchBillValues();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle add or update bill value
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `http://localhost:8081/admin/billvalues/${editingId}` : 'http://localhost:8081/admin/billvalues';
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const newBillValue = await response.json();
      setBillValues(editingId ? billValues.map(bv => (bv.id === editingId ? newBillValue : bv)) : [...billValues, newBillValue]);
      setFormData({ vehicleType: '', firstTwentyPerKm: '', twentyPlusPerKm: '', tax: '', discount: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving bill value:', error);
    }
  };

  // Handle edit
  const handleEdit = (bill) => {
    setFormData(bill);
    setEditingId(bill.id);
  };

  // Handle delete
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8081/admin/billvalues/${id}`, { method: 'DELETE' });
      setBillValues(billValues.filter(bv => bv.id !== id));
    } catch (error) {
      console.error('Error deleting bill value:', error);
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen mt-20">
      <h1 className="text-4xl font-semibold mb-6 text-center text-yellow-700">Manage Bill Values</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select name="vehicleType" value={formData.vehicleType} onChange={handleChange} className="border p-2 rounded">
            <option value="">Select Vehicle Type</option>
            {vehicleTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <input type="number" name="firstTwentyPerKm" placeholder="First 20 km Price" value={formData.firstTwentyPerKm} onChange={handleChange} className="border p-2 rounded" required />
          <input type="number" name="twentyPlusPerKm" placeholder="20+ km Price" value={formData.twentyPlusPerKm} onChange={handleChange} className="border p-2 rounded" required />
          <input type="number" name="tax" placeholder="Tax (%)" value={formData.tax} onChange={handleChange} className="border p-2 rounded" required />
          <input type="number" name="discount" placeholder="Discount (%)" value={formData.discount} onChange={handleChange} className="border p-2 rounded" required />
        </div>
        <button type="submit" className="mt-4 bg-yellow-700 text-white px-4 py-2 rounded-lg hover:bg-yellow-800">{editingId ? 'Update' : 'Add'} Bill Value</button>
      </form>
      <table className="w-full bg-white rounded-lg shadow-lg">
        <thead>
          <tr className="bg-yellow-700 text-white">
            <th className="p-3">Vehicle Type</th>
            <th className="p-3">First 20 km</th>
            <th className="p-3">20+ km</th>
            <th className="p-3">Tax (%)</th>
            <th className="p-3">Discount (%)</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {billValues.map(bill => (
            <tr key={bill.id} className="border-t">
              <td className="p-3">{bill.vehicleType}</td>
              <td className="p-3">{bill.firstTwentyPerKm}</td>
              <td className="p-3">{bill.twentyPlusPerKm}</td>
              <td className="p-3">{bill.tax}</td>
              <td className="p-3">{bill.discount}</td>
              <td className="p-3 flex gap-2">
                <button onClick={() => handleEdit(bill)} className="bg-blue-400 text-white px-3 py-1 rounded hover:bg-blue-500">Edit</button>
                <button onClick={() => handleDelete(bill.id)} className="bg-red-400 text-white px-3 py-1 rounded hover:bg-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BillValue;

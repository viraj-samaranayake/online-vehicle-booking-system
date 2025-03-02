// import { FiCreditCard } from 'react-icons/fi';


// const Bill = () => {


//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100">
//       <div className=" max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg w-96">
//         <h2 className="text-2xl font-bold text-center text-yellow-500">
//           Customer Bill
//         </h2>


//         <p className="mt-2 text-center text-yellow-500">Your Bill</p>

//           <div className="mb-4">
//             <label
//               className="block text-sm font-medium text-gray-700"
//             >
//               Start Location: {data.pickupLocation}
//             </label>

//           </div>

//           <div className="mb-4">
//             <label
//               className="block text-sm font-medium text-gray-700"
//             >
//               Destination
//             </label>

//           </div>

//           <div className="mb-4">
//             <label
//               className="block text-sm font-medium text-gray-700"
//             >
//               Distance
//             </label>

//           </div>

//           <div className="mb-4">
//             <label
//               className="block text-sm font-medium text-gray-700"
//             >
//               Tax Rs: 
//             </label>

//           </div>

//           <div className="mb-4">
//             <label
//               className="block text-sm font-medium text-gray-700"
//             >
//               Total Rs: 
//             </label>

//           </div>

//           <button
//             type="submit"
//             className="flex items-center justify-center w-full py-2 px-4 bg-yellow-500 text-white font-semibold 
//             rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-1 focus:ring-yellow-500"
//           >
//             Pay &nbsp; <FiCreditCard/>
//           </button>

//       </div>
//     </div>
//   )
// }

// export default Bill



import { useState, useEffect } from 'react';
import { FiCreditCard } from 'react-icons/fi';

const Bill = () => {
  // State to hold the bill data
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch bill data when the component mounts or customerId changes
  useEffect(() => {
    const fetchBillData = async () => {
      try {
        const response = await fetch(`http://localhost:8081/bills/679dffb1a0fa7c596cffeeb6`);
        if (!response.ok) {
          throw new Error('Failed to fetch bill data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBillData();
  }, []);

  if (loading) {
    return (
      <div className="main-div">
        <div className="w-96 text-center text-yellow-500">
          Loading bill details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-div">
        <div className="w-96 text-center text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="main-div">
        <div className="w-96 text-center text-yellow-500">
          No bill data available for this customer.
        </div>
      </div>
    );
  }

  return (
    <div className="main-div">
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg w-96">
        <h2 className="text-2xl font-bold text-center text-yellow-500">
          Customer Bill
        </h2>

        <p className="mt-2 text-center text-yellow-500">Your Bill</p>

        <div className="mb-4">
          <label className="form-label">
            Customer Name: {data.customerName}
          </label>
        </div>

        <div className="mb-4">
          <label className="form-label">
            Phone: {data.phone}
          </label>
        </div>

        <div className="mb-4">
          <label className="form-label">
            Address: {data.address}
          </label>
        </div>

        <div className="mb-4">
          <label className="form-label">
            Start Location: {data.pickupLocation}
          </label>
        </div>

        <div className="mb-4">
          <label className="form-label">
            Destination: {data.destination}
          </label>
        </div>

        <div className="mb-4">
          <label className="form-label">
            Distance: {data.distance} km
          </label>
        </div>

        <div className="mb-4">
          <label className="form-label">
            Tax Rs: {data.tax}
          </label>
        </div>

        <div className="mb-4">
          <label className="form-label">
            Discount Rs: {data.discount}
          </label>
        </div>

        <div className="mb-4">
          <label className="form-label">
            Total Rs: {data.total}
          </label>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center w-full py-2 px-4 bg-yellow-500 text-white font-semibold 
            rounded-full hover:bg-yellow-600 focus:outline-none focus:ring-1 focus:ring-yellow-500"
        >
          Print Bill &nbsp; <FiCreditCard />
        </button>
      </div>
    </div>
  )
}

export default Bill

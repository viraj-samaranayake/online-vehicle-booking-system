import { Link } from "react-router-dom";

const ReportsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-4">
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-24">
        <h2 className="text-3xl font-semibold text-center text-yellow-800 mb-4">
          Generate Report
        </h2>
        {/* Add report generation form or options here */}
        <div className="flex justify-center items-center min-h-screen space-x-4 font-semibold">

          <Link to="/admin/reports/vehicle" className="px-6 py-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300">
            Generate Vehicle Report
          </Link>
          <Link to="/admin/reports/driver" className="px-6 py-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
            Generate Driver Report
          </Link>
          <Link to="/admin/reports/customer" className="px-6 py-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300">
            Generate Customer Report
          </Link>
          <Link to="/admin/reports/booking" className="px-6 py-6 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300">
            Generate Booking Report
          </Link>
          <Link to="/admin/reports/revenue" className="px-6 py-6 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300">
            Generate Revenue Report
          </Link>
          <Link to="/admin/reports/revenue-graph" className="px-6 py-6 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300">
            Generate Revenue Graph
          </Link>
        </div>
        <Link to="/admin" className="py-3 px-4 bg-gray-400 text-white mr-6 rounded hover:bg-gray-500 transition-all">
            Back
          </Link>
      </div>
    </div>
  );
}

export default ReportsPage;

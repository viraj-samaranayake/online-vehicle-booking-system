import { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const RevenueReport = () => {
  const [revenues, setRevenues] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    route: '',
  });

  // Fetching the revenue report data
  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const bookingsResponse = await axios.get(
          'http://localhost:8081/bookings'
        );
        const billsResponse = await axios.get('http://localhost:8081/bills');
        const revenueData = calculateRevenue(
          bookingsResponse.data,
          billsResponse.data
        );
        setRevenues(revenueData);
        setTotalRevenue(revenueData.reduce((acc, item) => acc + item.total, 0));
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchRevenueData();
  }, []);

  const calculateRevenue = (bookings, bills) => {
    return bookings.map((booking) => {
      const bill = bills.find((bill) => bill.bookingId === booking.id);
      return {
        ...booking,
        total: bill?.total || 0,
        discount: bill?.discount || 0,
        route: `${booking.startLocation} - ${booking.destination}`,
      };
    });
  };

  const handleDateFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filteredRevenue = revenues.filter((revenue) => {
    const isAfterStartDate =
      new Date(revenue.createdDateTime) >= new Date(filters.startDate);
    const isBeforeEndDate =
      new Date(revenue.createdDateTime) <= new Date(filters.endDate);
    const isInRoute = revenue.route
      .toLowerCase()
      .includes(filters.route.toLowerCase());
    return isAfterStartDate && isBeforeEndDate && isInRoute;
  });

  const calculateTotalRevenueByPeriod = (period) => {
    const now = new Date();
    const filteredByPeriod = revenues.filter((revenue) => {
      const revenueDate = new Date(revenue.createdDateTime);
      if (period === 'daily') {
        return revenueDate.toDateString() === now.toDateString();
      }
      if (period === 'weekly') {
        const startOfWeek = now.getDate() - now.getDay(); // start of the current week
        return revenueDate >= new Date(now.setDate(startOfWeek));
      }
      if (period === 'monthly') {
        return (
          revenueDate.getMonth() === now.getMonth() &&
          revenueDate.getFullYear() === now.getFullYear()
        );
      }
      return false;
    });

    return filteredByPeriod.reduce((total, item) => total + item.total, 0);
  };

  // Function to Export to CSV
  const exportToCSV = () => {
    const csvData = filteredRevenue.map((revenue) => ({
      Route: revenue.route,
      Revenue: revenue.total,
      Discount: revenue.discount,
      Total: revenue.total - revenue.discount,
    }));

    const csvFile = XLSX.utils.json_to_sheet(csvData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, csvFile, 'Revenue Report');
    const excelBuffer = XLSX.write(wb, { bookType: 'csv', type: 'array' });

    const file = new Blob([excelBuffer], { type: 'text/csv' });
    saveAs(file, 'revenue_report.csv');
  };

  // Function to Export to Excel
  const exportToExcel = () => {
    const excelData = filteredRevenue.map((revenue) => ({
      Route: revenue.route,
      Revenue: revenue.total,
      Discount: revenue.discount,
      Total: revenue.total - revenue.discount,
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Revenue Report');
    XLSX.writeFile(wb, 'revenue_report.xlsx');
  };

  // Function to Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Revenue Report', 20, 20);

    // Adding headers
    doc.setFontSize(12);
    doc.text('Route', 20, 30);
    doc.text('Revenue', 80, 30);
    doc.text('Discount', 140, 30);
    doc.text('Total', 200, 30);

    // Adding data rows
    filteredRevenue.forEach((revenue, index) => {
      const y = 40 + index * 10;
      doc.text(revenue.route, 20, y);
      doc.text(revenue.total.toString(), 80, y);
      doc.text(revenue.discount.toString(), 140, y);
      doc.text((revenue.total - revenue.discount).toString(), 200, y);
    });

    doc.save('revenue_report.pdf');
  };

  return (
    <div className="min-h-screen mt-24">
      <div className="max-w-7xl mx-auto p-6 bg-yellow-100">
        <h1 className="text-3xl font-bold mb-6 text-yellow-800">
          Revenue Report
        </h1>

        {/* Date and Route Filter */}
        <div className="mb-6">
          <label className="block mb-2 text-xl">Filter by Date</label>
          <div className="flex space-x-4 mb-4">
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleDateFilterChange}
              className="p-2 border rounded"
            />
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleDateFilterChange}
              className="p-2 border rounded"
            />
          </div>
          <input
            type="text"
            name="route"
            placeholder="Search by route"
            value={filters.route}
            onChange={handleDateFilterChange}
            className="p-2 w-full mb-4 border rounded"
          />
        </div>

        {/* Buttons for Export */}
        <div className="mb-6">
          <button
            onClick={exportToPDF}
            className="bg-yellow-500 text-white p-3 rounded mr-4"
          >
            Export as PDF
          </button>
          <button
            onClick={exportToExcel}
            className="bg-yellow-500 text-white p-3 rounded mr-4"
          >
            Export as Excel
          </button>
          <button
            onClick={exportToCSV}
            className="bg-yellow-500 text-white p-3 rounded"
          >
            Export as CSV
          </button>
        </div>

        {/* Revenue Summary */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="p-4 bg-yellow-200 rounded shadow-md">
            <h2 className="text-xl text-yellow-800">Total Revenue</h2>
            <p className="text-2xl font-bold">Rs: {totalRevenue}</p>
          </div>
          <div className="p-4 bg-yellow-200 rounded shadow-md">
            <h2 className="text-xl text-yellow-800">Revenue (Daily)</h2>
            <p className="text-2xl font-bold">
              Rs: {calculateTotalRevenueByPeriod('daily')}
            </p>
          </div>
          <div className="p-4 bg-yellow-200 rounded shadow-md">
            <h2 className="text-xl text-yellow-800">Revenue (Weekly)</h2>
            <p className="text-2xl font-bold">
              Rs: {calculateTotalRevenueByPeriod('weekly')}
            </p>
          </div>
        </div>

        {/* Revenue List */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-yellow-300 text-yellow-900">
              <tr>
                <th className="p-3">Route</th>
                <th className="p-3">Revenue</th>
                <th className="p-3">Discount</th>
                <th className="p-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredRevenue.map((revenue) => (
                <tr key={revenue.id} className="border-b hover:bg-yellow-50">
                  <td className="p-3">{revenue.route}</td>
                  <td className="p-3">{revenue.total}</td>
                  <td className="p-3">{revenue.discount}</td>
                  <td className="p-3">{revenue.total - revenue.discount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RevenueReport;

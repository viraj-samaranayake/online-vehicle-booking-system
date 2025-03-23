import { useState, useEffect } from 'react';
import { IoMdPrint } from 'react-icons/io';
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import { FaFileCsv } from 'react-icons/fa6';
import { saveAs } from 'file-saver'; // For saving files
import * as XLSX from 'xlsx'; // For exporting to Excel
import jsPDF from 'jspdf'; // For generating PDF
//import html2pdf from 'html2pdf.js'; // Import html2pdf.js
import dayjs from 'dayjs'; // Import Day.js

const BookingReport = () => {
  const [bookings, setBookings] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [cars, setCars] = useState([]);
  const [drivers, setDrivers] = useState([]);

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsResponse = await fetch('http://localhost:8081/bookings');
        const bookingsData = await bookingsResponse.json();
        setBookings(bookingsData);

        const customersResponse = await fetch('http://localhost:8081/customers');
        const customersData = await customersResponse.json();
        setCustomers(customersData);

        const carsResponse = await fetch('http://localhost:8081/admin/cars');
        const carsData = await carsResponse.json();
        setCars(carsData);

        const driversResponse = await fetch('http://localhost:8081/admin/drivers');
        const driversData = await driversResponse.json();
        setDrivers(driversData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Helper function to group bookings by a specific time frame (daily, weekly, monthly)
  const groupByTimeFrame = (bookings, timeFrame) => {
    return bookings.reduce((acc, booking) => {
      const date = dayjs(booking.createdDateTime); // Using Day.js here
      let key;

      switch (timeFrame) {
        case 'daily':
          key = date.format('YYYY-MM-DD');
          break;
        case 'weekly':
          key = date.isoWeek(); // Groups by ISO week
          break;
        case 'monthly':
          key = date.format('YYYY-MM'); // Groups by year and month
          break;
        default:
          return acc;
      }

      if (!acc[key]) {
        acc[key] = 0;
      }
      acc[key] += 1;
      return acc;
    }, {});
  };

  // Group bookings by daily, weekly, monthly
  const dailyBookings = groupByTimeFrame(bookings, 'daily');
  const weeklyBookings = groupByTimeFrame(bookings, 'weekly');
  const monthlyBookings = groupByTimeFrame(bookings, 'monthly');

  // Function to calculate booking status counts (completed, pending, canceled)
  const bookingStatusCount = () => {
    const completedBookings = bookings.filter((booking) => booking.bookingStatus === true).length;
    const pendingBookings = bookings.filter((booking) => booking.bookingStatus === false).length;

    return {
      completed: completedBookings,
      pending: pendingBookings,
    };
  };

  // Get popular routes (startLocation → destination)
  const getPopularRoutes = () => {
    const routeCount = bookings.reduce((acc, booking) => {
      const route = `${booking.startLocation} → ${booking.destination}`;
      if (!acc[route]) {
        acc[route] = 0;
      }
      acc[route] += 1;
      return acc;
    }, {});

    return Object.entries(routeCount)
      .sort((a, b) => b[1] - a[1])
      .map(([route, count]) => `${route}: ${count} bookings`);
  };

  // Get booking frequency per customer
  const getBookingFrequencyPerCustomer = () => {
    const customerBookingCount = bookings.reduce((acc, booking) => {
      const customerId = booking.customerId;
      if (!acc[customerId]) {
        acc[customerId] = 0;
      }
      acc[customerId] += 1;
      return acc;
    }, {});

    return customerBookingCount;
  };

  // Handle PDF Export
  const handleExportPDF = () => {
    const doc = new jsPDF();
    const tableData = bookings.map((booking) => [
      booking.customerName,
      booking.driverName,
      booking.vehicleType,
      booking.startLocation,
      booking.destination,
      booking.bookingStatus ? 'Completed' : 'Pending',
      booking.createdDateTime,
    ]);

    doc.autoTable({
      head: [
        ['Customer Name', 'Driver Name', 'Vehicle Type', 'Start Location', 'Destination', 'Status', 'Date'],
      ],
      body: tableData,
    });

    doc.save('booking_report.pdf');
  };

  // Handle Excel Export
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      bookings.map((booking) => ({
        CustomerName: booking.customerName,
        DriverName: booking.driverName,
        VehicleType: booking.vehicleType,
        StartLocation: booking.startLocation,
        Destination: booking.destination,
        Status: booking.bookingStatus ? 'Completed' : 'Pending',
        CreatedDateTime: booking.createdDateTime,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Bookings');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(file, 'booking_report.xlsx');
  };

  // Handle CSV Export
  const handleExportCSV = () => {
    const csv = bookings.map((booking) => ({
      CustomerName: booking.customerName,
      DriverName: booking.driverName,
      VehicleType: booking.vehicleType,
      StartLocation: booking.startLocation,
      Destination: booking.destination,
      Status: booking.bookingStatus ? 'Completed' : 'Pending',
      CreatedDateTime: booking.createdDateTime,
    }));
    const header = [
      'CustomerName',
      'DriverName',
      'VehicleType',
      'StartLocation',
      'Destination',
      'Status',
      'CreatedDateTime',
    ];
    const csvData = [header, ...csv.map((item) => Object.values(item))];

    const csvContent = csvData.map((row) => row.join(',')).join('\n');
    const file = new Blob([csvContent], { type: 'text/csv' });
    saveAs(file, 'booking_report.csv');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-16">
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6">
        <h2 className="text-3xl font-semibold text-center text-yellow-800">
          Booking Report
        </h2>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handleExportPDF}
            className="flex items-center px-4 py-2 border border-black"
          >
            <IoMdPrint className="mr-2" />
            Print as PDF
          </button>
          <button
            onClick={handleExportExcel}
            className="flex items-center px-6 py-2 border border-black"
          >
            <PiMicrosoftExcelLogoFill className="mr-2" />
            Export to Excel
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center px-6 py-2 border border-black"
          >
            <FaFileCsv className="mr-2" />
            Export to CSV
          </button>
        </div>

        {/* Booking Groupings: Daily, Weekly, Monthly */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Bookings By Time Frame</h3>
          <ul>
            <li>
              <strong>Daily Bookings:</strong>
              <ul>
                {Object.entries(dailyBookings).map(([date, count]) => (
                  <li key={date}>{date}: {count} bookings</li>
                ))}
              </ul>
            </li>
            <li>
              <strong>Weekly Bookings:</strong>
              <ul>
                {Object.entries(weeklyBookings).map(([week, count]) => (
                  <li key={week}>Week {week}: {count} bookings</li>
                ))}
              </ul>
            </li>
            <li>
              <strong>Monthly Bookings:</strong>
              <ul>
                {Object.entries(monthlyBookings).map(([month, count]) => (
                  <li key={month}>{month}: {count} bookings</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>

        {/* Popular Routes Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Popular Routes</h3>
          <ul>
            {getPopularRoutes().map((route, index) => (
              <li key={index}>{route}</li>
            ))}
          </ul>
        </div>

        {/* Booking Frequency Per Customer Section */}
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800">Booking Frequency Per Customer</h3>
          <ul>
            {Object.entries(getBookingFrequencyPerCustomer()).map(([customerId, count]) => {
              const customer = customers.find((customer) => customer.id === customerId);
              return (
                <li key={customerId}>
                  {customer ? customer.name : 'Unknown'}: {count} bookings
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookingReport;

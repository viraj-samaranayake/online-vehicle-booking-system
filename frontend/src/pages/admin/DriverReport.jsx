import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx'; // For exporting to Excel
import { saveAs } from 'file-saver'; // For saving files
import jsPDF from 'jspdf'; // For generating PDF
import { IoMdPrint } from 'react-icons/io';
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import { FaFileCsv } from 'react-icons/fa6';
import html2pdf from 'html2pdf.js'; // Import html2pdf.js

const DriverReport = () => {
  const [drivers, setDrivers] = useState([]);
  const [experienceFilter, setExperienceFilter] = useState(''); // Add state for the filter

  // Fetch driver data from the API
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch('http://localhost:8081/admin/drivers');
        const data = await response.json();
        setDrivers(data);
      } catch (error) {
        console.error('Error fetching driver data:', error);
      }
    };

    fetchDrivers();
  }, []);

  // Filter drivers based on experience years
  const filteredDrivers = drivers.filter((driver) => {
    if (experienceFilter === '') return true;
    return driver.experienceYears >= parseInt(experienceFilter, 10);
  });

  // Handle PDF Export (jsPDF for Print and Export)
  const handleExportPDF = () => {
    const doc = new jsPDF();

    // Map the driver data to table data, including assigned car details
    const tableData = filteredDrivers.map((driver) => [
      driver.name,
      driver.mobileNo,
      driver.email,
      driver.nicNo,
      driver.assignedCar
        ? `${driver.assignedCar.vehicleType} - ${driver.assignedCar.brand} ${driver.assignedCar.model} (${driver.assignedCar.licensePlateNo})`
        : 'No car assigned',
      driver.drivingLicenseNo,
      driver.experienceYears,
    ]);

    // Adding table to the document
    doc.autoTable({
      head: [
        [
          'Name',
          'Mobile No',
          'Email',
          'NIC No',
          'Assigned Car',
          'Driving License No',
          'Experience (Years)',
        ],
      ],
      body: tableData,
    });

    // Ensure PDF is generated correctly and trigger download
    try {
      doc.save('driver_report.pdf'); // This should trigger the download
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  // Handle Print using html2pdf
  const handlePrintPDF = () => {
    const element = document.getElementById('driver-table');
    const options = {
      filename: 'driver_report.pdf',
      html2canvas: { scale: 2 }, // For higher quality rendering
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }, // Page format settings
    };
    html2pdf().from(element).set(options).save(); // Trigger the download
  };

  // Handle Export to Excel
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      filteredDrivers.map((driver) => ({
        Name: driver.name,
        MobileNo: driver.mobileNo,
        Email: driver.email,
        NicNo: driver.nicNo,
        AssignedCar: driver.assignedCar
          ? `${driver.assignedCar.vehicleType} - ${driver.assignedCar.brand} ${driver.assignedCar.model} (${driver.assignedCar.licensePlateNo})`
          : 'No car assigned',
        DrivingLicenseNo: driver.drivingLicenseNo,
        ExperienceYears: driver.experienceYears,
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Drivers');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(file, 'driver_report.xlsx');
  };

  // Handle Export to CSV
  const handleExportCSV = () => {
    const csv = filteredDrivers.map((driver) => ({
      Name: driver.name,
      MobileNo: driver.mobileNo,
      Email: driver.email,
      NicNo: driver.nicNo,
      AssignedCar: driver.assignedCar
        ? `${driver.assignedCar.vehicleType} - ${driver.assignedCar.brand} ${driver.assignedCar.model} (${driver.assignedCar.licensePlateNo})`
        : 'No car assigned',
      DrivingLicenseNo: driver.drivingLicenseNo,
      ExperienceYears: driver.experienceYears,
    }));
    const header = [
      'Name',
      'MobileNo',
      'Email',
      'NicNo',
      'AssignedCar',
      'DrivingLicenseNo',
      'ExperienceYears',
    ];
    const csvData = [header, ...csv.map((item) => Object.values(item))];

    const csvContent = csvData.map((row) => row.join(',')).join('\n');
    const file = new Blob([csvContent], { type: 'text/csv' });
    saveAs(file, 'driver_report.csv');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-16">
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6">
        <h2 className="text-3xl font-semibold text-center text-yellow-800">
          Driver Report
        </h2>

        {/* Filter Input */}
        <div className="flex justify-center mb-4">
          <input
            type="number"
            placeholder="Filter by Experience (Years)"
            value={experienceFilter}
            onChange={(e) => setExperienceFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={handlePrintPDF}
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

        {/* Driver Table */}
        <div className="overflow-x-auto">
          <table
            id="driver-table"
            className="min-w-full table-auto border-collapse border border-gray-300"
          >
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Mobile No</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">NIC No</th>
                <th className="px-4 py-2">Assigned Car</th>
                <th className="px-4 py-2">Driving License No</th>
                <th className="px-4 py-2">Experience (Years)</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map((driver, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{driver.name}</td>
                  <td className="px-4 py-2">{driver.mobileNo}</td>
                  <td className="px-4 py-2">{driver.email}</td>
                  <td className="px-4 py-2">{driver.nicNo}</td>
                  <td className="px-4 py-2">
                    {driver.assignedCar
                      ? `${driver.assignedCar.vehicleType} - ${driver.assignedCar.brand} ${driver.assignedCar.model} (${driver.assignedCar.licensePlateNo})`
                      : 'No car assigned'}
                  </td>
                  <td className="px-4 py-2">{driver.drivingLicenseNo}</td>
                  <td className="px-4 py-2">{driver.experienceYears}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DriverReport;

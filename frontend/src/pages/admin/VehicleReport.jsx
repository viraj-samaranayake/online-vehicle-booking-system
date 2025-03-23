import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx'; // For exporting to Excel
import { saveAs } from 'file-saver'; // For saving files
import jsPDF from 'jspdf'; // For generating PDF
import html2pdf from 'html2pdf.js';
import { IoMdPrint } from 'react-icons/io';
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import { FaFileCsv } from 'react-icons/fa6';

const VehicleReport = () => {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleType, setVehicleType] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');

  // Fetch vehicle data from the API
  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await fetch('http://localhost:8081/admin/cars');
        const data = await response.json();
        setVehicles(data);
      } catch (error) {
        console.error('Error fetching vehicle data:', error);
      }
    };

    fetchVehicles();
  }, []);

  // Get unique options for the filter dropdowns
  const vehicleTypes = [
    ...new Set(vehicles.map((vehicle) => vehicle.vehicleType)),
  ];
  const brands = [...new Set(vehicles.map((vehicle) => vehicle.brand))];
  const models = [...new Set(vehicles.map((vehicle) => vehicle.model))];

  // Filter vehicles based on selected filters
  const filteredVehicles = vehicles.filter((vehicle) => {
    return (
      (vehicleType ? vehicle.vehicleType === vehicleType : true) &&
      (brand ? vehicle.brand === brand : true) &&
      (model ? vehicle.model === model : true)
    );
  });

  // Handle PDF Export (jsPDF for Print and Export)
  const handleExportPDF = () => {
    const doc = new jsPDF();

    const tableData = filteredVehicles.map((vehicle) => [
      vehicle.vehicleType,
      vehicle.brand,
      vehicle.model,
      vehicle.licensePlateNo,
      vehicle.status ? 'Available' : 'Busy',
    ]);

    doc.autoTable({
      head: [['Vehicle Type', 'Brand', 'Model', 'License Plate', 'Status']],
      body: tableData,
    });

    doc.save('vehicle_report.pdf');
  };

  // Handle Print using html2pdf
  const handlePrintPDF = () => {
    const element = document.getElementById('vehicle-table'); // The table to be printed

    // Generate the PDF from the table
    html2pdf().from(element).save('vehicle_report.pdf');
  };

  // Handle Export to Excel
  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredVehicles);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Vehicles');
    const excelBuffer = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    const file = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(file, 'vehicle_report.xlsx');
  };

  // Handle Export to CSV
  const handleExportCSV = () => {
    const csv = filteredVehicles.map((vehicle) => ({
      VehicleType: vehicle.vehicleType,
      Brand: vehicle.brand,
      Model: vehicle.model,
      LicensePlate: vehicle.licensePlateNo,
      Status: vehicle.status ? 'Available' : 'Busy',
    }));

    const header = ['VehicleType', 'Brand', 'Model', 'LicensePlate', 'Status'];
    const csvData = [header, ...csv.map((item) => Object.values(item))];

    const csvContent = csvData.map((row) => row.join(',')).join('\n');
    const file = new Blob([csvContent], { type: 'text/csv' });
    saveAs(file, 'vehicle_report.csv');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 mt-16">
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-xl space-y-6">
        <h2 className="text-3xl font-semibold text-center text-yellow-800">
          Vehicle Report
        </h2>

        {/* Filter Options */}
        <div className="flex justify-center space-x-4 mb-4">
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="px-4 py-2 border"
          >
            <option value="">Select Vehicle Type</option>
            {vehicleTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </select>

          <select
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="px-4 py-2 border"
          >
            <option value="">Select Brand</option>
            {brands.map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          <select
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="px-4 py-2 border"
          >
            <option value="">Select Model</option>
            {models.map((model, index) => (
              <option key={index} value={model}>
                {model}
              </option>
            ))}
          </select>
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

        {/* Vehicle Table */}
        <div className="overflow-x-auto">
          <table
            id="vehicle-table"
            className="min-w-full table-auto border-collapse border border-gray-300"
          >
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">Vehicle Type</th>
                <th className="px-4 py-2">Brand</th>
                <th className="px-4 py-2">Model</th>
                <th className="px-4 py-2">License Plate</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-4 py-2">{vehicle.vehicleType}</td>
                  <td className="px-4 py-2">{vehicle.brand}</td>
                  <td className="px-4 py-2">{vehicle.model}</td>
                  <td className="px-4 py-2">{vehicle.licensePlateNo}</td>
                  <td className="px-4 py-2">
                    {vehicle.status ? 'Available' : 'Busy'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VehicleReport;

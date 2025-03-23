import { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

const CustomerReport = () => {
  const [customers, setCustomers] = useState([]);

  // Fetching customer data
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const response = await axios.get('http://localhost:8081/customers');
        setCustomers(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, []);

  // Function to Export to CSV
  const exportToCSV = () => {
    const csvData = customers.map((customer) => ({
      Name: customer.name,
      Address: customer.address,
      Phone: customer.phone,
      NIC: customer.nic,
      Email: customer.email,
    }));

    const csvFile = XLSX.utils.json_to_sheet(csvData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, csvFile, 'Customer Report');
    const excelBuffer = XLSX.write(wb, { bookType: 'csv', type: 'array' });

    const file = new Blob([excelBuffer], { type: 'text/csv' });
    saveAs(file, 'customer_report.csv');
  };

  // Function to Export to Excel
  const exportToExcel = () => {
    const excelData = customers.map((customer) => ({
      Name: customer.name,
      Address: customer.address,
      Phone: customer.phone,
      NIC: customer.nic,
      Email: customer.email,
    }));

    const ws = XLSX.utils.json_to_sheet(excelData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Customer Report');
    XLSX.writeFile(wb, 'customer_report.xlsx');
  };

  // Function to Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Customer Report', 20, 20);

    // Adding headers
    doc.setFontSize(12);
    doc.text('Name', 20, 30);
    doc.text('Address', 60, 30);
    doc.text('Phone', 120, 30);
    doc.text('NIC', 160, 30);
    doc.text('Email', 200, 30);

    // Adding data rows
    customers.forEach((customer, index) => {
      const y = 40 + index * 10;
      doc.text(customer.name, 20, y);
      doc.text(customer.address, 60, y);
      doc.text(customer.phone, 120, y);
      doc.text(customer.nic, 160, y);
      doc.text(customer.email, 200, y);
    });

    doc.save('customer_report.pdf');
  };

  return (
    <div className="min-h-screen mt-24">
      <div className="max-w-7xl mx-auto p-6 bg-yellow-100">
        <h1 className="text-3xl font-bold mb-6 text-yellow-800">Customer Report</h1>

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

        {/* Customer List */}
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="bg-yellow-300 text-yellow-900">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Address</th>
                <th className="p-3">Phone</th>
                <th className="p-3">NIC</th>
                <th className="p-3">Email</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} className="border-b hover:bg-yellow-50">
                  <td className="p-3">{customer.name}</td>
                  <td className="p-3">{customer.address}</td>
                  <td className="p-3">{customer.phone}</td>
                  <td className="p-3">{customer.nic}</td>
                  <td className="p-3">{customer.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CustomerReport;

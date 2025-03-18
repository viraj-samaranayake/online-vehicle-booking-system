import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the id
import { jsPDF } from 'jspdf';

const Bill = () => {
  const { id } = useParams(); // Get the booking id from the URL
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the bill data for the specific bookingId from the API
    fetch(`http://localhost:8081/bills/booking/${id}`)
      .then(response => response.json())
      .then(data => {
        setBill(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching bill data:', error);
        setLoading(false);
      });
  }, [id]); // Dependency array includes id to refetch if it changes

  // Function to download the bill as a PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);

    // Title
    doc.text('Bill Details', 20, 20);

    // Bill Data
    if (bill) {
      doc.setFontSize(12);
      doc.text(`Customer Name: ${bill.customerName}`, 20, 30);
      doc.text(`Booking ID: ${bill.bookingId}`, 20, 40);
      doc.text(`Driver Name: ${bill.driverName}`, 20, 50);
      doc.text(`Pickup Location: ${bill.pickupLocation}`, 20, 60);
      doc.text(`Destination: ${bill.destination}`, 20, 70);
      doc.text(`Vehicle Type: ${bill.vehicleType}`, 20, 80);
      doc.text(`License Plate No: ${bill.licensePlateNo}`, 20, 90);
      doc.text(`Distance: ${bill.distance} km`, 20, 100);
      doc.text(`Tax: Rs: ${bill.tax.toFixed(2)}`, 20, 110);
      doc.text(`Discount: Rs: ${bill.discount.toFixed(2)}`, 20, 120);
      doc.text(`Total: Rs: ${bill.total.toFixed(2)}`, 20, 130);
    }

    // Save the generated PDF
    doc.save('bill.pdf');
  };

  if (loading) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-yellow-100 py-8 px-6 sm:px-12 mt-16">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg border-t-4 border-yellow-600">
        <h2 className="text-2xl font-semibold text-yellow-600 mb-6 text-center">Bill Details</h2>
        
        {bill ? (
          <div className="space-y-4">
            <div className="text-lg text-gray-700">
              <p><strong className="text-yellow-600">Bill ID:</strong> {bill.id}</p>
              <p><strong className="text-yellow-600">Customer Name:</strong> {bill.customerName}</p>
              <p><strong className="text-yellow-600">Booking ID:</strong> {bill.bookingId}</p>
              <p><strong className="text-yellow-600">Driver Name:</strong> {bill.driverName}</p>
              <p><strong className="text-yellow-600">Pickup Location:</strong> {bill.pickupLocation}</p>
              <p><strong className="text-yellow-600">Destination:</strong> {bill.destination}</p>
              <p><strong className="text-yellow-600">Vehicle Type:</strong> {bill.vehicleType}</p>
              <p><strong className="text-yellow-600">License Plate No:</strong> {bill.licensePlateNo}</p>
              <p><strong className="text-yellow-600">Distance:</strong> {bill.distance} km</p>
              <p><strong className="text-yellow-600">Tax:</strong> Rs: {bill.tax.toFixed(2)}</p>
              <p><strong className="text-yellow-600">Discount:</strong> Rs: {bill.discount.toFixed(2)}</p>
              <p><strong className="text-yellow-600">Total:</strong> Rs: {bill.total.toFixed(2)}</p>
            </div>

            <div className="text-center">
              <button
                onClick={downloadPDF}
                className="mt-6 bg-yellow-600 hover:bg-yellow-500 text-white font-semibold py-2 px-6 rounded-full shadow-md transition duration-300 ease-in-out"
              >
                Download as PDF
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500">No bill data available.</p>
        )}
      </div>
    </div>
  );
};

export default Bill;

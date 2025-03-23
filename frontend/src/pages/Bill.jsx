import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the id
import { jsPDF } from 'jspdf';
import { MdDownload } from 'react-icons/md';

const Bill = () => {
  const { id } = useParams(); // Get the booking id from the URL
  const [bill, setBill] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the bill data for the specific bookingId from the API
    fetch(`http://localhost:8081/bills/booking/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setBill(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching bill data:', error);
        setLoading(false);
      });
  }, [id]); // Dependency array includes id to refetch if it changes




  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add Company Name
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.text('MegaCity Cabs', 80, 25); // Adjust the position for company name

    // Title of the Bill
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);
    doc.text('Invoice', 90, 60); // Position for the invoice title

    // Add a line separator
    doc.setLineWidth(0.5);
    doc.line(20, 65, 190, 65); // Line under the title

    // Bill Data
    doc.setFontSize(12);
    let yPosition = 75;

    if (bill) {
      doc.text(`Invoice ID: ${bill.id}`, 20, yPosition);
      yPosition += 10;

      doc.text(`Customer Name: ${bill.customerName}`, 20, yPosition);
      yPosition += 10;

      doc.text(`Booking ID: ${bill.bookingId}`, 20, yPosition);
      yPosition += 10;

      doc.text(`Driver Name: ${bill.driverName}`, 20, yPosition);
      yPosition += 10;

      doc.text(`Pickup Location: ${bill.pickupLocation}`, 20, yPosition);
      yPosition += 10;

      doc.text(`Destination: ${bill.destination}`, 20, yPosition);
      yPosition += 10;

      doc.text(`Vehicle Type: ${bill.vehicleType}`, 20, yPosition);
      yPosition += 10;

      doc.text(`License Plate No: ${bill.licensePlateNo}`, 20, yPosition);
      yPosition += 10;

      doc.text(`Distance: ${bill.distance} km`, 20, yPosition);
      yPosition += 10;

      doc.text(`Tax: Rs: ${bill.tax.toFixed(2)}`, 20, yPosition);
      yPosition += 10;

      doc.text(`Discount: Rs: ${bill.discount.toFixed(2)}`, 20, yPosition);
      yPosition += 10;

      doc.text(`Total: Rs: ${bill.total.toFixed(2)}`, 20, yPosition);
      yPosition += 20; // Space for the thank you note
    }

    // Thank You Note
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(14);
    doc.text('Thank you for choosing our service!', 60, yPosition);

    // Printed Date and Time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString(); // Get date and time in the local format
    doc.setFontSize(10);
    doc.text(`Generated on: ${formattedDate}`, 20, 270); // Adjust the position as needed

    // Add footer (optional)
    doc.setFontSize(10);
    doc.text('For any inquiries, contact support@megacity.com', 20, 280); // Footer info (adjust position as needed)

    // Save the generated PDF
    doc.save('bill.pdf');
  };

  if (loading) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-yellow-50 py-8 px-6 sm:px-12 mt-16">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-2xl border-t-2 border-yellow-500">
        <h2 className="text-4xl font-bold text-yellow-700 mb-12 text-center tracking-wide">
          Booking Invoice
        </h2>

        {bill ? (
          <div className="space-y-6">
            <div className="text-lg text-gray-800 font-medium">
              <div className="bg-yellow-0 p-4 rounded-lg shadow-md space-y-2">
                <p className="text-gray-600">
                  <strong className="text-yellow-600">Bill ID:</strong>{' '}
                  {bill.id}
                </p>
                <p className="text-gray-600">
                  <strong className="text-yellow-600">Customer Name:</strong>{' '}
                  {bill.customerName}
                </p>
                <p className="text-gray-600">
                  <strong className="text-yellow-600">Booking ID:</strong>{' '}
                  {bill.bookingId}
                </p>
                <p className="text-gray-600">
                  <strong className="text-yellow-600">Driver Name:</strong>{' '}
                  {bill.driverName}
                </p>
                <p className="text-gray-600">
                  <strong className="text-yellow-600">Pickup Location:</strong>{' '}
                  {bill.pickupLocation}
                </p>
                <p className="text-gray-600">
                  <strong className="text-yellow-600">Destination:</strong>{' '}
                  {bill.destination}
                </p>
                <p className="text-gray-600">
                  <strong className="text-yellow-600">Vehicle Type:</strong>{' '}
                  {bill.vehicleType}
                </p>
                <p className="text-gray-600">
                  <strong className="text-yellow-600">License Plate No:</strong>{' '}
                  {bill.licensePlateNo}
                </p>
                <p className="text-gray-600">
                  <strong className="text-yellow-600">Distance:</strong>{' '}
                  {bill.distance} km
                </p>
                <p className="text-gray-600">
                  <strong className="text-yellow-600">Tax:</strong> Rs:{' '}
                  {bill.tax.toFixed(2)}
                </p>
                <p className="text-gray-600">
                  <strong className="text-yellow-600">Discount:</strong> Rs:{' '}
                  {bill.discount.toFixed(2)}
                </p>
                <p className="text-gray-600">
                  <strong className="text-yellow-600">Total Amount:</strong> Rs:{' '}
                  {bill.total.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Thank You Note */}
            <div className="text-center text-xl text-gray-600 mt-8">
              <p className="italic font-semibold text-yellow-600">
                Thank you for choosing our service!
              </p>
            </div>

            {/* Download PDF Button */}
            <div className="flex justify-center">
              <button
                onClick={downloadPDF}
                className="flex items-center mt-8 bg-yellow-600 hover:bg-yellow-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg transition duration-300 ease-in-out"
              >
                <MdDownload className="text-lg mr-2" />
                Download Invoice PDF
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

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ViewBill = () => {
  
  const { customerId } = useParams();
  const [booking, setBooking] = useState(null);
  const [bill, setBill] = useState(null);
  const navigate = useNavigate();

  // Fetch booking details from API
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await fetch(`http://localhost:8081/bookings/customers/${customerId}`);
        const data = await response.json();
        setBooking(data);
        generateBill(data);
      } catch (error) {
        console.error('Error fetching booking details:', error);
      }
    };

    fetchBooking();
  }, [customerId]);

  // Generate bill based on booking details
  const generateBill = (bookingData) => {
    if (!bookingData) return;

    const distance = Math.floor(Math.random() * 20) + 5; // Random distance (5-25 km)
    const farePerKm = 10; // Example fare rate per km
    const baseFare = distance * farePerKm;
    const tax = baseFare * 0.1; // 10% tax
    const discount = baseFare * 0.05; // 5% discount
    const total = baseFare + tax - discount;

    const newBill = {

      customerName: bookingData.customerName,
      phone: bookingData.phone,
      address: bookingData.address,
      pickupLocation: bookingData.startLocation,
      destination: bookingData.destination,
      distance,
      tax: tax.toFixed(2),
      discount: discount.toFixed(2),
      total: total.toFixed(2),
    };

    setBill(newBill);
  };

  // Save bill to DB and print
  const handlePrint = async () => {
    if (!bill) return;

    try {
      const response = await fetch("http://localhost:8081/bills", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bill),
      });

      if (response.ok) {
        window.print();
      } else {
        console.error("Failed to save bill.");
      }
    } catch (error) {
      console.error("Error saving bill:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 min-h-screen mt-20 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-2xl text-gray-700">
        <h1 className="text-3xl font-semibold text-yellow-700 text-center mb-6">Bill Summary</h1>

        {bill ? (
          <div className="space-y-4">
            <p><strong>Bill ID:</strong> {bill.id}</p>
            <p><strong>Customer Name:</strong> {bill.customerName}</p>
            <p><strong>Phone:</strong> {bill.phone}</p>
            <p><strong>Address:</strong> {bill.address}</p>
            <p><strong>Pickup Location:</strong> {bill.pickupLocation}</p>
            <p><strong>Destination:</strong> {bill.destination}</p>
            <p><strong>Distance:</strong> {bill.distance} km</p>
            <p><strong>Tax:</strong> ${bill.tax}</p>
            <p><strong>Discount:</strong> ${bill.discount}</p>
            <p className="text-xl font-bold text-yellow-700"><strong>Total Fare:</strong> ${bill.total}</p>

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={handlePrint}
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-lg transition"
              >
                Print Bill
              </button>
              <button
                onClick={() => navigate(-1)}
                className="bg-gray-400 hover:bg-gray-500 text-white font-semibold px-6 py-2 rounded-lg transition"
              >
                Back
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-yellow-600">Loading bill details...</p>
        )}
      </div>
    </div>
  );
};

export default ViewBill;

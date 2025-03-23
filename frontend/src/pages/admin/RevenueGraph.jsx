import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

// Registering Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const RevenueGraph = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [graphData, setGraphData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Revenue',
        data: [],
        borderColor: 'rgba(255, 159, 64, 1)',
        tension: 0.4,
        fill: false,
      },
    ],
  });

  // Fetching the revenue data from the API
  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const bookingsResponse = await axios.get(
          'http://localhost:8081/bookings'
        );
        const billsResponse = await axios.get('http://localhost:8081/bills');
        const calculatedData = calculateRevenue(
          bookingsResponse.data,
          billsResponse.data
        );
        setRevenueData(calculatedData);
        setGraphData(generateGraphData(calculatedData));
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
        date: booking.createdDateTime,
        total: bill?.total || 0,
      };
    });
  };

  const generateGraphData = (data) => {
    const labels = data.map((item) => new Date(item.date).toLocaleDateString());
    const revenues = data.map((item) => item.total);

    return {
      labels,
      datasets: [
        {
          label: 'Revenue',
          data: revenues,
          borderColor: 'rgba(255, 159, 64, 1)',
          tension: 0.4,
          fill: false,
        },
      ],
    };
  };

  return (

      <div className="max-w-7xl mx-auto p-6 bg-yellow-100 mt-28">
        <h1 className="text-3xl font-bold mb-6 text-yellow-800">
          Revenue Graph
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <Line data={graphData} options={{ responsive: true }} />
        </div>
      </div>
  );
};

export default RevenueGraph;

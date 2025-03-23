import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import CabBooking from './pages/CabBooking';
import Bill from './pages/Bill';
import ViewBookings from './pages/admin/ViewBookings';
import Dashboard from './pages/Dashboard';
import Hero from './components/Hero';
import Help from './pages/Help';
import Navbar from './components/NavBar';
import AddCar from './pages/admin/AddCar';
import AddDriver from './pages/admin/AddDriver';
import ViewDrivers from './pages/admin/ViewDrivers';
import UpdateDriver from './pages/admin/UpdateDriver';
import UpdateCar from './pages/admin/UpdateCar';
import Footer from './components/Footer';
import AdminDashboard from './pages/admin/AdminDashboard';
import UpdateBooking from './pages/admin/UpdateBooking';
import CustomerViewBooking from './pages/CustomerViewBooking';
import ViewCar from './pages/admin/ViewCars';
import ScrollUp from './components/ScrollUp';
import NoPage from './pages/NoPage';
import { AuthProvider } from './context/AuthContext';
import AdminLogin from './pages/admin/AdminLogin';
import BillValue from './pages/admin/BillValue';
import ReportsPage from './pages/admin/ReportsPage';
import VehicleReport from './pages/admin/VehicleReport';
import DriverReport from './pages/admin/DriverReport';
// import BookingReport from './pages/admin/BookingReport';
import RevenueReport from './pages/admin/RevenueReport';
import RevenueGraph from './pages/admin/RevenueGraph';
import CustomerReport from './pages/admin/CustomerReport';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route index element={<Hero />} />
          {/* <Route path="/" element={<Hero />} /> */}
          <Route path="/help" element={<Help />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking" element={<CabBooking />} />
          <Route path="/admin/bookings" element={<ViewBookings />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/customer/bookings" element={<CustomerViewBooking />} />
          <Route path="/customer/bookings/bill/:id" element={<Bill />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/addcar" element={<AddCar />} />
          <Route path="/admin/cars" element={<ViewCar />} />
          <Route path="/admin/cars/:id" element={<UpdateCar />} />
          <Route path="/admin/reports" element={<ReportsPage />} /> 
          <Route path="/admin/reports/vehicle" element={<VehicleReport />} />
          <Route path="/admin/reports/driver" element={<DriverReport />} />
          {/* <Route path="/admin/reports/booking" element={<BookingReport />} /> */}
          <Route path="/admin/reports/customer" element={<CustomerReport/>} />
          <Route path="/admin/reports/revenue" element={<RevenueReport />} />
          <Route path="/admin/reports/revenue-graph" element={<RevenueGraph />} />

          <Route path="/admin/drivers/add" element={<AddDriver />} />
          <Route path="/admin/drivers" element={<ViewDrivers />} />
          <Route path="/admin/drivers/:id" element={<UpdateDriver />} />

          <Route path="/admin/bookings/:id" element={<UpdateBooking />} />
          <Route path="/admin/billvalues" element={<BillValue />} />

          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer />
        <ScrollUp />
      </AuthProvider>
    </Router>
  );
};

export default App;

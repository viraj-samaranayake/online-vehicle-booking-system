import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import CabBooking from './pages/CabBooking';
import Bill from './pages/Bill';
import ViewBookings from './pages/ViewBookings';
import Dashboard from './pages/Dashboard';
import Hero from './components/Hero';
import Help from './pages/Help';
import Navbar from './components/NavBar';
import AddCar from './pages/AddCar';
import AddDriver from './pages/AddDriver';
import ViewDrivers from './pages/ViewDrivers';
import UpdateDriver from './pages/UpdateDriver';
import UpdateCar from './pages/UpdateCar';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import UpdateBooking from './pages/UpdateBooking';
import CustomerViewBooking from './pages/CustomerViewBooking';
import ViewCar from './pages/ViewCars';
import ScrollUp from './components/ScrollUp';
import NoPage from './pages/NoPage';
import { AuthProvider } from './context/AuthContext';

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
          <Route path="/bills" element={<Bill />} />
          <Route path="/admin/bookings" element={<ViewBookings />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/customer/bookings" element={<CustomerViewBooking />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/cars/add" element={<AddCar />} />
          <Route path="/admin/cars" element={<ViewCar />} />
          <Route path="/admin/cars/:id" element={<UpdateCar />} />

          <Route path="/admin/drivers/add" element={<AddDriver />} />
          <Route path="/admin/drivers" element={<ViewDrivers />} />
          <Route path="/admin/drivers/:id" element={<UpdateDriver />} />

          <Route path="/admin/bookings/:id" element={<UpdateBooking />} />

          <Route path="*" element={<NoPage />} />
        </Routes>
        <Footer />
        <ScrollUp />
      </AuthProvider>
    </Router>
  );
};

export default App;

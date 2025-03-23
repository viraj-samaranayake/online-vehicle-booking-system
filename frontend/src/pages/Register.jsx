import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const CustomerRegisterForm = () => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [nic, setNic] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCustomer = {
      name,
      address,
      phone,
      nic,
      email,
      password,
    };

    try {
      const response = await axios.post(
        'http://localhost:8081/customers/register',
        newCustomer
      );
      setStatus('');
      alert(`${response.data.name}, You've registered successfully!`);
      setName('');
      setAddress('');
      setPhone('');
      setNic('');
      setEmail('');
      setPassword('');
      setTimeout(() => navigate('/login'), 1000);
    } catch (error) {

      console.error('Error occurred while registering the customer', error);
      setStatus('Error occurred while registering the customer.');

      if (
        error.response &&
        error.response.data === 'This NIC already exists!'
      ) {
        setStatus('This NIC already exists!');
      } else if (       
        error.response &&
        error.response.data === 'This Email already exists!'
      ){
        setStatus('This Email already exists!');
      }

    }
  };

  return (
    <div className="main-div">
      <div className="form-card">
        <h2 className="text-2xl font-bold text-center text-yellow-500">
          Sign Up
        </h2>
        {status && <p className="mt-2 text-center font-semibold text-red-600">{status}</p>}

        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              autoFocus={true}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              pattern='^[A-Za-z]+(?: [A-Za-z]+)?$'
              title='Name must contain only letters'
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="form-label">
              Phone No
            </label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
              pattern='^[0-9]{10}$'
              title='Phone No must be 10 digits number'
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="nic" className="form-label">
              NIC
            </label>
            <input
              type="text"
              id="nic"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              className="form-input"
              pattern="^\d{9}[VX]$|^\d{12}$"
              title="Enter a valid NIC number: 9 digits followed by V or X, or 12 digits only"
              placeholder="Enter NIC No"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!])(?=\S+$).{8,20}$"
              title="Password must be between 8 and 20 characters, include at least one uppercase letter, one lowercase letter, one number, and one special character"
              placeholder="Enter NIC No"
              required
            />
          </div>

          <button type="submit" className="form-button">
            Sign up
          </button>
          <p className="flex items-center text-gray-700 justify-center mt-4">
            Already have an account?{' '}
            <Link to="/login">
              &nbsp;
              <span className="text-yellow-500 hover:text-yellow-600">
                Sign in
              </span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CustomerRegisterForm;

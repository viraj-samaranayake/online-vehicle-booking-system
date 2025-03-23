import axios from 'axios';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminLogin = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);  // Get login function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await axios.post('http://localhost:8081/admin/login', loginData);

      if (response.data === "Login successful!") { 

        alert('Login successful!')
        setStatus('');
        login();  // Update AuthContext state
        setTimeout(() => navigate('/admin'), 1000);
      } else {
        setStatus(response.data);
      }
    } catch (error) {
      console.error('Error occurred during login', error);
      setStatus('Error occurred during login.');
    }
  };

  return (
    <div className="main-div">
      <div className="form-card">
        <h2 className="text-2xl mb-4 font-bold text-center text-yellow-500">
         Admin Sign In
        </h2>
        {status && <p className="mt-2 text-center text-red-500">{status}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              autoFocus={true}
              placeholder='user@example.com'
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>

          <button
            type="submit"
            className="form-button mt-6"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;





import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <div className="main-div">
      <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg w-96">
        <h2 className="text-2xl m-4 font-bold text-center text-yellow-500">
          Dashboard
        </h2>
        <Link to="/customer/bookings" className='flex justify-center m-4 text-yellow-50 border-yellow-600 font-semibold rounded-full p-3 bg-yellow-400 hover:bg-yellow-500'>My Bookings</Link>
        
      </div>
    </div>
  )
}

export default Dashboard
// import { Link } from 'react-router-dom';
// import { useContext, useState } from 'react';
// import { AuthContext } from '../context/AuthContext';
// import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for mobile menu
// import { GoSignOut } from 'react-icons/go';

// const Navbar = () => {
//   const { isAuthenticated, logout } = useContext(AuthContext);
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="bg-yellow-500 shadow-md w-full top-0 left-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-4">
//           {/* Logo */}
//           <h1 className="text-3xl font-semibold">
//             <Link to="/" className="text-white">
//               MCity<span className="text-sm">Cabs™</span>
//             </Link>
//           </h1>

//           {/* Desktop Menu */}
//           <div className="hidden items-center font-semibold md:flex space-x-6">
//             <Link to="/help" className="text-black-primary hover:text-white transition-colors">Help</Link>
            
//             {!isAuthenticated ? (
//               <>
//                 <Link to="/login" className="text-black-primary hover:text-white transition-colors">Log in</Link>
//                 <Link to="/register" className="bg-yellow-500 text-white rounded-full py-2 px-6 border">
//                   Sign up
//                 </Link>
//               </>
//             ) : (
//               <button 
//                 onClick={logout} 
//                 className="flex items-center text-red-600 border border-red-400 rounded-full py-2 px-6">
//                 Sign Out&nbsp;<GoSignOut/>
//               </button>
//             )}
//           </div>

//           {/* Mobile Menu Button */}
//           <button 
//             onClick={() => setMenuOpen(!menuOpen)} 
//             className="md:hidden focus:outline-none"
//           >
//             {menuOpen ? <FaTimes size={24} className="text-white" /> : <FaBars size={24} className="text-white" />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {menuOpen && (
//         <div className="md:hidden bg-white font-semibold shadow-md">
//           <ul className="flex flex-col items-center space-y-4 py-4">
//             <Link to="/help" className="text-black-primary hover:text-yellow-500 transition-colors" onClick={() => setMenuOpen(false)}>Help</Link>
            
//             {!isAuthenticated ? (
//               <>
//                 <Link to="/login" className="text-black-primary hover:text-yellow-500 transition-colors" onClick={() => setMenuOpen(false)}>Log in</Link>
//                 <Link to="/register" className="bg-yellow-500 text-white rounded-full py-2 px-6 hover:bg-yellow-600 transition-all" onClick={() => setMenuOpen(false)}>
//                   Sign up
//                 </Link>
//               </>
//             ) : (
//               <button 
//                 onClick={() => {
//                   logout();
//                   setMenuOpen(false);
//                 }} 
//                 className="text-red-600 border border-red-400 rounded-full py-2 px-6">
//                 Sign Out
//               </button>
//             )}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;







import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaBars, FaTimes } from 'react-icons/fa'; // Icons for mobile menu
import { GoSignOut } from 'react-icons/go';

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-yellow-500 shadow-md w-full top-0 fixed left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <h1 className="text-3xl font-semibold">
            <Link to="/" className="text-white">  
              MCity<span className="text-sm">Cabs™</span>
            </Link>
          </h1>

          {/* Desktop Menu */}
          <div className="hidden items-center font-semibold md:flex space-x-6">
            <Link to="/help" className="text-black-primary hover:text-white transition-colors">Help</Link>
            
            {!isAuthenticated ? (
              <>
                <Link to="/login" className="text-black-primary hover:text-white transition-colors">Log in</Link>
                <Link to="/register" className="bg-yellow-500 text-white rounded-full py-2 px-6 border">
                  Sign up
                </Link>
              </>
            ) : (
              <button 
                onClick={logout} 
                className="flex items-center text-red-600 border border-red-400 rounded-full py-2 px-6">
                Sign Out&nbsp;<GoSignOut />
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMenuOpen(true)} 
            className="md:hidden focus:outline-none"
          >
            <FaBars size={24} className="text-white" />
          </button>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center z-50 transition-all">
          {/* Close Button */}
          <button 
            onClick={() => setMenuOpen(false)} 
            className="absolute top-6 right-6 text-white text-3xl"
          >
            <FaTimes />
          </button>

          <ul className="text-white text-center text-xl space-y-8">
            <li>
              <Link to="/help" onClick={() => setMenuOpen(false)} className="hover:text-yellow-500 font-semibold transition-all">
                Help
              </Link>
            </li>

            {!isAuthenticated ? (
              <>
                <li>
                  <Link to="/login" onClick={() => setMenuOpen(false)} className="hover:text-yellow-500 transition-all">
                    Log in
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={() => setMenuOpen(false)} className="bg-yellow-500 text-black rounded-full py-3 px-8 hover:bg-yellow-600 transition-all">
                    Sign up
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button 
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }} 
                  className="flex items-center font-semibold bg-white text-red-600 rounded-full py-3 px-8"
                >
                  Sign Out&nbsp;<GoSignOut />
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;





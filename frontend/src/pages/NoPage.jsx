

const NoPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-700">404</h1>
          <p className="text-xl text-gray-600 mt-2">Oops! Page not found.</p>
          <p className="text-md text-gray-500 mt-2">The page you are looking for does not exist.</p>
          <a
            href="/"
            className="mt-4 inline-block px-6 py-3 text-white bg-yellow-600 rounded-lg hover:bg-yellow-600 transition"
          >
            Go Home
          </a>
        </div>
      </div>
  )
}


export default NoPage;

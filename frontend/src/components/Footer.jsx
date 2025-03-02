

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-400 py-6">
    <div className="container mx-auto px-4 md:px-8 lg:px-16 text-center">

        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0">

            <p className="text-sm md:text-base">
                &copy; {new Date().getFullYear()} &nbsp;<span className="text-gray-600">MCity Cabs</span>
            </p>
        </div>
    </div>
</footer>
  )
}

export default Footer

const Help = () => {
  return (
    <section className="min-h-screen bg-gray-100 py-20 ">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-yellow-primary mb-6">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold mb-2">Step 1: Create an Account</h3>
            <p>Sign up to access our reservation system and manage your bookings.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold mb-2">Step 2: Choose Your Ride</h3>
            <p>Browse available vehicles and select the one that suits your needs.</p>
          </div>
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h3 className="text-2xl font-semibold mb-2">Step 3: Book & Ride</h3>
            <p>Confirm your booking and your ride will be on its way to you in no time!</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Help;

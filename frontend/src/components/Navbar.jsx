import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg">
      <nav className="max-w-6xl mx-auto flex justify-between items-center p-4 flex-wrap">
        <h1 className="text-2xl font-bold text-white mb-2 sm:mb-0">
          Poll Voting App
        </h1>
        <div className="flex flex-wrap gap-4 text-white text-sm sm:text-base">
          <Link to="/" className="hover:underline">Login</Link>
          <Link to="/register" className="hover:underline">Register</Link>
          <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          <Link to="/admin" className="hover:underline bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100">Admin</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

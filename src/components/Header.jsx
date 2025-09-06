import { useState } from "react";
import { Link } from "react-router-dom";
import logo from './logo.jpeg'; 
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-200 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <img src={logo} alt="Diabetopedia Logo" className="h-12 w-12 rounded-full object-cover" />
          <h1 className="text-2xl md:text-3xl font-bold font-sans text-gray-800">
            Diabetopedia
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4 items-center">
          <Link to="/" className="bg-blue-400 px-4 py-2 rounded-full text-white hover:bg-white-500">
            Home
          </Link>
          <Link to="/categories" className="bg-blue-400 px-4 py-2 rounded-full text-white hover:bg-white-500">
            Categories
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden flex items-center" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-blue-300 mt-2 p-4 rounded-lg">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link to="/" className="block text-gray-900 hover:bg-blue-500 px-4 py-2 rounded-md">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="block text-gray-900 hover:bg-blue-500 px-4 py-2 rounded-md">
                About
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
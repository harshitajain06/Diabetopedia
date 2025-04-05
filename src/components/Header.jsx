import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-pink-200 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Diabetopedia Logo" className="h-10 w-10 rounded-full" />
          <h1 className="text-2xl md:text-3xl font-extrabold italic font-serif text-gray-800">
            Diabetopedia
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="bg-pink-400 px-4 py-2 rounded-full text-white hover:bg-pink-500">
            Home
          </Link>
          <Link to="/about" className="bg-pink-400 px-4 py-2 rounded-full text-white hover:bg-pink-500">
            About
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-pink-300 mt-2 p-4 rounded-lg">
          <ul className="flex flex-col space-y-2">
            <li>
              <Link to="/" className="block text-gray-900 hover:bg-pink-500 px-4 py-2 rounded-md">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="block text-gray-900 hover:bg-pink-500 px-4 py-2 rounded-md">
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

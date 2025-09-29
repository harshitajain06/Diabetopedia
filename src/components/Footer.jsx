import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // Get current visitor count from localStorage
    const currentCount = localStorage.getItem('diabetopedia-visitor-count');
    const count = currentCount ? parseInt(currentCount) : 0;
    
    // Increment the count
    const newCount = count + 1;
    
    // Update localStorage and state
    localStorage.setItem('diabetopedia-visitor-count', newCount.toString());
    setVisitorCount(newCount);
  }, []);

    return (
    <footer className="bg-gradient-to-r from-blue-600 to-green-600 text-white mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white mb-4">
              🌿 Diabetopedia
            </h3>
            <p className="text-blue-100 text-sm leading-relaxed">
              Your comprehensive diabetes management companion. Get personalized diet plans, 
              track your health metrics, and access expert guidance for better diabetes control.
            </p>
            
            {/* Visitor Counter */}
            <div className="bg-white bg-opacity-20 rounded-lg p-4 text-center">
              <div className="text-lg font-bold text-gray-800">
                {visitorCount.toLocaleString()} Total Visitors
              </div>
            </div>
            
            <div className="flex space-x-4">
              <a 
                href="https://diabetopedia-app.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white text-blue-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-blue-50 transition-colors duration-200"
              >
                🚀 Try Our App
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-blue-100 hover:text-white transition-colors duration-200 text-sm">
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-blue-100 hover:text-white transition-colors duration-200 text-sm">
                  🍽️ Food Categories
                </Link>
              </li>
              <li>
                <a 
                  href="https://diabetopedia-app.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white transition-colors duration-200 text-sm"
                >
                  📱 Full App
                </a>
              </li>
              <li>
                <a 
                  href="https://diabetopedia.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white transition-colors duration-200 text-sm"
                >
                  🌐 Website
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white mb-4">Get Support</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-blue-100 text-sm">📧</span>
                <span className="text-blue-100 text-sm">support@diabetopedia.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-100 text-sm">🌐</span>
                <a 
                  href="https://diabetopedia.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white transition-colors duration-200 text-sm"
                >
                  diabetopedia.in
                </a>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-blue-100 text-sm">📱</span>
                <a 
                  href="https://diabetopedia-app.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-100 hover:text-white transition-colors duration-200 text-sm"
                >
                  Mobile App
                </a>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="pt-4">
              <h5 className="text-sm font-semibold text-white mb-2">Follow Us</h5>
              <div className="flex space-x-3">
                <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200">
                  📘
                </a>
                <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200">
                  🐦
                </a>
                <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200">
                  📷
                </a>
                <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200">
                  💼
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-blue-400 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-blue-100 text-sm">
              © 2024 Diabetopedia. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors duration-200">
                Medical Disclaimer
              </a>
            </div>
          </div>
          
          {/* Medical Disclaimer */}
          <div className="mt-6 p-4 bg-blue-500 bg-opacity-30 rounded-lg">
            <p className="text-blue-100 text-xs text-center leading-relaxed">
              <strong>Medical Disclaimer:</strong> The information provided by Diabetopedia is for educational 
              purposes only and should not be considered as medical advice. Always consult with your healthcare 
              provider before making any changes to your diet, exercise routine, or medication.
            </p>
          </div>
        </div>
      </div>
      </footer>
    );
  };
  
  export default Footer;
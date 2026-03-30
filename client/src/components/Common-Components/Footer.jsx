import React from 'react';
import { Bird, Book, Link2Icon, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-blue-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-green-500 mb-4">Tree Bay Technology</h3>
            <p className="text-gray-400 mb-6 max-w-sm">
              Formulating the future of climate technology and responsible chemical solutions.
            </p>
            <div className="space-y-2 text-sm text-gray-300">
              <p><strong>Headquarters:</strong> Lucknow, Uttar Pradesh</p>
              <p><strong>Est:</strong> 2018</p>
              <p><strong>Industry:</strong> Climate Technology Product Manufacturing</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 inline-block">Careers</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-green-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Job Categories</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Early Careers</a></li>
              <li><a href="#" className="hover:text-green-400 transition-colors">Diversity & Inclusion</a></li>
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2 inline-block">Connect</h4>
            <div className="flex gap-4 mb-6">
              <a href="#" className="p-2 bg-blue-900 rounded-full hover:bg-green-600 transition-colors">
                <Link2Icon className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-blue-900 rounded-full hover:bg-green-600 transition-colors">
                <Bird className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-blue-900 rounded-full hover:bg-green-600 transition-colors">
                <Book className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-blue-900 rounded-full hover:bg-green-600 transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {currentYear} Tree Bay Technology. All rights reserved.</p>
          <a href="https://www.treebaytechnology.com" className="hover:text-green-400 transition-colors mt-4 md:mt-0">
            www.treebaytechnology.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
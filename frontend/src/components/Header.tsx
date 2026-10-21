import React from 'react';
import { Bookmark, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navigate = useNavigate();
  return (
    <header className="bg-mindstash-cream/95 backdrop-blur-sm border-b border-mindstash-sage/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="bg-mindstash-brown p-2 rounded-lg">
              <Bookmark className="w-6 h-6 text-mindstash-cream" />
            </div>
            <span className="text-2xl font-bold text-mindstash-brown">
              Mindstash
            </span>
          </div>

          <nav className="hidden md:flex space-x-8">
            <a
              href="#features"
              className="text-mindstash-stone hover:text-mindstash-brown transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-mindstash-stone hover:text-mindstash-brown transition-colors"
            >
              How it Works
            </a>
            <a
              href="#pricing"
              className="text-mindstash-stone hover:text-mindstash-brown transition-colors"
            >
              Pricing
            </a>
          </nav>

          <div className="hidden md:flex space-x-4">
            <button
              onClick={() => {
                navigate('/signin');
              }}
              className="text-mindstash-brown hover:text-mindstash-stone transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => {
                navigate('/signup');
              }}
              className="bg-mindstash-brown text-mindstash-cream px-6 py-2 rounded-lg hover:bg-mindstash-stone transition-colors"
            >
              Get Started
            </button>
          </div>

          <button
            className="md:hidden text-mindstash-brown"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-mindstash-sage/20">
            <nav className="flex flex-col space-y-4">
              <a
                href="#features"
                className="text-mindstash-stone hover:text-mindstash-brown transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-mindstash-stone hover:text-mindstash-brown transition-colors"
              >
                How it Works
              </a>
              <a
                href="#pricing"
                className="text-mindstash-stone hover:text-mindstash-brown transition-colors"
              >
                Pricing
              </a>
              <div className="flex flex-col space-y-2 pt-4 border-t border-mindstash-sage/20">
                <button className="text-mindstash-brown text-left">
                  Sign In
                </button>
                <button className="bg-mindstash-brown text-mindstash-cream px-6 py-2 rounded-lg hover:bg-mindstash-stone transition-colors text-left w-fit">
                  Get Started
                </button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

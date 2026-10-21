
import { Bookmark, Twitter, Youtube, Github, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-screen bg-whit ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="bg-mindstash-brown p-2 rounded-lg">
                <Bookmark className="w-5 h-5 text-mindstash-cream" />
              </div>
              <span className="text-xl font-bold text-mindstash-brown">
                Mindstash
              </span>
            </div>
            <p className="text-mindstash-stone leading-relaxed">
              The simplest way to organize, save, and share your favorite links.
              Built with love for digital minimalists.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-mindstash-stone hover:text-mindstash-brown transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-mindstash-stone hover:text-mindstash-brown transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-mindstash-stone hover:text-mindstash-brown transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-mindstash-stone hover:text-mindstash-brown transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>



          <div>
            <h3 className="font-semibold text-mindstash-brown mb-4">Support</h3>
            <ul className="space-y-2">

              <li>
                <a
                  href="#"
                  className="text-mindstash-stone hover:text-mindstash-brown transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-mindstash-stone hover:text-mindstash-brown transition-colors"
                >
                  Community
                </a>
              </li>

            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-mindstash-brown mb-4">Project</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-mindstash-stone hover:text-mindstash-brown transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-mindstash-stone hover:text-mindstash-brown transition-colors"
                >
                  Blog
                </a>
              </li>


            </ul>
          </div>
        </div>

        <div className="border-t border-mindstash-sage/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-mindstash-stone text-sm">
             2025 Mindstash.
          </p>
          <p className="text-mindstash-stone text-sm mt-4 md:mt-0">
            Made with for bookmark lovers everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

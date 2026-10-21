import { ArrowRight, Share2, Youtube, Twitter } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [click, setClick] = useState(false);
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-br from-mindstash-cream via-mindstash-sage/10 to-mindstash-cream min-h-[90vh] flex items-center">
      {click ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div>
            <img
              src="/demo.png"
              alt="Displayed on click"
              className="mt-4 w-7xl h-7xl"
            />
          </div>
          <div className="flex justify-center">
            <button
              onClick={() => {
                setClick(false);
              }}
              className="bg-red-400  text-mindstash-cream px-4 py-2 rounded-lg mt-4 hover:bg-red-600 transition-all duration-300"
            >
              close
            </button>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-mindstash-brown leading-tight">
                  Your Digital
                  <span className="block text-mindstash-sage">
                    Bookmark Haven
                  </span>
                </h1>
                <p className="text-xl text-mindstash-stone leading-relaxed">
                  Organize, save, and share your favorite links effortlessly.
                  Never lose track of valuable content again with Mindstash.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    navigate('/signup');
                  }}
                  className="bg-mindstash-brown text-mindstash-cream px-8 py-4 rounded-lg hover:bg-mindstash-stone transition-all duration-300 flex items-center justify-center space-x-2 group"
                >
                  <span>Start Organizing</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => {
                    setClick(true);
                  }}
                  className="border-2 border-mindstash-brown text-mindstash-brown px-8 py-4 rounded-lg hover:bg-mindstash-brown hover:text-mindstash-cream transition-all duration-300"
                >
                  See Demo
                </button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-2">
                  <Share2 className="w-5 h-5 text-mindstash-sage" />
                  <span className="text-mindstash-stone text-sm">
                    Easy Sharing
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Youtube className="w-5 h-5 text-red-600" />
                  <span className="text-mindstash-stone text-sm">
                    YouTube Support
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Twitter className="w-5 h-5 text-blue-500" />
                  <span className="text-mindstash-stone text-sm">
                    Twitter Integration
                  </span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 border border-mindstash-sage/20">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 bg-mindstash-cream p-4 rounded-lg border border-mindstash-sage/20">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <Youtube className="w-5 h-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-mindstash-brown">
                        Amazing Tutorial
                      </p>
                      <p className="text-sm text-mindstash-stone">
                        youtube.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 bg-mindstash-cream p-4 rounded-lg border border-mindstash-sage/20">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Twitter className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-mindstash-brown">
                        Inspiring Thread
                      </p>
                      <p className="text-sm text-mindstash-stone">
                        twitter.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 bg-mindstash-cream p-4 rounded-lg border border-mindstash-sage/20">
                    <div className="w-10 h-10 bg-mindstash-sage/20 rounded-lg flex items-center justify-center">
                      <div className="w-3 h-3 bg-mindstash-sage rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-mindstash-brown">
                        Design Resources
                      </p>
                      <p className="text-sm text-mindstash-stone">
                        dribbble.com
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-mindstash-brown text-mindstash-cream p-3 rounded-full shadow-lg">
                <Share2 className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;

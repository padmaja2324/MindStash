import { MousePointer, FolderPlus, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
  const navigate = useNavigate();
  const steps = [
    {
      icon: MousePointer,
      title: 'Save with One Click',
      description:
        'Install our browser extension or use the web app to bookmark any page instantly.',
      step: '01',
    },
    {
      icon: FolderPlus,
      title: 'Organize Your Way',
      description:
        'Create folders, add tags, and organize your bookmarks exactly how you want.',
      step: '02',
    },
    {
      icon: Share2,
      title: 'Share & Collaborate',
      description:
        'Share collections with others or keep them private. Perfect for teams and communities.',
      step: '03',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-mindstash-cream/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-mindstash-brown">
            Simple as
            <span className="block text-mindstash-sage">one, two, three</span>
          </h2>
          <p className="text-xl text-mindstash-stone max-w-3xl mx-auto">
            Get started with Mindstash in minutes and transform how you manage
            your digital resources
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center space-y-6">
              <div className="relative">
                <div className="w-20 h-20 bg-mindstash-brown rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-10 h-10 text-mindstash-cream" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-mindstash-sage rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {step.step}
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-mindstash-brown">
                {step.title}
              </h3>
              <p className="text-mindstash-stone leading-relaxed max-w-sm mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button
            onClick={() => {
              navigate('/signup');
            }}
            className="bg-mindstash-brown text-mindstash-cream px-8 py-4 rounded-lg hover:bg-mindstash-stone transition-all duration-300 text-lg font-medium"
          >
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

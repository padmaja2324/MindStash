
import {
  Bookmark,
  Share2,
  Folder,
  Youtube,
  Twitter,
  Zap,
  Shield,
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Bookmark,
      title: 'Smart Bookmarking',
      description:
        'Save any link with one click. Our smart system automatically extracts titles, descriptions, and thumbnails.',
    },
    {
      icon: Folder,
      title: 'Organized Collections',
      description:
        'Create custom folders and tags to keep your bookmarks perfectly organized and easy to find.',
    },
    {
      icon: Share2,
      title: 'Easy Sharing',
      description:
        'Share individual bookmarks or entire collections with friends, colleagues, or make them public.',
    },

    {
      icon: Youtube,
      title: 'YouTube Integration',
      description:
        'Special support for YouTube videos with thumbnail previews, duration, and channel information.',
    },
    {
      icon: Twitter,
      title: 'Twitter Support',
      description:
        'Save tweets and threads with automatic formatting and user information preservation.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description:
        'Built for speed with instant loading and real-time sync across all your devices.',
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description:
        'Your bookmarks are private by default. You control what to share when to share.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-mindstash-brown">
            Everything you need to
            <span className="block text-mindstash-sage">
              manage your bookmarks
            </span>
          </h2>
          <p className="text-xl text-mindstash-stone max-w-3xl mx-auto">
            Powerful features designed to make bookmark management effortless
            and enjoyable
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl border border-mindstash-sage/20 hover:border-mindstash-sage hover:shadow-lg transition-all duration-300 bg-mindstash-cream/30"
            >
              <div className="w-12 h-12 bg-mindstash-brown/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-mindstash-brown group-hover:text-mindstash-cream transition-colors">
                <feature.icon className="w-6 h-6 text-mindstash-brown group-hover:text-mindstash-cream" />
              </div>
              <h3 className="text-xl font-semibold text-mindstash-brown mb-2">
                {feature.title}
              </h3>
              <p className="text-mindstash-stone leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

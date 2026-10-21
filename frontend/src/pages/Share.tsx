import { useEffect, useState } from 'react';
import { Card } from '../components/Card';
import { useShare } from '../hooks/useShare';
import { Logo } from '../icons/Logo';
import { TwitterIcon } from '../icons/TwitterIcon';
import { YoutubeIcon } from '../icons/YoutubeIcon';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export function Share() {
  const navigate = useNavigate();
  const { contents, refresh } = useShare();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => { refresh(); }, []);

  const SidebarContent = () => (
    <div className="flex flex-col h-full py-6 px-5">
      <div
        onClick={() => { navigate('/'); setMobileOpen(false); }}
        className="flex items-center gap-3 text-xl font-bold tracking-tight cursor-pointer mb-8 pt-1"
      >
        <div className="p-2 rounded-xl bg-[#E2F0E9] text-[#0D825B] shrink-0">
          <Logo />
        </div>
        <span className="text-[#17211C]">MindStash</span>
      </div>

      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A8982] px-3 mb-3">
          Content Sources
        </p>
        <div className="space-y-1">
          <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs text-[#5F7068] hover:bg-[#F0F6F2] hover:text-[#17211C] cursor-pointer">
            <TwitterIcon />
            <span>Twitter / X</span>
          </div>
          <div className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs text-[#5F7068] hover:bg-[#F0F6F2] hover:text-[#17211C] cursor-pointer">
            <YoutubeIcon />
            <span>YouTube Media</span>
          </div>
        </div>
        <p className="text-[11px] text-[#7A8982] px-3 pt-3 leading-relaxed">
          Twitter content may load slower due to API limitations.
        </p>
      </div>
    </div>
  );

  return (
    <div
      className="min-h-screen text-[#17211C] font-sans"
      style={{
        backgroundColor: '#F7FAF8',
        backgroundImage:
          'linear-gradient(rgba(20,60,45,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(20,60,45,0.04) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
      }}
    >
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col h-screen bg-white border-r border-[#D9E4DE] w-64 fixed left-0 top-0 z-30 shadow-sm">
        <SidebarContent />
      </aside>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2.5 bg-white border border-[#D9E4DE] rounded-xl shadow-sm text-[#17211C] hover:bg-[#F0F6F2] transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              key="drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="lg:hidden fixed left-0 top-0 h-full w-72 bg-white border-r border-[#D9E4DE] z-50 shadow-xl"
            >
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-3 right-3 p-2 rounded-lg text-[#5F7068] hover:bg-[#F0F6F2] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="lg:ml-64 flex flex-col min-h-screen">
        {/* Sticky header */}
        <header className="sticky top-0 z-20 bg-white border-b border-[#D9E4DE] shadow-sm px-4 lg:px-6 py-4 flex items-center gap-4">
          <div className="w-10 lg:hidden shrink-0" />
          <div>
            <h1 className="text-sm font-bold text-[#17211C]">Shared Knowledge Canvas</h1>
            <p className="text-xs text-[#5F7068]">Read-only public view</p>
          </div>
        </header>

        {/* Grid */}
        <main className="flex-1 p-4 lg:p-6">
          {contents.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-center text-[#5F7068]">
              <p className="text-sm font-bold text-[#17211C]">
                Oops :( this shared link is invalid or empty.
              </p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 auto-rows-max"
            >
              {contents.map((item: any, index: number) => (
                <Card
                  key={item._id || index}
                  contentid={item._id || `share-${index}`}
                  type={item.type}
                  link={item.link}
                  title={item.title}
                  description={item.description}
                  imageUrl={item.imageUrl}
                  fileUrl={item.fileUrl}
                  fileName={item.fileName}
                  share={true}
                />
              ))}
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
}

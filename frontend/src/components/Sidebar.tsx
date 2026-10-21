import { useState } from 'react';
import { Logo } from '../icons/Logo';
import { TwitterIcon } from '../icons/TwitterIcon';
import { YoutubeIcon } from '../icons/YoutubeIcon';
import { ToggleSwitch } from './Toggle';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Plus, LogOut, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SidebarProps {
  shared: boolean;
  onshared: (value: boolean) => void;
  onAddContent?: () => void;
}

export function Sidebar({ shared, onshared, onAddContent }: SidebarProps) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  function isToggled(toggled: boolean) {
    onshared(!toggled);
  }

  const close = () => setMobileOpen(false);

  const SidebarBody = () => (
    <div className="flex flex-col justify-between h-full py-6 px-5 text-[#17211C]">
      <div className="space-y-6">
        {/* Brand */}
        <div
          onClick={() => { navigate('/'); close(); }}
          className="flex items-center gap-3 text-xl font-bold tracking-tight cursor-pointer group pt-1"
        >
          <div className="p-2 rounded-xl bg-[#E2F0E9] text-[#0D825B] shrink-0">
            <Logo />
          </div>
          <span className="text-[#17211C]">MindStash</span>
        </div>

        {/* Nav */}
        <div className="space-y-1 pt-2">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A8982] px-3 mb-2">
            Workspace
          </p>

          <button
            onClick={() => { navigate('/dashboard'); close(); }}
            className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-lg bg-[#E2F0E9] text-[#0D825B] font-bold text-xs transition-all cursor-pointer"
          >
            <LayoutDashboard className="w-4 h-4 shrink-0" />
            <span>Workspace Canvas</span>
          </button>

          <button
            onClick={() => { navigate('/dashboard'); close(); }}
            className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-lg hover:bg-[#F0F6F2] text-[#5F7068] hover:text-[#17211C] font-medium text-xs transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#0D825B] shrink-0" />
            <span>AI Brain Chat</span>
          </button>

          <div className="pt-4 border-t border-[#EAF4EF]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#7A8982] px-3 mb-2">
              Content Sources
            </p>
            <div className="space-y-1">
              <div className="flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs text-[#5F7068] hover:bg-[#F0F6F2] hover:text-[#17211C] cursor-pointer">
                <TwitterIcon />
                <span>Twitter / X</span>
              </div>
              <div className="flex items-center gap-3 px-3.5 py-2 rounded-lg text-xs text-[#5F7068] hover:bg-[#F0F6F2] hover:text-[#17211C] cursor-pointer">
                <YoutubeIcon />
                <span>YouTube Media</span>
              </div>
            </div>
          </div>
        </div>

        {/* Add Content Button */}
        {onAddContent && (
          <div className="pt-1">
            <button
              onClick={() => { onAddContent(); close(); }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[#0D825B] hover:bg-[#0D825B]/90 text-white font-bold text-xs transition-all cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Content</span>
            </button>
          </div>
        )}

        {/* Sharing Toggle */}
        {shared && (
          <div className="pt-1">
            <ToggleSwitch text="Disable sharing" onclick={isToggled} />
          </div>
        )}
      </div>

      {/* Footer / Sign Out */}
      <div className="border-t border-[#EAF4EF] pt-4">
        <button
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/signin');
          }}
          className="flex items-center gap-2 w-full px-3.5 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all text-xs font-semibold cursor-pointer border border-red-200"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop sidebar (always visible ≥ lg) ─────────────────────────── */}
      <aside className="hidden lg:flex flex-col h-screen bg-white border-r border-[#D9E4DE] w-64 fixed left-0 top-0 z-30 shadow-sm">
        <SidebarBody />
      </aside>

      {/* ── Mobile hamburger trigger (visible < lg) ────────────────────────── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 p-2.5 bg-white border border-[#D9E4DE] rounded-xl shadow-sm text-[#17211C] hover:bg-[#F0F6F2] transition-colors"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* ── Mobile drawer + backdrop ───────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
              onClick={close}
            />

            {/* Drawer */}
            <motion.div
              key="drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="lg:hidden fixed left-0 top-0 h-full w-72 bg-white border-r border-[#D9E4DE] z-50 shadow-xl flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={close}
                className="absolute top-3 right-3 p-2 rounded-lg text-[#5F7068] hover:bg-[#F0F6F2] hover:text-[#17211C] transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>

              <SidebarBody />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

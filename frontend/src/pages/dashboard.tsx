import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import {
  Plus,
  Share2,
  Search,
  Brain,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { Card, CardContent } from '../components/Card';
import { CreateContentModal } from '../components/CreateContentModal';
import { Sidebar } from '../components/Sidebar';
import { useContent } from '../hooks/useContent';
import { BACKEND_URL, FRONTEND_URL } from '../config';
import { ContentItem } from '../types/content';

const contentFilters = ['All', 'Web Pages', 'Documents', 'Videos', 'Tweets', 'Notes'];

export function Dashboard() {
  const [modalOpen, setModalOpen]       = useState(false);
  const [shared, setShared]             = useState(false);
  const [searchQuery, setSearchQuery]   = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeId, setActiveId]         = useState<string | null>(null);

  const { contents, setContents, refresh } = useContent();
  const navigate = useNavigate();

  // ── Sensors ────────────────────────────────────────────────────────────────
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // ── Session guard ──────────────────────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      if (!localStorage.getItem('token')) {
        alert('Your session has expired. Please sign in again.');
        navigate('/signin');
      }
    }, 1000 * 60 * 10);
    return () => clearInterval(interval);
  }, [navigate]);

  // ── Persist order ──────────────────────────────────────────────────────────
  const persistOrder = useCallback(async (ordered: ContentItem[]) => {
    const updates = ordered.map((item, idx) => ({ id: item._id, order: idx }));
    try {
      await axios.patch(
        `${BACKEND_URL}/api/v1/content/reorder`,
        { updates },
        { headers: { Authorization: localStorage.getItem('token') } }
      );
    } catch (err) {
      console.error('Failed to persist card order:', err);
    }
  }, []);

  // ── Drag handlers ──────────────────────────────────────────────────────────
  const handleDragStart = (event: DragStartEvent) => setActiveId(event.active.id as string);
  const handleDragCancel = () => setActiveId(null);

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setContents((prev) => {
      const oldIndex = prev.findIndex((i) => i._id === active.id);
      const newIndex = prev.findIndex((i) => i._id === over.id);
      const reordered = arrayMove(prev, oldIndex, newIndex);
      persistOrder(reordered);
      return reordered;
    });
  };

  // ── Filtering ──────────────────────────────────────────────────────────────
  const filteredContents = contents.filter((item) => {
    const matchesFilter =
      activeFilter === 'All' ||
      (activeFilter === 'Web Pages'  && item.type === 'website') ||
      (activeFilter === 'Documents'  && (item.type === 'document' || Boolean(item.fileUrl) || Boolean(item.fileName))) ||
      (activeFilter === 'Videos'     && item.type === 'youtube') ||
      (activeFilter === 'Tweets'     && item.type === 'twitter') ||
      (activeFilter === 'Notes'      && item.type === 'note');

    const q = searchQuery.toLowerCase();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      (item.fileName    && item.fileName.toLowerCase().includes(q));

    return matchesFilter && matchesSearch;
  });

  const activeCard = activeId ? contents.find((c) => c._id === activeId) : null;

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
      <Sidebar shared={shared} onshared={setShared} onAddContent={() => setModalOpen(true)} />

      {/*
        ── Main content area
        On desktop (≥lg): offset by 256px (w-64) sidebar
        On mobile: full width, no offset (sidebar is in a drawer)
      */}
      <div className="lg:ml-64 flex flex-col min-h-screen">

        {/* ── Top Header ────────────────────────────────────────────────────── */}
        <header className="sticky top-0 z-20 bg-white border-b border-[#D9E4DE] shadow-sm px-4 lg:px-6 py-3">
          {/* Row 1: Search + Actions */}
          <div className="flex items-center gap-3">
            {/* Spacer for mobile hamburger button (44px) */}
            <div className="w-10 lg:hidden shrink-0" />

            {/* Search */}
            <div className="flex flex-1 items-center bg-[#F7FAF8] border border-[#D9E4DE] rounded-lg px-3 h-9 gap-2 focus-within:border-[#0D825B] transition-colors min-w-0">
              <Search className="w-4 h-4 text-[#0D825B] shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search memories..."
                className="bg-transparent border-none w-full text-xs text-[#17211C] placeholder:text-[#7A8982] outline-none font-medium min-w-0"
              />
            </div>

            {/* Share button — hidden on xs, icon-only on sm */}
            <button
              onClick={async () => {
                setShared(true);
                try {
                  const response = await axios.post(
                    `${BACKEND_URL}/api/v1/brain/share`,
                    { share: true },
                    { headers: { Authorization: localStorage.getItem('token') } }
                  );
                  const shareUrl = `${FRONTEND_URL}/brain/${response.data.hash}`;
                  navigator.clipboard.writeText(shareUrl);
                  alert(`Share link copied!\n${shareUrl}`);
                } catch (err) {
                  console.error('Error sharing brain:', err);
                }
              }}
              className="hidden sm:flex items-center gap-1.5 bg-[#F7FAF8] border border-[#D9E4DE] hover:border-[#0D825B] px-3 py-2 rounded-lg text-xs text-[#17211C] font-bold transition-colors cursor-pointer shrink-0"
            >
              <Share2 className="w-3.5 h-3.5 text-[#0D825B]" />
              <span className="hidden md:inline">Share Brain</span>
            </button>

            {/* Add Content */}
            <button
              onClick={() => setModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#0D825B] hover:bg-[#0D825B]/90 px-3 py-2 rounded-lg text-xs font-bold text-white shadow-sm transition-all cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Content</span>
            </button>
          </div>

          {/* Row 2: Filter pills (scrollable on mobile) */}
          <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto scrollbar-none pb-0.5">
            {contentFilters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1 rounded-lg text-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  activeFilter === f
                    ? 'bg-[#E2F0E9] border border-[#0D825B] text-[#0D825B] font-bold'
                    : 'bg-white text-[#5F7068] border border-[#D9E4DE] hover:text-[#17211C] font-semibold'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </header>

        {/* ── Card Grid ─────────────────────────────────────────────────────── */}
        <main className="flex-1 p-4 lg:p-6">
          <AnimatePresence mode="wait">
            {filteredContents.length > 0 ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                onDragCancel={handleDragCancel}
              >
                <SortableContext
                  items={filteredContents.map((c) => c._id)}
                  strategy={rectSortingStrategy}
                >
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    /* 1 col on mobile → 2 on sm → 3 on lg → 4 on xl */
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-5 auto-rows-max"
                  >
                    {filteredContents.map((item) => (
                      <Card
                        key={item._id}
                        contentid={item._id}
                        title={item.title}
                        type={item.type}
                        link={item.link}
                        description={item.description}
                        imageUrl={item.imageUrl}
                        fileUrl={item.fileUrl}
                        fileName={item.fileName}
                        share={false}
                        onDelete={refresh}
                      />
                    ))}
                  </motion.div>
                </SortableContext>

                <DragOverlay dropAnimation={{ duration: 200, easing: 'cubic-bezier(0.18,0.67,0.6,1.22)' }}>
                  {activeCard ? (
                    <div className="w-64 opacity-95 rotate-2 scale-105 shadow-2xl pointer-events-none">
                      <CardContent {...activeCard} contentid={activeCard._id} isOverlay share={false} />
                    </div>
                  ) : null}
                </DragOverlay>
              </DndContext>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center min-h-[60vh] gap-3 text-center text-[#5F7068]"
              >
                <Brain className="w-12 h-12 text-[#0D825B]" />
                <p className="text-sm font-bold text-[#17211C]">No memories found.</p>
                <button
                  onClick={() => setModalOpen(true)}
                  className="mt-1 text-xs font-bold text-[#0D825B] hover:underline cursor-pointer"
                >
                  + Add your first memory
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <CreateContentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSuccess={refresh}
      />
    </div>
  );
}

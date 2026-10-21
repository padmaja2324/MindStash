import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'motion/react';
import {
  ExternalLink,
  Trash2,
  FileText,
  Globe,
  Youtube,
  Twitter,
  GripHorizontal,
  Download,
} from 'lucide-react';
import { BACKEND_URL } from '../config';

export interface CardProps {
  contentid: string;
  title: string;
  link: string;
  type: string;
  description?: string;
  imageUrl?: string;
  fileUrl?: string;
  fileName?: string;
  share?: boolean;
  onDelete?: () => void;
  /** When true, renders a static ghost clone (used inside DragOverlay) */
  isOverlay?: boolean;
}

// ─── Pure display card (no dnd-kit hooks) ─────────────────────────────────────
export function CardContent({
  contentid,
  title,
  link,
  type,
  description,
  imageUrl,
  fileUrl,
  fileName,
  share = false,
  onDelete,
  isOverlay = false,
}: CardProps) {
  const [previewImage, setPreviewImage] = useState<string>(imageUrl || '');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (type === 'website' && link && !imageUrl && !share) {
      let isMounted = true;
      async function fetchPreview() {
        try {
          const res = await axios.get(
            `https://api.linkpreview.net/?q=${encodeURIComponent(link)}`,
            { headers: { 'X-Linkpreview-Api-Key': 'ad989b96186bf536d4e6e979c4f8466f' } }
          );
          if (isMounted && res.data?.image) setPreviewImage(res.data.image);
        } catch {
          // ignore
        }
      }
      fetchPreview();
      return () => { isMounted = false; };
    }
  }, [type, link, imageUrl, share]);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDeleting) return;
    setIsDeleting(true);
    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        data: { contentId: contentid },
        headers: { Authorization: localStorage.getItem('token') },
      });
      if (onDelete) onDelete();
    } catch (error) {
      console.error('Error deleting card:', error);
      setIsDeleting(false);
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'youtube':  return <Youtube  className="w-4 h-4 text-red-500" />;
      case 'twitter':  return <Twitter  className="w-4 h-4 text-sky-500" />;
      case 'document': return <FileText className="w-4 h-4 text-[#0D825B]" />;
      default:         return <Globe    className="w-4 h-4 text-[#0D825B]" />;
    }
  };

  const isDocument = type === 'document' || Boolean(fileUrl) || Boolean(fileName);

  return (
    <div
      className={`w-full bg-white border border-[#D9E4DE] hover:border-[#0D825B]/50
        rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col
        justify-between h-full min-h-[280px]
        ${isOverlay ? 'rotate-2 shadow-xl border-[#0D825B]' : ''}`}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between gap-2 border-b border-[#EAF4EF] pb-3 mb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1.5 rounded-lg bg-[#F0F6F2] border border-[#D9E4DE] shrink-0">
              {getIcon()}
            </div>
            <h3 className="text-sm font-bold text-[#17211C] truncate max-w-[160px]" title={title}>
              {title || 'Untitled'}
            </h3>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {/* Grip handle — drag listeners are applied by the Card wrapper, not here */}
            {!share && (
              <span
                className="p-1 rounded text-[#5F7068] hover:text-[#0D825B] transition-colors"
                title="Drag to reorder"
                data-drag-handle
              >
                <GripHorizontal className="w-4 h-4" />
              </span>
            )}

            {link && (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 text-[#5F7068] hover:text-[#17211C] transition-colors"
                title="Open Link"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}

            {!share && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={isDeleting}
                className="p-1 text-[#5F7068] hover:text-red-500 transition-colors cursor-pointer disabled:opacity-50"
                title="Delete Memory"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Document Attachment */}
        {isDocument && (
          <div className="mb-3 bg-[#F0F6F2] border border-[#D9E4DE] rounded-lg p-3 space-y-2">
            <div className="flex items-start gap-2.5">
              <div className="p-2 rounded-lg bg-white border border-[#D9E4DE] text-[#0D825B] shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0D825B] bg-[#E2F0E9] px-2 py-0.5 rounded inline-block mb-0.5">
                  Document File
                </span>
                <p className="text-xs font-bold text-[#17211C] truncate">
                  {fileName || title || 'Document Attachment'}
                </p>
              </div>
            </div>
            {fileUrl && (
              <a
                href={fileUrl}
                download={fileName || 'document'}
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-lg bg-[#0D825B] hover:bg-[#0D825B]/90 text-white text-xs font-bold transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Open / Download Document</span>
              </a>
            )}
          </div>
        )}

        {/* YouTube Embed */}
        {type === 'youtube' && link && (
          <div className="mb-3 rounded-lg overflow-hidden border border-[#D9E4DE]">
            <iframe
              className="w-full h-36"
              src={link.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
              title="YouTube video"
              allowFullScreen
            />
          </div>
        )}

        {/* Image Preview */}
        {previewImage && type !== 'youtube' && (
          <div className="mb-3 rounded-lg overflow-hidden border border-[#D9E4DE] bg-[#F5F8F6]">
            <img src={previewImage} alt={title} className="w-full h-36 object-cover" />
          </div>
        )}

        {/* Description */}
        {description && (
          <p className="text-xs text-[#5F7068] leading-relaxed mb-3 line-clamp-3 bg-[#F7FAF8] p-2.5 rounded-lg border border-[#EAF4EF]">
            {description}
          </p>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto pt-2 border-t border-[#EAF4EF] flex items-center justify-between text-[10px] text-[#5F7068]">
        <span className="uppercase tracking-wider font-semibold text-[#0D825B]">{type}</span>
        <span className="w-2 h-2 rounded-full bg-[#0D825B]" />
      </div>
    </div>
  );
}

// ─── Sortable wrapper (owns dnd-kit hooks) ─────────────────────────────────────
export function Card(props: CardProps) {
  const { contentid, share = false } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: contentid,
    disabled: share,
  });

  // dnd-kit controls the CSS transform; Framer Motion controls layout shift
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none',
    zIndex: isDragging ? 50 : 'auto',
  };

  return (
    // motion.div with layout= drives the reflow animation AFTER drop
    // It does NOT carry the live drag transform (that's on the inner div above)
    <motion.div layout layoutId={contentid} style={{ opacity: isDragging ? 0 : 1 }}>
      {/* dnd-kit ref + listeners live here, separate from layout motion */}
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`h-full ${!share ? 'cursor-grab active:cursor-grabbing' : ''}`}
      >
        <CardContent {...props} />
      </div>
    </motion.div>
  );
}

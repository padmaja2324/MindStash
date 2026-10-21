import { useState, ChangeEvent } from 'react';
import { CrossIcon } from '../icons/CrossIcon';
import { BACKEND_URL } from '../config';
import axios from 'axios';
import { Upload, FileText, Image as ImageIcon, Link as LinkIcon, CheckCircle2, X } from 'lucide-react';
import { ContentItem } from '../types/content';

export enum ContentType {
  Website = 'website',
  Document = 'document',
  Youtube = 'youtube',
  Twitter = 'twitter',
  Note = 'note',
}

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: (newItem?: ContentItem) => void;
}

export function CreateContentModal({ open, onClose, onSuccess }: CreateContentModalProps) {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [type, setType] = useState<ContentType>(ContentType.Website);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState<string>('');
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Limit: 5MB for images (base64 adds ~33% overhead, 5MB → ~6.7MB)
      const maxSizeMB = 5;
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`Image is too large. Please select an image under ${maxSizeMB}MB.`);
        e.target.value = '';
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Limit: 10MB for documents (base64 adds ~33% overhead)
      const maxSizeMB = 10;
      if (file.size > maxSizeMB * 1024 * 1024) {
        alert(`File is too large. Please select a file under ${maxSizeMB}MB.`);
        e.target.value = '';
        return;
      }
      setFileName(file.name);
      const sizeInKb = (file.size / 1024).toFixed(1);
      setFileSize(file.size > 1024 * 1024 ? `${(file.size / (1024 * 1024)).toFixed(1)} MB` : `${sizeInKb} KB`);
      if (type === ContentType.Website) setType(ContentType.Document);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeFile = () => {
    setFileName('');
    setFileUrl('');
    setFileSize('');
  };

  const removeImage = () => {
    setImageUrl('');
  };

  async function addContent() {
    if (!title.trim() && !link.trim() && !description.trim() && !imageUrl && !fileUrl) {
      alert('Please provide at least a title, description, link, or attachment.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          title: title.trim() || fileName || 'Untitled Memory',
          link: link.trim(),
          type,
          description: description.trim(),
          imageUrl,
          fileUrl,
          fileName,
        },
        {
          headers: {
            Authorization: localStorage.getItem('token'),
          },
        }
      );

      setLoading(false);
      if (onSuccess) {
        onSuccess(response.data.content);
      }
      onClose();
    } catch (err) {
      console.error('Error adding content:', err);
      setLoading(false);
      alert('Failed to save memory. Please check your backend connection.');
    }
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#17211C]/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box (Light Mode Pure White #FFFFFF) */}
      <div className="relative w-full max-w-lg bg-white border border-[#D9E4DE] rounded-2xl p-6 shadow-xl z-10 space-y-5 text-[#17211C] max-h-[90vh] overflow-y-auto scrollbar-thin">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#EAF4EF] pb-3.5">
          <div>
            <h2 className="text-lg font-bold text-[#17211C]">Add Content to Workspace</h2>
            <p className="text-xs text-[#5F7068]">Attach links, documents, notes, or media</p>
          </div>
          <button
            onClick={onClose}
            className="text-[#5F7068] hover:text-[#17211C] p-1.5 rounded-lg hover:bg-[#F0F6F2] transition-colors cursor-pointer"
          >
            <CrossIcon />
          </button>
        </div>

        {/* Content Type Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#5F7068]">
            Content Type
          </label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: ContentType.Website, label: 'Website' },
              { id: ContentType.Document, label: 'Document' },
              { id: ContentType.Youtube, label: 'YouTube' },
              { id: ContentType.Twitter, label: 'Twitter' },
              { id: ContentType.Note, label: 'Note' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setType(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  type === item.id
                    ? 'bg-[#E2F0E9] border border-[#0D825B] text-[#0D825B]'
                    : 'bg-[#F7FAF8] text-[#5F7068] border border-[#D9E4DE] hover:text-[#17211C]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#5F7068]">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Memory title..."
            className="w-full bg-[#F7FAF8] border border-[#D9E4DE] rounded-lg px-3.5 py-2 text-sm text-[#17211C] placeholder:text-[#7A8982] outline-none focus:border-[#0D825B] transition-colors"
          />
        </div>

        {/* Link / URL */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#5F7068]">
            Link / URL
          </label>
          <div className="relative flex items-center">
            <LinkIcon className="absolute left-3 w-4 h-4 text-[#0D825B]" />
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://..."
              className="w-full bg-[#F7FAF8] border border-[#D9E4DE] rounded-lg pl-9 pr-3.5 py-2 text-sm text-[#17211C] placeholder:text-[#7A8982] outline-none focus:border-[#0D825B] transition-colors"
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#5F7068]">
            Description / Notes
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add detailed notes..."
            rows={3}
            className="w-full bg-[#F7FAF8] border border-[#D9E4DE] rounded-lg px-3.5 py-2 text-sm text-[#17211C] placeholder:text-[#7A8982] outline-none focus:border-[#0D825B] transition-colors resize-none"
          />
        </div>

        {/* File Attachment */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#5F7068]">
            Document Attachment
          </label>
          {fileName ? (
            <div className="flex items-center justify-between bg-[#E2F0E9] border border-[#0D825B] p-3 rounded-lg text-sm text-[#17211C]">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-5 h-5 text-[#0D825B] shrink-0" />
                <div className="min-w-0">
                  <p className="font-bold text-xs truncate text-[#17211C]">{fileName}</p>
                  {fileSize && <p className="text-[11px] text-[#5F7068]">{fileSize} · Ready to attach</p>}
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="p-1 text-[#5F7068] hover:text-red-500 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="relative border border-dashed border-[#D9E4DE] rounded-lg p-3.5 bg-[#F7FAF8] hover:border-[#0D825B] transition-colors flex items-center gap-3 cursor-pointer group">
              <input
                type="file"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <FileText className="w-5 h-5 text-[#0D825B] shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-xs font-semibold text-[#17211C] block">Select document (PDF, TXT, DOCX)</span>
                <span className="text-[11px] text-[#5F7068] block">Click or drop file here</span>
              </div>
              <Upload className="w-4 h-4 text-[#5F7068] shrink-0" />
            </div>
          )}
        </div>

        {/* Image Cover */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold uppercase tracking-wider text-[#5F7068]">
            Image Cover / Thumbnail
          </label>
          {imageUrl ? (
            <div className="flex items-center justify-between bg-[#E2F0E9] border border-[#0D825B] p-3 rounded-lg">
              <div className="flex items-center gap-3">
                <img
                  src={imageUrl}
                  alt="Uploaded Preview"
                  className="h-12 w-16 object-cover rounded border border-[#D9E4DE]"
                />
                <div>
                  <span className="text-xs font-bold text-[#17211C] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0D825B]" /> Image Selected
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={removeImage}
                className="p-1 text-[#5F7068] hover:text-red-500 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="relative border border-dashed border-[#D9E4DE] rounded-lg p-3.5 bg-[#F7FAF8] hover:border-[#0D825B] transition-colors text-center cursor-pointer group">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="flex items-center justify-center gap-2 text-[#5F7068]">
                <ImageIcon className="w-4 h-4 text-[#0D825B]" />
                <span className="text-xs font-medium">Select image thumbnail</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-3 border-t border-[#EAF4EF]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-[#5F7068] hover:text-[#17211C] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={addContent}
            className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-[#0D825B] hover:bg-[#0D825B]/90 transition-all cursor-pointer disabled:opacity-50 shadow-sm"
          >
            {loading ? 'Saving...' : 'Add Content'}
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

export default function ImageGrid({ images }) {
  const [openIndex, setOpenIndex] = useState(null);

  if (!images?.length) return null;

  return (
    <>
      <div className={`mt-2 grid gap-1 rounded-xl overflow-hidden ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpenIndex(i); }}
            className={`w-full object-cover cursor-pointer ${images.length === 1 ? 'max-h-80' : 'h-36'}`}
          />
        ))}
      </div>

      {openIndex !== null && createPortal(
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999]"
          onClick={() => setOpenIndex(null)}
        >
          <button
            onClick={() => setOpenIndex(null)}
            className="absolute top-4 right-4 text-white"
          >
            <X size={28} />
          </button>
          <img
            src={images[openIndex]}
            alt=""
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>,
        document.body
      )}
    </>
  );
}

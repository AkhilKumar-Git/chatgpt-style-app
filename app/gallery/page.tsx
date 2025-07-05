// here's the education-
// This is a simple gallery page. You can add real images or more features later.

'use client';

export default function GalleryPage() {
  // You can replace these with real image URLs later
  const images = [
    'https://via.placeholder.com/200x150?text=Image+1',
    'https://via.placeholder.com/200x150?text=Image+2',
    'https://via.placeholder.com/200x150?text=Image+3',
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Gallery image ${idx + 1}`}
            className="rounded shadow-md bg-white dark:bg-gray-800"
            width={200}
            height={150}
          />
        ))}
      </div>
    </div>
  );
} 
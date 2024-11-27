import React, { useEffect, useState } from 'react';
import service from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ TITLE, FEATURED_IMAGE, $id }) {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (FEATURED_IMAGE) {
      const previewUrl = service.getFilePreview(FEATURED_IMAGE);
      setImagePreview(previewUrl);
    } else {
      setImagePreview("https://via.placeholder.com/500x300.png?text=No+Image+Available");
    }
  }, [FEATURED_IMAGE]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <div className="w-full h-64 bg-gray-200 flex justify-center items-center">
          <img
            src={imagePreview}
            alt={TITLE}
            className="object-cover w-full h-full rounded-t-xl"
          />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{TITLE}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;

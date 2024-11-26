import React, { useEffect, useState } from 'react';
import service from '../appwrite/config';
import { Link } from 'react-router-dom';

function PostCard({ TITLE, FEATURED_IMAGE, $id }) {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (FEATURED_IMAGE) {
      service.getFilePreview(FEATURED_IMAGE)
        .then((previewUrl) => {
          if (previewUrl && previewUrl.href) {
            setImagePreview(previewUrl.href);
          } else if (previewUrl) {
            setImagePreview(previewUrl);
          } else {
            setImagePreview(null);
          }
        })
        .catch(() => {
          setImagePreview(null);
        });
    }
  }, [FEATURED_IMAGE]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <div className="w-full h-64 bg-gray-200 flex justify-center items-center">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt={TITLE}
              className="object-cover w-full h-full rounded-t-xl"
            />
          ) : (
            <div className="text-center text-gray-400">No Image Available</div>
          )}
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{TITLE}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;

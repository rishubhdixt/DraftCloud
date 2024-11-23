import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({ title, featuredImage, $id }) {
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    // Fetch the file preview URL
    if (featuredImage) {
      service.getFilePreview(featuredImage)
        .then((previewUrl) => {
          if (previewUrl) {
            setImagePreview(previewUrl.href || previewUrl); // assuming previewUrl is an object with href
          } else {
            console.log("Error fetching preview for file:", featuredImage);
          }
        })
        .catch((error) => {
          console.log("Error fetching image preview:", error);
        });
    }
  }, [featuredImage]);

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 ease-in-out">
        <div className="w-full h-64 bg-gray-200 flex justify-center items-center">
          {/* Show image if preview URL is available */}
          {imagePreview ? (
            <img
              src={imagePreview}
              alt={title}
              className="object-cover w-full h-full rounded-t-xl"
            />
          ) : (
            <div className="text-center text-gray-400">No Image Available</div>
          )}
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;

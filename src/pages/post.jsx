import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

export default function Post() {
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.USER_ID === userData.$id : false;

  const placeholderImage = "https://via.placeholder.com/800x400.png?text=No+Image+Available";

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    appwriteService
      .getPost(slug)
      .then((retrievedPost) => {
        if (retrievedPost) {
          setPost(retrievedPost);
          const featuredImage = retrievedPost.FEATURED_IMAGE;
          const previewUrl = featuredImage
            ? appwriteService.getFilePreview(featuredImage)
            : placeholderImage;
          setImageUrl(previewUrl);
        } else {
          navigate("/");
        }
      })
      .catch(() => navigate("/"));
  }, [slug, navigate]);

  const deletePost = () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      appwriteService
        .deletePost(post.$id)
        .then((status) => {
          if (status) {
            if (post.FEATURED_IMAGE) {
              appwriteService.deleteFile(post.FEATURED_IMAGE);
            }
            navigate("/");
          }
        })
        .catch(() => {
          console.error("Error deleting post.");
          alert("Failed to delete the post. Please try again.");
        });
    }
  };

  return post ? (
    <div className="py-12 bg-blue-100 min-h-screen">
      <Container>
        <motion.div
          className="w-full max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden bg-white border"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={post.TITLE}
                className="w-full h-auto object-cover"
              />
            ) : (
              <div className="w-full h-80 bg-gray-300 flex items-center justify-center">
                <p>Loading image...</p>
              </div>
            )}

            {isAuthor && (
              <div className="absolute right-6 top-6 flex space-x-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500">Edit</Button>
                </Link>
                <Button bgColor="bg-red-500" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className="p-6">
            <motion.h1
              className="text-3xl font-bold text-gray-800 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {post.TITLE}
            </motion.h1>
            <motion.div
              className="prose max-w-none text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {post.CONTENT && typeof post.CONTENT === "string"
                ? parse(post.CONTENT)
                : <p>No content available</p>}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </div>
  ) : (
    <div className="text-center py-12">Loading post...</div>
  );
}

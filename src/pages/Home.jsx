import { useEffect, useState } from "react";
import React from 'react';
import { Container, PostCard } from "../components";
import service from "../appwrite/config";
import { useNavigate } from "react-router-dom";  // Importing useNavigate

function Home() {
  const [post, setPost] = useState([]);
  const navigate = useNavigate(); // Initializing useNavigate

  useEffect(() => {
    service.getPosts().then((posts) => {
      if (posts) {
        setPost(posts.documents);
      }
    });
  }, []);

  const handleAddPostClick = () => {
    // Navigate to the login page when the button is clicked
    navigate("/login");  // Replace "/login" with the actual route if it's different
  };

  if (post.length === 0) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex items-center justify-center">
        <Container>
          <div className="text-white text-center p-8 bg-opacity-70 bg-gray-700 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-6">Welcome to Our Blog Platform! 📚✨</h1>
            <h2 className="text-3xl font-semibold mb-4">Discover, Share, and Connect!</h2>
            <p className="text-lg mb-6">Welcome to the ultimate space for readers and writers alike! Our platform is designed to make blogging easier and more enjoyable. Whether you're here to share your thoughts or dive into exciting new reads, you’re in the right place.</p>
            
            <div className="text-left text-lg mb-6">
              <p><strong>What You Can Do:</strong></p>
              <ul className="list-disc ml-6">
                <li><strong>Upload Your Own Blog Posts:</strong> Have a story to tell or knowledge to share? Upload your own blog posts and let the world read your creations! It's quick and easy to write, format, and publish your articles. Simply click on the "Add Post" button, and you're ready to go!</li>
                <li><strong>Read Blogs from Other Writers:</strong> Not feeling like writing? No problem! Explore a wide variety of blog posts shared by fellow creators. Whether you're looking for lifestyle tips, tech trends, or personal stories, there's something for everyone.</li>
              </ul>
            </div>

            <div className="text-left text-lg mb-6">
              <p><strong>How to Use the Page:</strong></p>
              <ul className="list-disc ml-6">
                <li><strong>Browse Posts:</strong> Scroll through a curated list of blog articles shared by others. Click on any post to read it in full, enjoy the content, and even leave your comments!</li>
                <li><strong>Create a Post:</strong> Want to contribute? Head to the "Add Post" page, write your blog, and hit submit to share your insights with the community.</li>
                <li><strong>Stay Connected:</strong> Login to your account to manage your posts, edit them, or even delete if you wish. It's all in your hands!</li>
              </ul>
            </div>

            <p className="text-lg">Ready to Dive In? 🚀</p>
            <p className="text-md mb-6">Start exploring, share your stories, and be part of a vibrant community of bloggers and readers. Whether you're new to blogging or an experienced writer, we're excited to have you here.</p>

            <div className="mt-6">
              <button
                className="bg-blue-600 text-white py-2 px-6 rounded-lg transition duration-200 hover:bg-blue-700"
                onClick={handleAddPostClick} // Added click handler
              >
                Add Your First Blog
              </button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black py-16">
      <Container>
        <div className="flex flex-wrap justify-center gap-6">
          {post.map((post) => (
            <div key={post.$id} className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
);

}

export default Home;

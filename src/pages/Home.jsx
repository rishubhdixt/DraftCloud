import { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import service from "../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux"; 
function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.status); 

  useEffect(() => {
    if (isLoggedIn) {
      service.getPosts().then((data) => {
        if (data) {
          setPosts(data.documents);
        }
      });
    }
  }, [isLoggedIn]);

  const handleAddPostClick = () => {
    navigate("/login");
  };

  if (!isLoggedIn) {
    return (
      <div className="w-full min-h-screen bg-gradient-to-r from-gray-800 via-gray-900 to-black flex items-center justify-center">
        <Container>
          <div className="text-white text-center p-8 bg-opacity-70 bg-gray-700 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold mb-6">Welcome to Our Blog Platform! 📚✨</h1>
            <h2 className="text-3xl font-semibold mb-4">Discover, Share, and Connect!</h2>
            <p className="text-lg mb-6">
              Welcome to the ultimate space for readers and writers alike! Our platform is designed to make blogging easier and more enjoyable. Whether you're here to share your thoughts or dive into exciting new reads, you’re in the right place.
            </p>

            <div className="text-left text-lg mb-6">
              <p><strong>What You Can Do:</strong></p>
              <ul className="list-disc ml-6">
                <li><strong>Upload Your Own Blog Posts:</strong> Have a story to tell or knowledge to share? Upload your own blog posts and let the world read your creations!</li>
                <li><strong>Read Blogs from Other Writers:</strong> Explore a wide variety of blog posts shared by fellow creators.</li>
              </ul>
            </div>

            <div className="text-left text-lg mb-6">
              <p><strong>How to Use the Page:</strong></p>
              <ul className="list-disc ml-6">
                <li><strong>Browse Posts:</strong> Scroll through a curated list of blog articles shared by others.</li>
                <li><strong>Create a Post:</strong> Want to contribute? Write your blog, and hit submit to share your insights with the community.</li>
                <li><strong>Stay Connected:</strong> Login to manage your posts.</li>
              </ul>
            </div>

            <p className="text-lg">Ready to Dive In? 🚀</p>
            <p className="text-md mb-6">Start exploring, share your stories, and be part of a vibrant community of bloggers and readers.</p>

            <div className="mt-6">
              <button
                className="bg-blue-600 text-white py-2 px-6 rounded-lg transition duration-200 hover:bg-blue-700"
                onClick={handleAddPostClick}
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
          {posts.map((post) => (
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

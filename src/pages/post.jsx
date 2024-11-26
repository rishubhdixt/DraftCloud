import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);
    const isAuthor = post && userData ? post.USER_ID === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((retrievedPost) => {
                if (retrievedPost) {
                    setPost(retrievedPost);
                    if (retrievedPost.FEATURED_IMAGE) {
                        appwriteService
                            .getFilePreview(retrievedPost.FEATURED_IMAGE)
                            .then((url) => {
                                setImageUrl(url || "https://via.placeholder.com/800x400.png?text=No+Image+Available");
                            })
                            .catch(() => {
                                setImageUrl("https://via.placeholder.com/800x400.png?text=No+Image+Available");
                            });
                    } else {
                        setImageUrl("https://via.placeholder.com/800x400.png?text=No+Image+Available");
                    }
                } else {
                    navigate("/");
                }
            }).catch(() => navigate("/"));
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            appwriteService.deletePost(post.$id).then((status) => {
                if (status) {
                    appwriteService.deleteFile(post.FEATURED_IMAGE);
                    navigate("/");
                }
            }).catch(() => {
                console.error("Error deleting post.");
            });
        }
    };

    return post ? (
        <div className="py-12 bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">
            <Container>
                <div className="w-full max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden bg-white border">
                    <div className="relative">
                        {imageUrl ? (
                            <img src={imageUrl} alt={post.TITLE} className="w-full h-80 object-cover" />
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
                                <Button bgColor="bg-red-500" onClick={deletePost}>Delete</Button>
                            </div>
                        )}
                    </div>
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.TITLE}</h1>
                        <div className="prose max-w-none text-gray-700">
                            {post.CONTENT && typeof post.CONTENT === "string" ? parse(post.CONTENT) : <p>No content available</p>}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}

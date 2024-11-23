import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-12 bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">
            <Container>
                <div className="w-full max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden bg-white border">
                    <div className="relative">
                        <img
                            src={appwriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="w-full h-80 object-cover"
                        />

                        {isAuthor && (
                            <div className="absolute right-6 top-6 flex space-x-3">
                                <Link to={`/edit-post/${post.$id}`}>
                                    <Button bgColor="bg-green-500">
                                        Edit
                                    </Button>
                                </Link>
                                <Button bgColor="bg-red-500" onClick={deletePost}>
                                    Delete
                                </Button>
                            </div>
                        )}
                    </div>
                    <div className="p-6">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">
                            {post.title}
                        </h1>
                        <div className="prose max-w-none text-gray-700">
                            {post.content && typeof post.content === "string" ? (
                                parse(post.content)
                            ) : (
                                <p>No content available</p>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    ) : null;
}

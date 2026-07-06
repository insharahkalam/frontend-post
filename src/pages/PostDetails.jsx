import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../config/axios";

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPost = async () => {
            try {
                const res = await api.get(`/posts/getOnePost/${id}`);
                setPost(res.data.post);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getPost();
    }, [id]);

    if (loading) return <h1>Loading...</h1>;

    if (!post) return <h1>Post not found</h1>;

    return (
        <div>
            <img src={post.image} alt={post.title} width="400" />

            <h1>{post.title}</h1>

            <p>{post.category}</p>

            <p>{post.content}</p>
            
            <p>{post.shortDescription}</p>

            <div>
                <img
                    src={post.userId?.image}
                    alt={post.userId?.username}
                    width="40"
                />
                <span>{post.userId?.username}</span>
            </div>
        </div>
    );
}

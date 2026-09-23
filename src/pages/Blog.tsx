import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState, AppDispatch } from "../store/store"
import type { Post } from "../types/post";
import { setPosts, addPostLocal, removePostLocal } from "../store/reducers/posts";
import "./Blog.css";

interface PostsResponse{
    posts: Post[];
}

function Blog(){
    const dispatch = useDispatch<AppDispatch>();
    const posts =  useSelector((state: RootState)=> state.posts.posts);

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(()=> {
        if (posts.length > 0) return;

        (async () => {
            try {
                const response = await axios.get<PostsResponse>("https://dummyjson.com/posts");
                dispatch(setPosts(response.data.posts));
            } catch (e) {
                console.error(e);
            }
        })();
    }, [dispatch, posts.length]);

    const handleAddPost = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !body.trim()) return;

        try {
            await axios.post("https://dummyjson.com/posts/add", {
                title,
                body,
                userId: 1,
            });

            const newPost: Post = {
                id: Date.now(),
                title,
                body,
                tags: [],
                reactions: { likes: 0, dislikes: 0 },
                views: 0,
                userId: 1,
            };
            dispatch(addPostLocal(newPost));
            setTitle("");
            setBody("");
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeletePost = async (id: number) => {
        try {
            await axios.delete(`https://dummyjson.com/posts/${id}`);
            dispatch(removePostLocal(id));
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="blog">
            <h1 className="blog-title">Blog</h1>

            <form className="blog-form" onSubmit={handleAddPost}>
                <h2>Publier un article</h2>
                <input
                    type="text"
                    placeholder="Titre"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    placeholder="Contenu"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <button type="submit">Publier</button>
            </form>

            <div className="blog-list">
                {posts.map((post)=>(
                    <article className="blog-card" key={post.id}>
                        <h2 className="blog-card-title">
                            <Link to={`/posts/${post.id}`}>{post.title}</Link>
                        </h2>

                        {post.tags.length > 0 && (
                            <div className="blog-tags">
                                {post.tags.map((tag) => (
                                    <span className="blog-tag" key={tag}>#{tag}</span>
                                ))}
                            </div>
                        )}

                        <div className="blog-card-footer">
                            <div className="blog-stats">
                                <span>👍 {post.reactions.likes}</span>
                                <span>👎 {post.reactions.dislikes}</span>
                                <span>👁 {post.views} vues</span>
                            </div>
                            <button className="blog-delete" onClick={() => handleDeletePost(post.id)}>
                                Supprimer
                            </button>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    );
}

export default Blog;

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState, AppDispatch } from "../store/store"
import type { Post } from "../types/post";
import { setPosts, addPostLocal, removePostLocal } from "../store/reducers/posts";

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
        <>
            <h1>Blog</h1>

            <form onSubmit={handleAddPost}>
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

            {posts.map((post)=>(
                <div key={post.id}>
                    <h2><Link to ={`/posts/${post.id}`}>{post.title}</Link></h2>
                    <p>Tags: {post.tags.join(", ")}</p>
                    <p>Réactions : {post.reactions.likes} 👍 / {post.reactions.dislikes} 👎</p>
                    <p> Vues : {post.views}</p>
                    <button onClick={() => handleDeletePost(post.id)}>Supprimer</button>
                </div>
            ))}
            </>
    );
}

export default Blog;

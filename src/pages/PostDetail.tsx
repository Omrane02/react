import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import type { RootState, AppDispatch } from "../store/store";
import type { Comment } from "../types/comment";
import { setComments, addCommentLocal, removeCommentLocal } from "../store/reducers/comments";

interface CommentsResponse {
    comments: Comment[];
}

function PostDetail() {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const post = useSelector((state: RootState) =>
        state.posts.posts.find((p) => p.id === Number(id))
    );
    const comments = useSelector((state: RootState) =>
        state.comments.comments.filter((c) => c.postId === Number(id))
    );

    const [body, setBody] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get<CommentsResponse>(
                    `https://dummyjson.com/posts/${id}/comments`
                );
                dispatch(setComments(response.data.comments));
            } catch (e) {
                console.error(e);
            }
        })();
    }, [dispatch, id]);

    const handleAddComment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!body.trim()) return;

        try {
            await axios.post("https://dummyjson.com/comments/add", {
                body,
                postId: Number(id),
                userId: 1,
            });

            const newComment: Comment = {
                id: Date.now(),
                body,
                postId: Number(id),
                likes: 0,
                user: { id: 1, username: "moi", fullName: "Moi" },
            };
            dispatch(addCommentLocal(newComment));
            setBody("");
        } catch (e) {
            console.error(e);
        }
    };

    const handleDeleteComment = async (commentId: number) => {
        try {
            await axios.delete(`https://dummyjson.com/comments/${commentId}`);
            dispatch(removeCommentLocal(commentId));
        } catch (e) {
            console.error(e);
        }
    };

    if (!post) {
        return <p>Post introuvable. Retournez sur la page Blog.</p>;
    }

    return (
        <>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <p>Tags : {post.tags.join(", ")}</p>
            <p>Réactions : {post.reactions.likes} 👍 / {post.reactions.dislikes} 👎</p>
            <p>Vues : {post.views}</p>

            <h2>Commentaires</h2>

            <form onSubmit={handleAddComment}>
                <input
                    type="text"
                    placeholder="Votre commentaire"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
                <button type="submit">Ajouter</button>
            </form>

            {comments.map((comment) => (
                <div key={comment.id}>
                    <p><strong>{comment.user.username}</strong> : {comment.body}</p>
                    <button onClick={() => handleDeleteComment(comment.id)}>Supprimer</button>
                </div>
            ))}
        </>
    );
}

export default PostDetail;

import { useState } from 'react';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';

export default function LikeButton({ postId, initialCount }) {
  const { user } = useAuth();
  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [loading, setLoading] = useState(false);

  const handleLike = async () => {
    if (!user) {
      alert('Beğenmek için giriş yapmalısınız.');
      return;
    }
    if (loading) return;

    setLoading(true);
    try {
      if (liked) {
        await api.delete(`/posts/${postId}/like`);
        setCount((prev) => Math.max(0, prev - 1));
        setLiked(false);
      } else {
        await api.post(`/posts/${postId}/like`);
        setCount((prev) => prev + 1);
        setLiked(true);
      }
    } catch (err) {
      if (err.response?.status === 400) {
        setLiked(!liked);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`like-btn ${liked ? 'liked' : ''}`}
      onClick={handleLike}
      disabled={loading}
    >
      <span className="like-icon">{liked ? '❤️' : '🤍'}</span>
      <span className="like-count">{count}</span>
    </button>
  );
}

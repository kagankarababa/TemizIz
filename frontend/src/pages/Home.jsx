import { useState, useEffect } from 'react';
import api from '../api/axios';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get('/pollution-reports');
        setPosts(res.data);
      } catch (err) {
        console.error('Gönderiler yüklenemedi:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="page home-page">
      <div className="home-header">
        <h1 className="home-title">🌍 Keşfet</h1>
        <p className="home-subtitle">Doğayı koru, izini temiz bırak</p>
      </div>

      {posts.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🌱</span>
          <h2>Henüz gönderi yok</h2>
          <p>İlk temizlik gönderisini sen paylaş!</p>
        </div>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}

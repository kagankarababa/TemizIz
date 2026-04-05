import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function UserProfile() {
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, postsRes] = await Promise.all([
          api.get(`/users/${id}`),
          api.get(`/users/${id}/posts`)
        ]);
        setUserInfo(userRes.data);
        setPosts(postsRes.data);
      } catch (err) {
        console.error('Kullanıcı profili yüklenemedi:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!userInfo) return <div className="page"><div className="empty-state"><h2>Kullanıcı bulunamadı</h2></div></div>;

  return (
    <div className="page profile-page-full">
      <div className="profile-card">
        <div className="profile-avatar-large">
          {userInfo.fullName?.charAt(0)}
        </div>
        <div className="profile-info">
          <h2>{userInfo.fullName}</h2>
          <div className="profile-stats">
            <div className="stat-item">
              <span className="stat-value">{userInfo.totalLikes || 0}</span>
              <span className="stat-label">Toplam Beğeni</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{posts.length}</span>
              <span className="stat-label">Gönderi</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-posts-section">
        <h2 className="profile-posts-title">📸 Paylaşımlar ({posts.length})</h2>
        {posts.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🌱</span>
            <h2>Henüz paylaşım yok</h2>
          </div>
        ) : (
          <div className="post-grid">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

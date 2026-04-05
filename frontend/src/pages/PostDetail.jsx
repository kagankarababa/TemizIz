import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api, { BACKEND_URL } from '../api/axios';
import LikeButton from '../components/LikeButton';
import CommentSection from '../components/CommentSection';
import LoadingSpinner from '../components/LoadingSpinner';

function getImageSrc(url) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${BACKEND_URL}${url}`;
}

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api.get('/pollution-reports');
        const found = res.data.find((p) => p._id === id);
        setPost(found || null);
      } catch (err) {
        console.error('Gönderi yüklenemedi:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!post) return <div className="page"><div className="empty-state"><h2>Gönderi bulunamadı</h2></div></div>;

  const hasCleanReport = post.cleanReport && post.cleanReport.imageUrl;
  const userId = post.userId?._id || post.userId;

  return (
    <div className="page post-detail-page">
      <div className="post-detail-card">
        <div className="post-header">
          <Link to={`/user/${userId}`} className="post-author post-author-link">
            <div className="post-avatar">{post.userId?.fullName?.charAt(0) || '?'}</div>
            <div className="post-author-info">
              <span className="post-author-name">{post.userId?.fullName || 'Anonim'}</span>
              <span className="post-date">{new Date(post.createdAt).toLocaleDateString('tr-TR')}</span>
            </div>
          </Link>
          <span className={`post-status ${post.status === 'Temizlendi' ? 'status-clean' : 'status-waiting'}`}>
            {post.status === 'Temizlendi' ? '✅ Temizlendi' : '⏳ Bekliyor'}
          </span>
        </div>

        <div className="post-detail-image-container">
          <img
            src={showAfter && hasCleanReport ? getImageSrc(post.cleanReport.imageUrl) : getImageSrc(post.imageUrl)}
            alt={showAfter ? 'Temizlenmiş alan' : 'Kirli alan'}
            className="post-detail-image"
          />
          <div className="post-image-label-detail">
            {showAfter && hasCleanReport ? '✨ Sonra' : '📸 Önce'}
          </div>

          {hasCleanReport && (
            <div className="post-image-toggle">
              <button className={`toggle-btn ${!showAfter ? 'active' : ''}`} onClick={() => setShowAfter(false)}>Önce</button>
              <button className={`toggle-btn ${showAfter ? 'active' : ''}`} onClick={() => setShowAfter(true)}>Sonra</button>
            </div>
          )}
        </div>

        {post.locationName && <div className="post-location-detail">📍 {post.locationName}</div>}
        {post.description && <p className="post-description-detail">{post.description}</p>}

        <div className="post-detail-actions">
          <LikeButton postId={post._id} initialCount={post.likeCount || 0} />
        </div>

        <CommentSection postId={post._id} />
      </div>
    </div>
  );
}

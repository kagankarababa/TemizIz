import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../api/axios';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import LikeButton from './LikeButton';

function getImageSrc(url) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${BACKEND_URL}${url}`;
}

export default function PostCard({ post, showActions, onDelete }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showAfter, setShowAfter] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editDesc, setEditDesc] = useState(post.description || '');
  const [editLocation, setEditLocation] = useState(post.locationName || '');
  const [saving, setSaving] = useState(false);

  const hasCleanReport = post.cleanReport && post.cleanReport.imageUrl;
  const userId = post.userId?._id || post.userId;
  const isOwner = user && userId === user._id;

  const handleDeletePost = async () => {
    if (!window.confirm('Bu gönderiyi silmek istediğinize emin misiniz?')) return;
    try {
      await api.delete(`/pollution-reports/${post._id}`);
      if (onDelete) onDelete(post._id);
    } catch (err) {
      alert('Gönderi silinemedi.');
    }
  };

  const handleEditSave = async () => {
    setSaving(true);
    try {
      await api.put(`/pollution-reports/${post._id}`, {
        description: editDesc,
        locationName: editLocation
      });
      post.description = editDesc;
      post.locationName = editLocation;
      setEditing(false);
    } catch (err) {
      alert('Güncelleme başarısız.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <Link to={`/user/${userId}`} className="post-author post-author-link">
          <div className="post-avatar">
            {post.userId?.profilePhoto || post.userId?.fullName?.charAt(0) || '?'}
          </div>
          <div className="post-author-info">
            <span className="post-author-name">{post.userId?.fullName || 'Anonim'}</span>
            <span className="post-date">
              {new Date(post.createdAt).toLocaleDateString('tr-TR')}
            </span>
          </div>
        </Link>
        <div className="post-header-right">
          <span className={`post-status ${post.status === 'Temizlendi' ? 'status-clean' : 'status-waiting'}`}>
            {post.status === 'Temizlendi' ? '✅ Temizlendi' : '⏳ Bekliyor'}
          </span>
          {isOwner && (
            <div className="post-owner-actions">
              <button onClick={() => setEditing(!editing)} className="post-edit-btn" title="Düzenle">✏️</button>
              <button onClick={handleDeletePost} className="post-delete-btn" title="Sil">🗑️</button>
            </div>
          )}
        </div>
      </div>

      {editing && (
        <div className="post-edit-form">
          <div className="form-group">
            <input
              type="text"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
              placeholder="Açıklama..."
              className="post-edit-input"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              value={editLocation}
              onChange={(e) => setEditLocation(e.target.value)}
              placeholder="Konum adı..."
              className="post-edit-input"
            />
          </div>
          <div className="post-edit-btns">
            <button onClick={handleEditSave} className="btn-primary" disabled={saving}>
              {saving ? '...' : 'Kaydet'}
            </button>
            <button onClick={() => setEditing(false)} className="btn-secondary">İptal</button>
          </div>
        </div>
      )}

      <div className="post-image-container">
        <div className="post-image-slider">
          <img
            src={showAfter && hasCleanReport ? getImageSrc(post.cleanReport.imageUrl) : getImageSrc(post.imageUrl)}
            alt={showAfter ? 'Temizlenmiş alan' : 'Kirli alan'}
            className="post-image"
          />
          <div className="post-image-label">
            {showAfter && hasCleanReport ? '✨ Sonra' : '📸 Önce'}
          </div>
        </div>

        {hasCleanReport && (
          <div className="post-image-toggle">
            <button className={`toggle-btn ${!showAfter ? 'active' : ''}`} onClick={() => setShowAfter(false)}>Önce</button>
            <button className={`toggle-btn ${showAfter ? 'active' : ''}`} onClick={() => setShowAfter(true)}>Sonra</button>
          </div>
        )}
      </div>

      {post.locationName && <div className="post-location">📍 {post.locationName}</div>}
      {post.description && <p className="post-description">{post.description}</p>}

      <div className="post-actions">
        <LikeButton postId={post._id} initialCount={post.likeCount || 0} />
        <Link to={`/post/${post._id}`} className="post-comment-btn">💬 Yorumlar</Link>
      </div>
    </div>
  );
}

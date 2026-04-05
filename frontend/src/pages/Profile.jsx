import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axios';
import PostCard from '../components/PostCard';
import LoadingSpinner from '../components/LoadingSpinner';

const AVATARS = [
  '🌱', '🌿', '🍀', '🌲', '🌳', '🌴',
  '🌊', '🏔️', '🦋', '🐝', '🐢', '🌻',
  '🌍', '♻️', '🌈', '🦜'
];

export default function Profile() {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editing, setEditing] = useState(false);
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [form, setForm] = useState({ fullName: '', email: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    const fetchData = async () => {
      try {
        const [profileRes, postsRes] = await Promise.all([
          api.get('/profile'),
          api.get(`/users/${user._id}/posts`)
        ]);
        setProfile(profileRes.data);
        setPosts(postsRes.data);
        setForm({ fullName: profileRes.data.fullName, email: profileRes.data.email });
      } catch (err) {
        console.error('Profil yüklenemedi:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user, navigate]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.put('/profile', form);
      setProfile(res.data);
      updateUser(res.data);
      setEditing(false);
    } catch (err) {
      alert(err.response?.data?.message || 'Güncelleme başarısız.');
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarSelect = async (avatar) => {
    try {
      const res = await api.put('/profile', { profilePhoto: avatar });
      setProfile(res.data);
      updateUser(res.data);
      setShowAvatarPicker(false);
    } catch (err) {
      alert('Avatar güncellenemedi.');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Hesabınızı kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) return;
    try {
      await api.delete('/profile');
      logout();
      navigate('/login');
    } catch (err) {
      alert('Hesap silinemedi.');
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!profile) return <div className="page"><p>Profil bulunamadı.</p></div>;

  return (
    <div className="page profile-page-full">
      <div className="profile-card">
        <div
          className="profile-avatar-large profile-avatar-clickable"
          onClick={() => setShowAvatarPicker(!showAvatarPicker)}
          title="Avatar değiştir"
        >
          {profile.profilePhoto || profile.fullName?.charAt(0)}
        </div>

        {showAvatarPicker && (
          <div className="avatar-picker">
            <p className="avatar-picker-title">Avatarını Seç</p>
            <div className="avatar-grid">
              {AVATARS.map((avatar) => (
                <button
                  key={avatar}
                  className={`avatar-option ${profile.profilePhoto === avatar ? 'selected' : ''}`}
                  onClick={() => handleAvatarSelect(avatar)}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>
        )}

        {editing ? (
          <div className="profile-edit-form">
            <div className="form-group">
              <label>Ad Soyad</label>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>E-posta</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="profile-edit-actions">
              <button onClick={handleSave} className="btn-primary" disabled={saving}>
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
              <button onClick={() => setEditing(false)} className="btn-secondary">İptal</button>
            </div>
          </div>
        ) : (
          <div className="profile-info">
            <h2>{profile.fullName}</h2>
            <p className="profile-email">{profile.email}</p>
            <div className="profile-stats">
              <div className="stat-item">
                <span className="stat-value">{profile.totalLikes || 0}</span>
                <span className="stat-label">Toplam Beğeni</span>
              </div>
            </div>
            <button onClick={() => setEditing(true)} className="btn-primary">Profili Düzenle</button>
          </div>
        )}

        <button onClick={handleDelete} className="btn-danger">Hesabı Sil</button>
      </div>

      <div className="profile-posts-section">
        <h2 className="profile-posts-title">📸 Paylaşımlarım ({posts.length})</h2>
        {posts.length === 0 ? (
          <div className="empty-state">
            <span className="empty-icon">🌱</span>
            <h2>Henüz paylaşımın yok</h2>
            <p>İlk temizlik gönderisini paylaş!</p>
          </div>
        ) : (
          <div className="post-grid">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} showActions onDelete={(id) => setPosts(posts.filter(p => p._id !== id))} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

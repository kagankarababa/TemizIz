import { useState, useEffect } from 'react';
import api from '../api/axios';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await api.get('/leaderboard');
        setUsers(res.data);
      } catch (err) {
        console.error('Liderlik tablosu yüklenemedi:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <LoadingSpinner />;

  const getMedal = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
  };

  return (
    <div className="page leaderboard-page">
      <div className="leaderboard-header">
        <h1>🏆 Liderlik Tablosu</h1>
        <p>En çok beğeni toplayan doğa dostları</p>
      </div>

      {users.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">🏆</span>
          <h2>Henüz sıralama yok</h2>
          <p>Gönderi paylaşarak liderlik tablosunda yerini al!</p>
        </div>
      ) : (
        <div className="leaderboard-list">
          {users.map((user, index) => (
            <div key={user._id} className={`leaderboard-item ${index < 3 ? 'top-three' : ''}`}>
              <span className="leaderboard-rank">{getMedal(index)}</span>
              <div className="leaderboard-avatar">{user.fullName?.charAt(0)}</div>
              <div className="leaderboard-info">
                <span className="leaderboard-name">{user.fullName}</span>
              </div>
              <div className="leaderboard-score">
                <span className="leaderboard-likes">❤️ {user.totalLikes || 0}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

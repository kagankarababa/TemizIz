import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../hooks/useAuth';

export default function CommentSection({ postId }) {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [text, setText] = useState('');
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const res = await api.get(`/comments/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.error('Yorumlar yüklenemedi:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim() || submitting) return;

    setSubmitting(true);
    try {
      const res = await api.post('/comments', { postId, text: text.trim() });
      setComments([res.data, ...comments]);
      setText('');
    } catch (err) {
      alert('Yorum eklenemedi.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (parentId) => {
    if (!replyText.trim() || submitting) return;

    setSubmitting(true);
    try {
      const res = await api.post('/comments', {
        postId,
        text: replyText.trim(),
        parentId
      });
      setComments([res.data, ...comments]);
      setReplyTo(null);
      setReplyText('');
    } catch (err) {
      alert('Yanıt eklenemedi.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId) => {
    if (!window.confirm('Bu yorumu silmek istediğinize emin misiniz?')) return;
    try {
      await api.delete(`/comments/${commentId}`);
      setComments(comments.filter((c) => c._id !== commentId && c.parentId !== commentId));
    } catch (err) {
      alert('Yorum silinemedi.');
    }
  };

  const handleLikeComment = async (commentId) => {
    try {
      const res = await api.post(`/comments/${commentId}/like`);
      setComments(comments.map((c) =>
        c._id === commentId
          ? { ...c, likeCount: res.data.likeCount, liked: true }
          : c
      ));
    } catch (err) {
      if (err.response?.status === 400) {
        // Zaten beğenilmiş — unlike yap
        try {
          const res = await api.delete(`/comments/${commentId}/like`);
          setComments(comments.map((c) =>
            c._id === commentId
              ? { ...c, likeCount: res.data.likeCount, liked: false }
              : c
          ));
        } catch {}
      }
    }
  };

  // Yorumları parent/reply olarak ayır
  const parentComments = comments.filter((c) => !c.parentId);
  const getReplies = (parentId) => comments.filter((c) => c.parentId === parentId);

  return (
    <div className="comment-section">
      <h3 className="comment-title">💬 Yorumlar ({comments.length})</h3>

      {user && (
        <form onSubmit={handleSubmit} className="comment-form">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Bir yorum yazın..."
            className="comment-input"
            maxLength={300}
          />
          <button type="submit" className="comment-submit-btn" disabled={submitting || !text.trim()}>
            {submitting ? '...' : 'Gönder'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="loading-spinner">Yükleniyor...</div>
      ) : comments.length === 0 ? (
        <p className="comment-empty">Henüz yorum yok. İlk yorumu sen yap! 🌱</p>
      ) : (
        <div className="comment-list">
          {parentComments.map((comment) => (
            <div key={comment._id} className="comment-item">
              <div className="comment-header">
                <div className="comment-avatar">
                  {comment.userId?.fullName?.charAt(0) || '?'}
                </div>
                <div className="comment-info">
                  <span className="comment-author">{comment.userId?.fullName || 'Anonim'}</span>
                  <span className="comment-date">
                    {new Date(comment.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                {user && comment.userId?._id === user._id && (
                  <button onClick={() => handleDelete(comment._id)} className="comment-delete-btn">
                    ✕
                  </button>
                )}
              </div>
              <p className="comment-text">{comment.text}</p>

              <div className="comment-actions-row">
                {user && (
                  <>
                    <button
                      className={`comment-like-btn ${comment.liked ? 'liked' : ''}`}
                      onClick={() => handleLikeComment(comment._id)}
                    >
                      ❤️ {comment.likeCount || 0}
                    </button>
                    <button
                      className="comment-reply-btn"
                      onClick={() => setReplyTo(replyTo === comment._id ? null : comment._id)}
                    >
                      ↩️ Yanıtla
                    </button>
                  </>
                )}
              </div>

              {/* Yanıt formu */}
              {replyTo === comment._id && user && (
                <div className="reply-form">
                  <input
                    type="text"
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={`@${comment.userId?.fullName || 'Anonim'} yanıtla...`}
                    className="comment-input reply-input"
                    maxLength={300}
                  />
                  <button
                    onClick={() => handleReply(comment._id)}
                    className="comment-submit-btn"
                    disabled={submitting || !replyText.trim()}
                  >
                    Gönder
                  </button>
                </div>
              )}

              {/* Yanıtlar */}
              {getReplies(comment._id).map((reply) => (
                <div key={reply._id} className="comment-item comment-reply">
                  <div className="comment-header">
                    <div className="comment-avatar comment-avatar-small">
                      {reply.userId?.fullName?.charAt(0) || '?'}
                    </div>
                    <div className="comment-info">
                      <span className="comment-author">{reply.userId?.fullName || 'Anonim'}</span>
                      <span className="comment-date">
                        {new Date(reply.createdAt).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                    {user && reply.userId?._id === user._id && (
                      <button onClick={() => handleDelete(reply._id)} className="comment-delete-btn">
                        ✕
                      </button>
                    )}
                  </div>
                  <p className="comment-text">{reply.text}</p>
                  {user && (
                    <div className="comment-actions-row">
                      <button
                        className={`comment-like-btn ${reply.liked ? 'liked' : ''}`}
                        onClick={() => handleLikeComment(reply._id)}
                      >
                        ❤️ {reply.likeCount || 0}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

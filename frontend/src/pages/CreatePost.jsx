import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import api from '../api/axios';

export default function CreatePost() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [beforeImage, setBeforeImage] = useState(null);
  const [afterImage, setAfterImage] = useState(null);
  const [beforePreview, setBeforePreview] = useState(null);
  const [afterPreview, setAfterPreview] = useState(null);
  const [description, setDescription] = useState('');
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!user) { navigate('/login'); return null; }

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (type === 'before') {
      setBeforeImage(file);
      setBeforePreview(URL.createObjectURL(file));
    } else {
      setAfterImage(file);
      setAfterPreview(URL.createObjectURL(file));
    }
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!beforeImage) {
      setError('Lütfen "Önce" fotoğrafı seçiniz.');
      return;
    }

    setLoading(true);
    try {
      // 1) Before fotoğrafını yükle (pollution-report)
      const formData = new FormData();
      formData.append('image', beforeImage);
      formData.append('description', description);
      formData.append('locationName', locationName);

      const pollutionRes = await api.post('/pollution-reports', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      // 2) After fotoğrafı varsa yükle (clean-report)
      if (afterImage) {
        const cleanFormData = new FormData();
        cleanFormData.append('image', afterImage);
        cleanFormData.append('pollutionReportId', pollutionRes.data._id);

        await api.post('/clean-reports', cleanFormData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Gönderi oluşturulamadı.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page create-page">
      <div className="create-card">
        <div className="create-header">
          <h1>📸 Yeni Gönderi</h1>
          <p>Temizlediğin alanı paylaş</p>
        </div>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="create-form">
          <div className="form-group">
            <label>📷 Önce Fotoğrafı *</label>
            <div className="file-upload-area" onClick={() => document.getElementById('beforeFile').click()}>
              {beforePreview ? (
                <img src={beforePreview} alt="Önce" className="upload-preview" />
              ) : (
                <div className="upload-placeholder">
                  <span className="upload-icon">📷</span>
                  <span>Kirli alanın fotoğrafını seçin</span>
                </div>
              )}
              <input
                id="beforeFile"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'before')}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label>✨ Sonra Fotoğrafı</label>
            <div className="file-upload-area" onClick={() => document.getElementById('afterFile').click()}>
              {afterPreview ? (
                <img src={afterPreview} alt="Sonra" className="upload-preview" />
              ) : (
                <div className="upload-placeholder">
                  <span className="upload-icon">✨</span>
                  <span>Temizlenmiş alanın fotoğrafını seçin</span>
                </div>
              )}
              <input
                id="afterFile"
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'after')}
                style={{ display: 'none' }}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="description">📝 Açıklama</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Bu alanı nasıl temizlediğinizi anlatın..."
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="locationName">📍 Konum Adı</label>
            <input
              id="locationName"
              type="text"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              placeholder="Ör: Konyaaltı Plajı, Antalya"
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? 'Paylaşılıyor...' : '🌿 Paylaş'}
          </button>
        </form>
      </div>
    </div>
  );
}

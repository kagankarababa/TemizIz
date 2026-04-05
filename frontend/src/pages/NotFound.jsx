import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="page not-found-page">
      <div className="not-found-content">
        <span className="not-found-icon">🍃</span>
        <h1>404</h1>
        <p>Aradığın sayfa bulunamadı</p>
        <Link to="/" className="btn-primary">Ana Sayfaya Dön</Link>
      </div>
    </div>
  );
}

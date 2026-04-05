import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">🌿</span>
          <span className="brand-text">Temiz<span className="brand-accent">İz</span></span>
        </Link>

        <div className="navbar-links">
          <Link to="/" className="nav-link">Keşfet</Link>
          <Link to="/leaderboard" className="nav-link">Liderlik</Link>

          {user ? (
            <>
              <Link to="/create" className="nav-link nav-create-btn">
                + Paylaş
              </Link>
              <Link to="/profile" className="nav-link nav-profile">
                {user.fullName?.split(' ')[0]}
              </Link>
              <button onClick={handleLogout} className="nav-link nav-logout-btn">
                Çıkış
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Giriş</Link>
              <Link to="/register" className="nav-link nav-register-btn">Kayıt Ol</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

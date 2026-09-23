import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
import { logout } from '../store/reducers/auth';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/connexion');
  };

  return (
    <header style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      borderBottom: '1px solid #e0e0e0',
      backgroundColor: '#fff'
    }}>
      <div className="logo">
        <Link to="/" style={{ textDecoration: 'none', fontWeight: 'bold', fontSize: '1.2rem', color: '#000' }}>
           Gourmandise & Partage
        </Link>
      </div>

      <nav>
        <ul style={{ display: 'flex', gap: '1.5rem', listStyle: 'none', margin: 0, padding: 0, alignItems: 'center' }}>
          <li>
            <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>Accueil</Link>
          </li>
          <li>
            <Link to="/users" style={{ textDecoration: 'none', color: '#333' }}>Membres</Link>
          </li>
          <li>
            <Link to="/posts" style={{ textDecoration: 'none', color: '#333' }}>Blog</Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link to="/favoris" style={{ textDecoration: 'none', color: '#333' }}>Mes Favoris</Link>
              </li>
              <li>
                <Link to="/profile" style={{ textDecoration: 'none', fontWeight: '600', color: '#d4af37' }}>
                  {user ? `${user.firstName}` : 'Mon Profil'}
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: '0.4rem 0.8rem',
                    backgroundColor: 'transparent',
                    border: '1px solid #dc3545',
                    color: '#dc3545',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Déconnexion
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link
                to="/connexion"
                style={{
                  padding: '0.4rem 0.8rem',
                  backgroundColor: '#d4af37',
                  color: '#fff',
                  borderRadius: '4px',
                  textDecoration: 'none'
                }}
              >
                Connexion
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import type { RootState } from "../store/store"
import { logout } from "../store/reducers/auth"

function Profil() {
  const user = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/connexion")
  }

  if (!user) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Aucun utilisateur connecté.</p>
  }

  return (
    <div className="profile-card" style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <img src={user.image} alt={user.username} width={128} style={{ borderRadius: "50%" }} />
      <h1>{user.firstName} {user.lastName}</h1>
      <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
      <p><strong>Email :</strong> {user.email}</p>
      {user.phone && <p><strong>Téléphone :</strong> {user.phone}</p>}
      {user.role && <p><strong>Rôle :</strong> {user.role}</p>}

      {user.company && (
        <>
          <h2>Entreprise</h2>
          <p><strong>Nom :</strong> {user.company.name}</p>
          <p><strong>Poste :</strong> {user.company.title}</p>
        </>
      )}

      <button
        onClick={handleLogout}
        style={{
          marginTop: "20px",
          padding: "10px 15px",
          backgroundColor: "#dc3545",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Déconnexion
      </button>
    </div>
  )
}

export default Profil
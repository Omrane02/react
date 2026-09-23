import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import type { RootState } from "../store/store"
import { logout } from "../store/reducers/auth"
import type { User } from "../types/user"

function Profil() {
  const authUser = useSelector((state: RootState) => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (!authUser) {
      setLoading(false)
      return
    }

    (async () => {
      try {
        const response = await axios.get<User>(`https://dummyjson.com/users/${authUser.id}`)
        setUser(response.data)
      } catch (e) {
        console.error(e)
        setError(true)
      } finally {
        setLoading(false)
      }
    })()
  }, [authUser])

  const handleLogout = () => {
    dispatch(logout())
    navigate("/connexion")
  }

  if (!authUser) {
    return <p style={{ textAlign: "center", marginTop: "40px" }}>Aucun utilisateur connecté.</p>
  }

  if (loading) return <p style={{ textAlign: "center", marginTop: "40px" }}>Chargement...</p>
  if (error || !user) return <p style={{ textAlign: "center", marginTop: "40px" }}>Impossible de charger le profil.</p>

  return (
    <div className="profile-card" style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <img src={user.image} alt={user.username} width={128} style={{ borderRadius: "50%" }} />
      <h1>{user.firstName} {user.lastName}</h1>

      <h2>Identité</h2>
      <p><strong>Nom d'utilisateur :</strong> {user.username}</p>
      <p><strong>Email :</strong> {user.email}</p>
      <p><strong>Téléphone :</strong> {user.phone}</p>
      <p><strong>Nom de jeune fille :</strong> {user.maidenName || "—"}</p>
      <p><strong>Âge :</strong> {user.age}</p>
      <p><strong>Genre :</strong> {user.gender}</p>
      <p><strong>Date de naissance :</strong> {user.birthDate}</p>
      <p><strong>Rôle :</strong> {user.role}</p>
      <p><strong>Université :</strong> {user.university}</p>

      <h2>Physique</h2>
      <p><strong>Groupe sanguin :</strong> {user.bloodGroup}</p>
      <p><strong>Couleur des yeux :</strong> {user.eyeColor}</p>
      {user.hair && <p><strong>Cheveux :</strong> {user.hair.color}, {user.hair.type}</p>}
      <p><strong>Taille :</strong> {user.height} cm</p>
      <p><strong>Poids :</strong> {user.weight} kg</p>

      {user.address && (
        <>
          <h2>Adresse</h2>
          <p>{user.address.address}</p>
          <p>{user.address.city}, {user.address.state} ({user.address.stateCode}) {user.address.postalCode}</p>
          <p>{user.address.country}</p>
          {user.address.coordinates && (
            <p><strong>Coordonnées :</strong> {user.address.coordinates.lat}, {user.address.coordinates.lng}</p>
          )}
        </>
      )}

      {user.company && (
        <>
          <h2>Entreprise</h2>
          <p><strong>Nom :</strong> {user.company.name}</p>
          <p><strong>Département :</strong> {user.company.department}</p>
          <p><strong>Poste :</strong> {user.company.title}</p>
          {user.company.address && (
            <p>
              <strong>Adresse :</strong> {user.company.address.address}, {user.company.address.city},{" "}
              {user.company.address.state} {user.company.address.postalCode}, {user.company.address.country}
            </p>
          )}
        </>
      )}

      {user.bank && (
        <>
          <h2>Banque</h2>
          <p><strong>Type de carte :</strong> {user.bank.cardType}</p>
          <p><strong>Numéro de carte :</strong> {user.bank.cardNumber}</p>
          <p><strong>Expiration :</strong> {user.bank.cardExpire}</p>
          <p><strong>Devise :</strong> {user.bank.currency}</p>
          <p><strong>IBAN :</strong> {user.bank.iban}</p>
        </>
      )}

      {user.crypto && (
        <>
          <h2>Crypto</h2>
          <p><strong>Monnaie :</strong> {user.crypto.coin}</p>
          <p><strong>Portefeuille :</strong> {user.crypto.wallet}</p>
          <p><strong>Réseau :</strong> {user.crypto.network}</p>
        </>
      )}

      <h2>Technique</h2>
      <p><strong>Adresse IP :</strong> {user.ip}</p>
      <p><strong>Adresse MAC :</strong> {user.macAddress}</p>
      <p><strong>User agent :</strong> {user.userAgent}</p>
      <p><strong>EIN :</strong> {user.ein}</p>
      <p><strong>SSN :</strong> {user.ssn}</p>

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

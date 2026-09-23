import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import axios from "axios"
import { login } from "../store/reducers/auth"

function Connexion() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await axios.post(
        "https://dummyjson.com/auth/login",
        {
          username: username.trim(),
          password: password,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )

      const data = response.data

      // Stocke les données de l'utilisateur et le token dans Redux
      dispatch(login({ user: data, token: data.token }))

      setLoading(false)
      // Redirige vers la page Profil personnelle
      navigate("/profil")
    } catch (err: any) {
      setLoading(false)
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message)
      } else {
        setError("Identifiants incorrects")
      }
    }
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Connexion..." : "Connect"}
      </button>
    </form>
  )
}

export default Connexion
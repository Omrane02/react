import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { login, setError } from "../store/reducers/auth"
import type { RootState } from "../store/store"
import type { LoginResponse } from "../types/auth"

function Connexion() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const error = useSelector((state: RootState) => state.auth.error)

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        dispatch(setError(null))

        try {
            // Appel asynchrone à l'API DummyJSON
            const response = await axios.post<LoginResponse>(
                "https://dummyjson.com/auth/login",
                { username, password },
                { headers: { "Content-Type": "application/json" } }
            )

            const { token, refreshToken, ...userData } = response.data

            // Mise à jour de l'état global Redux & sauvegarde du token
            dispatch(login({ user: userData, token }))
            setLoading(false)

            // Redirection vers le profil protégé
            navigate("/profile")
        } catch (err: any) {
            setLoading(false)
            if (err.response && err.response.data && err.response.data.message) {
                dispatch(setError(err.response.data.message))
            } else {
                dispatch(setError("Nom d'utilisateur ou mot de passe incorrect"))
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
                {loading ? "Chargement..." : "Connect"}
            </button>
        </form>
    )
}

export default Connexion
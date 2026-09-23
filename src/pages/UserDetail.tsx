import { useEffect, useState } from "react"
import { useParams, Navigate, Link } from "react-router-dom"
import axios from "axios"
import type { User } from "../types/user"

function UserDetail() {
    const { id } = useParams<{ id: string }>()
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        async function fetchUser() {
            try {
                setLoading(true)
                const response = await axios.get<User>(`https://dummyjson.com/users/${id}`)
                setUser(response.data)
                setLoading(false)
            } catch (err) {
                setError(true)
                setLoading(false)
            }
        }

        if (id) {
            fetchUser()
        }
    }, [id])

    if (loading) return <div className="loading">Chargement...</div>
    if (error || !user) return <Navigate to="/annuaire" replace />

    return (
        <div className="profile-card">
            <Link to="/annuaire" style={{ display: "inline-block", marginBottom: "1rem", color: "#d4af37" }}>
                ← Retour aux membres
            </Link>

            <img src={user.image} alt={user.username} width={128} />
            <h1>{user.firstName} {user.lastName}</h1>
            <p>Nom d'utilisateur : {user.username}</p>
            <p>Email : {user.email}</p>
            {user.phone && <p>Telephone : {user.phone}</p>}
            {user.age && <p>Age : {user.age}</p>}
            {user.gender && <p>Genre : {user.gender}</p>}
            {user.birthDate && <p>Date de naissance : {user.birthDate}</p>}
            {user.role && <p>Role : {user.role}</p>}

            {user.address && (
                <>
                    <h2>Adresse</h2>
                    <p>{user.address.address}</p>
                    <p>{user.address.city}, {user.address.postalCode}</p>
                    {user.address.country && <p>{user.address.country}</p>}
                </>
            )}

            {user.company && (
                <>
                    <h2>Entreprise</h2>
                    <p>Nom : {user.company.name}</p>
                    <p>Departement : {user.company.department}</p>
                    <p>Poste : {user.company.title}</p>
                </>
            )}
        </div>
    )
}

export default UserDetail
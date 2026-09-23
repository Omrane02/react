import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import type { User } from '../types/user'

interface UsersResponse {
  users: User[]
  total: number
  skip: number
  limit: number
}

function Users() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const response = await axios.get<UsersResponse>('https://dummyjson.com/users')
        setUsers(response.data.users)
        setLoading(false)
      } catch (err) {
        setError('Impossible de charger les utilisateurs')
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  
  const filteredUsers = users.filter((u) =>
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    u.username.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return <p style={{ textAlign: 'center', margin: '40px' }}>Chargement des membres...</p>
  if (error) return <p style={{ textAlign: 'center', color: 'red', margin: '40px' }}>{error}</p>

  return (
    <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
      <h2>Membres de la communauté</h2>

      <input
        type="text"
        placeholder="Rechercher un membre par nom ou username..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: '100%',
          padding: '10px',
          marginBottom: '20px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          boxSizing: 'border-box'
        }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {filteredUsers.map((u) => (
          <div
            key={u.id}
            style={{
              border: '1px solid #e0e0e0',
              borderRadius: '8px',
              padding: '15px',
              textAlign: 'center',
              backgroundColor: '#fff'
            }}
          >
            <img
              src={u.image}
              alt={u.username}
              style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '10px' }}
            />
            <h3 style={{ margin: '5px 0', fontSize: '1.1rem' }}>
              {u.firstName} {u.lastName}
            </h3>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 10px 0' }}>@{u.username}</p>
            <Link
              to={`/users/${u.id}`}
              style={{
                display: 'inline-block',
                padding: '6px 12px',
                backgroundColor: '#d4af37',
                color: '#fff',
                borderRadius: '4px',
                textDecoration: 'none',
                fontSize: '0.85rem'
              }}
            >
              Voir le profil
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Users
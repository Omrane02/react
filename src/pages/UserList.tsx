import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { User } from "../types/user";

interface UsersResponse {
    users: User[];
}

function UserList() {
    const url = "https://dummyjson.com/users";
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get<UsersResponse>(url);
                setUsers(response.data.users);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    
    const filteredUsers = users.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
        user.username?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={{ maxWidth: "900px", margin: "30px auto", padding: "0 20px" }}>
            <h2>Annuaire des membres</h2>

            {/* Barre de recherche */}
            <input
                type="text"
                placeholder="Rechercher par nom, prénom..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                    width: "100%",
                    padding: "10px",
                    marginBottom: "20px",
                    borderRadius: "6px",
                    border: "1px solid #ccc"
                }}
            />

            {/* Grille des membres */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "20px" }}>
                {filteredUsers.map((user) => (
                    <div 
                        key={user.id} 
                        style={{ border: "1px solid #e0e0e0", padding: "15px", borderRadius: "8px", textAlign: "center" }}
                    >
                        <img src={user.image} alt={user.username} width={64} style={{ borderRadius: "50%" }} />
                        <p><strong>{user.firstName} {user.lastName}</strong></p>
                        <p style={{ color: "#666", fontSize: "0.9rem" }}>@{user.username}</p>
                        
                        <Link 
                            to={`/annuaire/${user.id}`}
                            style={{ display: "inline-block", marginTop: "10px", color: "#d4af37", textDecoration: "none", fontWeight: "bold" }}
                        >
                            Voir le profil
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserList;
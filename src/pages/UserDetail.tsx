import { Navigate, useLocation } from "react-router-dom";
import usersData from "../data/users.json"

function User(){
    const location = useLocation();
    const userId = (location.state as { userId?: number } | null)?.userId
    const user = usersData.users.find((u) => u.id === userId)

    if(!user){
        return <Navigate to="/connexion" replace />;
    }

    return (
        <div className="profile-card">
            <img src={user.image} width={128} />
            <h1>{user.firstName} {user.lastName}</h1>
            <p>Nom d'utilisateur : {user.username}</p>
            <p>Email : {user.email}</p>
            <p>Telephone : {user.phone}</p>
            <p>Age : {user.age}</p>
            <p>Genre : {user.gender}</p>
            <p>Date de naissance : {user.birthDate}</p>
            <p>Role : {user.role}</p>

            <h2>Adresse</h2>
            <p>{user.address.address}</p>
            <p>{user.address.city}, {user.address.postalCode}</p>
            <p>{user.address.country}</p>

            <h2>Entreprise</h2>
            <p>Nom : {user.company.name}</p>
            <p>Departement : {user.company.department}</p>
            <p>Poste : {user.company.title}</p>
        </div>
    )
}

export default User
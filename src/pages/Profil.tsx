import { Link, useParams } from "react-router-dom";
import usersData from "../data/users.json";

function Profil() {
    const { id } = useParams();
    const user = usersData.users.find((u) => u.id === Number(id));

    if (!user) {
        return (
            <>
                <p>Utilisateur introuvable.</p>
                <Link to="/annuaire">Retour à l'annuaire</Link>
            </>
        );
    }

    return (
        <div className="profile-card profile-card--simple">
            <img src={user.image} width={128} />
            <h1>{user.username}</h1>
        </div>
    );
}

export default Profil;

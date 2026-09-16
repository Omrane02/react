import usersData from "../data/users.json"

function Annuaire() {
    const users = usersData.users;
    return (
        <div className="user-grid">
            {users.map((user) =>
            <div className="user-card" key={user.id}>
                <img src={user.image} width={64} />
                <p>Nom d'utilisateur : {user.username}</p>
            </div>
            )}
            </div>
    );
}

export default Annuaire
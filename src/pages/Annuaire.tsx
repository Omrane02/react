import usersData from "../data/users.json"

function Annuaire() {
    const users = usersData.users;
    return (
        <>
            {users.map((user) =>
            <div key={user.id}>
                <img src={user.image} width={64} />
                <p>Nom d'utilisateur : {user.username}</p>
            </div>
            )}
            </>
    );
}

export default Annuaire
import axios from "axios";
import { useEffect, useState } from "react";
import type { User } from "../types/user";

interface UsersResponse{
    users: User[];
}
function UserList(){
    const url = "https://dummyjson.com/users";
    const [users, setUsers] = useState<User[]>([])
    useEffect (() => {
        (async() => {
            try {
                const response = await axios.get<UsersResponse>(url);
                setUsers(response.data.users);
            } catch (e) {
                console.error(e);
            }
        })();
    }, []);

    return (
        <>
            {users.map((user) =>
                <div>
                    <p>name : {user.firstName}</p>
                    <p>last name : {user.lastName}</p>
                </div>
              )}
            </>
    );
}

export default UserList
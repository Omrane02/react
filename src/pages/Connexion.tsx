import usersData from "../data/users.json"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Connexion (){
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const navigate = useNavigate()


function handleSubmit(e: React.SubmitEvent){
    e.preventDefault()

    const user = usersData.users.find(
        (u) => u.username === username && u.password === password
    )

    if(user){
        setError("")
        navigate("/user/profil", { state: { userId: user.id } })
    } else {
        setError("Invalid credentials")
    }
}
return (
    <form className="login-form" onSubmit={handleSubmit}>
        <div className="field">
            <label>
                Username
            </label>
            <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <div className="field">
            <label>
                Password
            </label>
            <input
                id ="password"
                type="password"
                value ={password}
                onChange = {(e) => setPassword(e.target.value)}
            />
        </div>

        {error && <p className="form-error">{error}</p>}

        <button type="submit"> Connect</button>
    </form>
)}

export default Connexion
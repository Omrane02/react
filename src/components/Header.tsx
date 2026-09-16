import { Link } from "react-router-dom";

function Header() {
    return (
        <nav className="header">
            <ul className="header-nav">
                <li><Link to="/">Home</Link></li>
                <li><Link to= "/annuaire">Annuaire</Link></li>
                <li><Link to="/connexion">Connexion</Link></li>
            </ul>
        </nav>
    );
}

export default Header
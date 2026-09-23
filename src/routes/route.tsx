import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import App from "../App";
import UserList from "../pages/UserList";
import Recipe from "../pages/Recipe";
import Connexion from "../pages/Connexion";
import UserDetail from "../pages/UserDetail";
import Profil from "../pages/Profil";
import Erreurs from "../pages/erreurs";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";

const Layout = () => (
  <>
    <Header />
    <Outlet/>
  </>
)

const routes = [
  {
    element: <Layout/>,
    children :[
  
      {
        path: "/",
        element:  <App/>,
      },
      {
        path: "/annuaire",
        element: <UserList/>,
      },

      {
        path: "/recipe/:id",
        element: <Recipe/>
      },
      {
        path: "/connexion",
        element: <GuestRoute><Connexion/>
        </GuestRoute>
        
      },
      {
        path: "/user/profil",
        element: <UserDetail/>
      },
      {
        path: "/profil/:id",
        element: <PrivateRoute><Profil/>
        </PrivateRoute>
      },
      {
        path: "*",
        element: <Erreurs/>
      }
    ]
  }
]

export default routes;
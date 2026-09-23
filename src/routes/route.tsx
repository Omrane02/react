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
import Blog from "../pages/Blog";
import PostDetail from "../pages/PostDetail";

const Layout = () => (
  <>
    <Header />
    <Outlet />
  </>
)

const routes = [
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <App />,
      },
      {
        path: "/annuaire",
        element: <UserList />,
      },
      {
        path: "/annuaire/:id",
        element: <UserDetail />,
      },
      {
        path: "/recipe/:id",
        element: <Recipe />,
      },
      {
        path: "/connexion",
        element: (
          <GuestRoute>
            <Connexion />
          </GuestRoute>
        ),
      },
      {
        path: "/profil",
        element: (
          <PrivateRoute>
            <Profil />
          </PrivateRoute>
        ),
      },
      {
        path: "/favoris",
        element: <PrivateRoute><Favoris/>
        </PrivateRoute>
      },
      {
        path: "/posts",
        element: <Blog/>
      },
      {
        path: "/posts/:id",
        element: <PostDetail/>
      },
      {
        path: "*",
        element: <Erreurs />,
      },
    ],
  },
]

export default routes
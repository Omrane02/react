import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../store/store";
import { setLoading } from "../store/reducers/loading";
import App from "../App";
import UserList from "../pages/UserList";
import Recipe from "../pages/Recipe";
import Connexion from "../pages/Connexion";
import UserDetail from "../pages/UserDetail";
import Profil from "../pages/Profil";
import Favoris from "../pages/favoris";
import Erreurs from "../pages/erreurs";
import PrivateRoute from "./PrivateRoute";
import GuestRoute from "./GuestRoute";

const Layout = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // TODO: replace with a real auth check (verify token, fetch current user, etc.)
    // then dispatch(login(user)) if valid.
    dispatch(setLoading(false));
  }, [dispatch]);

  return (
    <>
      <Header />
      <Outlet/>
    </>
  );
}

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
        path: "/favoris",
        element: <PrivateRoute><Favoris/>
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
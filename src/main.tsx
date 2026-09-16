import { createBrowserRouter, Navigate } from 'react-router-dom'
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import Header from './components/Header.tsx';
import { Outlet } from 'react-router-dom';
import RecipeList from './pages/Annuaire.tsx';
import Recipe from './pages/Recipe.tsx'
import Erreurs from './pages/erreurs.tsx'
import Annuaire from './pages/Annuaire.tsx';

const Layout = () => (
  <>
    <Header />
    <Outlet/>
  </>
)
const router = createBrowserRouter([
  {
    element: <Layout/>,
    children :[
  
      {
        path: "/",
        element:  <App/>,
      },
      {
        path: "/annuaire",
        element: <Annuaire/>,
      },

      {
        path: "/recipe/:id",
        element: <Recipe/>
      },
      {
        path: "*",
        element: <Erreurs/>
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router = {router} />
)

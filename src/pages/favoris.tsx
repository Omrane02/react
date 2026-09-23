import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

function Favoris() {
  const favoris = useSelector((state: RootState) => state.favoris.items);

  if (favoris.length === 0) {
    return <p>Vous n'avez aucune recette en favoris.</p>;
  }

  return (
    <ul>
      {favoris.map((recipe) => (
        <li key={recipe.id}>
          <img src={recipe.image} width={60} />
          <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
          <p>Préparation : {recipe.prepTimeMinutes} min — Cuisson : {recipe.cookTimeMinutes} min</p>
        </li>
      ))}
    </ul>
  );
}

export default Favoris;
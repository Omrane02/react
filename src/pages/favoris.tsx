import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import recipesData from "../data/recipes.json";

function Favoris() {
  const favoriIds = useSelector((state: RootState) => state.favoris.ids);

  const favoriRecipes = recipesData.recipes.filter((r) =>
    favoriIds.includes(r.id)
  );

  if (favoriRecipes.length === 0) {
    return <p>Vous n'avez aucune recette en favoris.</p>;
  }

  return (
    <ul>
      {favoriRecipes.map((recipe) => (
        <li key={recipe.id}>
          <img src={recipe.image} width={60} />
          <Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Favoris;
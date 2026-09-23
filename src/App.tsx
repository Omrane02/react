import './App.css'
import HelloWorld from './components/HelloWorld'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Recipe, RecipesResponse } from './types/recipe';
import FavoriteButton from './components/FavoriteButton';

function App() {
  let isValid: boolean = true;

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement des recettes.");
        return res.json();
      })
      .then((data: RecipesResponse) => {
        setRecipes(data.recipes);
        setLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <section id="center">
        <div>
          {isValid && <HelloWorld name="Omrane Riahi" />}
        </div>

        <div className="recipe-grid">
          {recipes.map((recipe) => (
            <div className="recipe-card" key={recipe.id}>
              <img src={recipe.image} width={100} />
              <p><Link to={`/recipe/${recipe.id}`}>{recipe.name}</Link></p>
              <p>Préparation : {recipe.prepTimeMinutes} min</p>
              <p>Cuisson : {recipe.cookTimeMinutes} min</p>
              <FavoriteButton
                recipe={{
                  id: recipe.id,
                  name: recipe.name,
                  image: recipe.image,
                  prepTimeMinutes: recipe.prepTimeMinutes,
                  cookTimeMinutes: recipe.cookTimeMinutes,
                }}
              />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default App
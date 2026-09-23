import { Link, useParams } from "react-router-dom";
import recipesData from "../data/recipes.json";
import FavoriteButton from "../components/FavoriteButton";

function Recipe() {
    const { id } = useParams();
    const recipe = recipesData.recipes.find((r) => r.id === Number(id));

    if (!recipe) {
        return (
            <>
                <p>Recette introuvable.</p>
                <Link to="/">Retour à l'accueil</Link>
            </>
        );
    }

    return (
        <>
            <h1>{recipe.name}</h1>
            <img src={recipe.image} width={300} />
            <FavoriteButton recipeId={recipe.id} />
            <p>Temps de préparation : {recipe.prepTimeMinutes} minutes</p>
            <p>Temps de cuisson : {recipe.cookTimeMinutes} minutes</p>

            <h2>Ingrédients</h2>
            <ul>
                {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                ))}
            </ul>

            <h2>Instructions</h2>
            <ol>
                {recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
        </>
    );
}

export default Recipe;
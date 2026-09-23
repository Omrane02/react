import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import FavoriteButton from "../components/FavoriteButton";
import type { Recipe as RecipeType } from "../types/recipe";
import type { User } from "../types/user";

function Recipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<RecipeType | null>(null);
    const [author, setAuthor] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                setError(false);
                const response = await axios.get<RecipeType>(`https://dummyjson.com/recipes/${id}`);
                setRecipe(response.data);
            } catch (e) {
                console.error(e);
                setError(true);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    useEffect(() => {
        if (!recipe) return;
        setAuthor(null);
        (async () => {
            try {
                const response = await axios.get<User>(`https://dummyjson.com/users/${recipe.userId}`);
                setAuthor(response.data);
            } catch (e) {
                console.error(e);
            }
        })();
    }, [recipe]);

    if (loading) return <p>Chargement...</p>;

    if (error || !recipe) {
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
            <img src={recipe.image} alt={recipe.name} width={300} />
            <FavoriteButton recipeId={recipe.id} />

            <p>Cuisine : {recipe.cuisine}</p>
            <p>Difficulté : {recipe.difficulty}</p>
            <p>Type de repas : {recipe.mealType.join(", ")}</p>
            <p>Tags : {recipe.tags.join(", ")}</p>
            <p>Note : {recipe.rating} / 5 ({recipe.reviewCount} avis)</p>
            <p>Portions : {recipe.servings}</p>
            <p>Calories par portion : {recipe.caloriesPerServing}</p>
            <p>Temps de préparation : {recipe.prepTimeMinutes} minutes</p>
            <p>Temps de cuisson : {recipe.cookTimeMinutes} minutes</p>
            {author && (
                <p>
                    Auteur : <Link to={`/annuaire/${author.id}`}>{author.username}</Link>
                </p>
            )}

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

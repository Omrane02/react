import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { Recipe as RecipeType } from "../types/recipe";
import FavoriteButton from "../components/FavoriteButton";

function Recipe() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState<RecipeType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`https://dummyjson.com/recipes/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Recette introuvable.");
                return res.json();
            })
            .then((data: RecipeType) => {
                setRecipe(data);
                setLoading(false);
            })
            .catch((err: Error) => {
                setError(err.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <p>Chargement...</p>;

    if (error || !recipe) {
        return (
            <>
                <p>{error ?? "Recette introuvable."}</p>
                <Link to="/">Retour à l'accueil</Link>
            </>
        );
    }

    return (
        <>
            <h1>{recipe.name}</h1>
            <img src={recipe.image} width={300} />
            <FavoriteButton
                recipe={{
                    id: recipe.id,
                    name: recipe.name,
                    image: recipe.image,
                    prepTimeMinutes: recipe.prepTimeMinutes,
                    cookTimeMinutes: recipe.cookTimeMinutes,
                }}
            />
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
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { toggleFavori, type FavoriRecipe } from "../store/reducers/favoris";

interface FavoriteButtonProps {
  recipe: FavoriRecipe;
}

function FavoriteButton({ recipe }: FavoriteButtonProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isFavori = useSelector((state: RootState) =>
    state.favoris.items.some((r) => r.id === recipe.id)
  );

  return (
    <button onClick={() => dispatch(toggleFavori(recipe))}>
      {isFavori ? "★ Retirer des favoris" : "☆ Ajouter aux favoris"}
    </button>
  );
}

export default FavoriteButton;
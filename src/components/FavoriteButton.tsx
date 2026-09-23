import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { toggleFavori } from "../store/reducers/favoris";

interface FavoriteButtonProps {
  recipeId: number;
}

function FavoriteButton({ recipeId }: FavoriteButtonProps) {
  const dispatch = useDispatch<AppDispatch>();
  const isFavori = useSelector((state: RootState) =>
    state.favoris.ids.includes(recipeId)
  );

  return (
    <button onClick={() => dispatch(toggleFavori(recipeId))}>
      {isFavori ? "★ Retirer des favoris" : "☆ Ajouter aux favoris"}
    </button>
  );
}

export default FavoriteButton;
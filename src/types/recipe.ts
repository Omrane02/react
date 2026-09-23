export interface Recipe {
  id: number;
  name: string;
  image: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  ingredients: string[];
  instructions: string[];
  servings?: number;
  difficulty?: string;
  cuisine?: string;
  rating?: number;
}

export interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}
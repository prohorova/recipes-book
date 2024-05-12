export interface Recipe {
  _id?: string;
  title: string;
  ingredients: string;
  cookTime?: number;
  servings?: number;
  instructions: string;
  imageUrl?: string;
}

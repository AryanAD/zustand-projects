import { useState } from "react";
import { useStore } from "../store/useStore";

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string;
}

const Recipe = () => {
  const { recipes, addRecipe, removeRecipe } = useStore();

  const [name, setName] = useState<string>("");
  const [ingredients, setIngredients] = useState<string>("");
  const [instructions, setInstructions] = useState<string>("");
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  const handleAddRecipe = () => {
    if (
      name.trim() === "" ||
      ingredients.trim() === "" ||
      instructions.trim() === ""
    ) {
      return;
    }

    addRecipe({
      id: Date.now(),
      name,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      instructions,
    });

    setName("");
    setIngredients("");
    setInstructions("");
  };

  const handleUpdateRecipe = () => {
    if (
      name.trim() === "" ||
      ingredients.trim() === "" ||
      instructions.trim() === ""
    ) {
      return;
    }

    if (editingRecipe) {
      removeRecipe(editingRecipe.id);
      addRecipe({
        id: Date.now(),
        name,
        ingredients: ingredients.split(",").map((i) => i.trim()),
        instructions,
      });
    }

    setEditingRecipe(null);
    setName("");
    setIngredients("");
    setInstructions("");
  };

  const handleCancelRecipe = () => {
    setEditingRecipe(null);
    setName("");
    setIngredients("");
    setInstructions("");
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setEditingRecipe(recipe);
    setName(recipe.name);
    setIngredients(recipe.ingredients.join(", "));
    setInstructions(recipe.instructions);
  };

  const handleDeleteRecipe = (id: number) => {
    removeRecipe(id);
    setEditingRecipe(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="bg-white p-6 rounded-xlg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
          Recipe Book
        </h1>

        <div className="space-y-4 mb-6">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Recipe Name"
            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            placeholder="Ingredients (comma seperated)"
            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <textarea
            rows={6}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Your Instructions"
            className="w-full px-4 py-2 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <div className="flex justify-between">
            {editingRecipe ? (
              <>
                <button
                  className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={handleUpdateRecipe}
                >
                  Update Recipe
                </button>

                <button
                  className="text-white bg-gray-500 px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  onClick={handleCancelRecipe}
                >
                  Cancel Recipe
                </button>
              </>
            ) : (
              <>
                <button
                  className="text-white bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  onClick={handleAddRecipe}
                >
                  Add Recipe
                </button>
              </>
            )}
          </div>
        </div>

        <ul className="space-y-4">
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              className="p-3 bg-green-50 rounded-lg shadow-sm"
            >
              <h2 className="text-xl font-extrabold text-green-700 mb-2">
                {recipe.name}
              </h2>

              <p className="text-gray-700 mb-2">
                <strong>Ingredients: </strong> {recipe.ingredients.join(", ")}
              </p>

              <p className="text-gray-700 mb-2">
                <strong>Instructions: </strong> {recipe.instructions}
              </p>

              <div className="flex justify-between">
                <button
                  className="text-white bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={() => handleEditRecipe(recipe)}
                >
                  Edit Recipe
                </button>

                <button
                  className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={() => handleDeleteRecipe(recipe.id)}
                >
                  Delete Recipe
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Recipe;

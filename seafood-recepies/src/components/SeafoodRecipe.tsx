import { useEffect } from "react";
import { useStore } from "../store";

const SeafoodRecipe = () => {
  const { meals, searchQuery, setMeals, setSearchQuery } = useStore();

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood"
        );

        const data = await res.json();
        setMeals(data.meals);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchMeals();
  }, [setMeals]);

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-teal-600">Seafood Recipes</h1>

      <input
        type="text"
        placeholder="Search for a meal here..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-teal-400 rounded-lg p-3 mb-8 w-96 text-center focus:outline-none focus:ring-2 focus:ring-teal-500"
      />

      <div className="grid grid-cols-3 gap-6">
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal) => (
            <div
              className="bg-white shadow-md rounded-lg p-2 flex flex-col items-center"
              key={meal.idMeal}
            >
              <img
                className="w-full h-48 object-cover rounded-t-lg mb-4"
                src={meal.strMealThumb}
                alt={meal.strMeal}
              />

              <h2 className="text-xl font-semibold text-teal-600 mb-2">
                {meal.strMeal}
              </h2>

              <p className="text-gray-500 text-sm">
                {"This is a delicious meal and i recommend it to everyone."}
              </p>
            </div>
          ))
        ) : (
          <>
            <p className="text-gray-500 text-center">
              No meals found. Try a different search.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SeafoodRecipe;

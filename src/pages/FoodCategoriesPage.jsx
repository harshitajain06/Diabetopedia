const foodCategories = [
  {
    name: "Fruits",
    description: "Fresh fruits rich in fiber and natural sugars.",
    image: "https://source.unsplash.com/160x160/?fruit",
  },
  {
    name: "Vegetables",
    description: "Low-carb veggies great for diabetes control.",
    image: "https://source.unsplash.com/160x160/?vegetables",
  },
  {
    name: "Whole Grains",
    description: "Healthy carbs that are slowly digested.",
    image: "https://source.unsplash.com/160x160/?wholegrains",
  },
  {
    name: "Proteins",
    description: "Lean meats, legumes, and dairy.",
    image: "https://source.unsplash.com/160x160/?protein-food",
  },
  {
    name: "Snacks",
    description: "Healthy snack options with low sugar.",
    image: "https://source.unsplash.com/160x160/?healthy-snacks",
  },
];

const FoodCategoriesPage = () => {
  return (
    <div className="bg-pink-50 min-h-screen text-gray-900">

      <main className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center text-pink-700 mb-6">
          Food Categories
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {foodCategories.map((item, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-300 text-center"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-pink-600">
                {item.name}
              </h3>
              <p className="mt-2 text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FoodCategoriesPage;

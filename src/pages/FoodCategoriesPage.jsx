import {
  Apple,
  Leaf,
  Wheat,
  Drumstick,
  Cookie,
  Fish,
  GlassWater,
  Salad,
  IceCream,
  UtensilsCrossed,
  CupSoda,
  Pizza,
  Egg,
  Cake,
} from "lucide-react";

const foodCategories = [
  {
    name: "Fruits",
    description:
      "Fruits like apples, berries, and citrus are rich in fiber and essential nutrients. Choose whole fruits over juices for better blood sugar control.",
    icon: <Apple className="w-12 h-12 text-pink-500" />,
  },
  {
    name: "Vegetables",
    description:
      "Non-starchy vegetables like spinach, kale, and bell peppers are low in carbs and high in fiber and antioxidants.",
    icon: <Leaf className="w-12 h-12 text-green-600" />,
  },
  {
    name: "Whole Grains",
    description:
      "Brown rice, quinoa, barley, and oats digest slowly, keeping blood sugar levels stable.",
    icon: <Wheat className="w-12 h-12 text-yellow-600" />,
  },
  {
    name: "Proteins",
    description:
      "Includes lean meat, eggs, tofu, and lentils. Supports muscle health and keeps you full without spiking blood sugar.",
    icon: <Drumstick className="w-12 h-12 text-blue-600" />,
  },
  {
    name: "Snacks",
    description:
      "Healthy options like nuts, seeds, Greek yogurt, and roasted chickpeas make great snacks between meals.",
    icon: <Cookie className="w-12 h-12 text-orange-500" />,
  },
  {
    name: "Seafood",
    description:
      "Salmon, sardines, and mackerel are rich in omega-3s, which support heart health—essential for people with diabetes.",
    icon: <Fish className="w-12 h-12 text-blue-400" />,
  },
  
  {
    name: "Hydration",
    description:
      "Water, infused water, and herbal teas help flush toxins and keep blood sugar in balance.",
    icon: <GlassWater className="w-12 h-12 text-cyan-500" />,
  },
  {
    name: "Salads",
    description:
      "A mix of greens, seeds, lean protein, and healthy dressings make nutrient-rich meals for any time of day.",
    icon: <Salad className="w-12 h-12 text-lime-600" />,
  },
  {
    name: "Low Sugar Desserts",
    description:
      "Opt for dark chocolate, fruit sorbet, or homemade desserts using natural sweeteners like stevia or monk fruit.",
    icon: <IceCream className="w-12 h-12 text-fuchsia-500" />,
  },
  {
    name: "Balanced Meals",
    description:
      "Combining protein, healthy fat, and carbs in every meal helps maintain consistent glucose levels.",
    icon: <UtensilsCrossed className="w-12 h-12 text-gray-700" />,
  },
  {
    name: "Beverages to Avoid",
    description:
      "Avoid sugary drinks like sodas, sweetened coffee, and energy drinks as they spike glucose rapidly.",
    icon: <CupSoda className="w-12 h-12 text-red-500" />,
  },
  {
    name: "Fast Food",
    description:
      "Limit processed and fast food, which often contains hidden sugars, unhealthy fats, and high sodium.",
    icon: <Pizza className="w-12 h-12 text-red-600" />,
  },
  {
    name: "Eggs",
    description:
      "A great source of high-quality protein. Eggs have minimal impact on blood sugar and support fullness.",
    icon: <Egg className="w-12 h-12 text-yellow-500" />,
  },
  {
    name: "Cakes & Pastries",
    description:
      "Indulge rarely and opt for diabetic-friendly recipes when craving baked goods.",
    icon: <Cake className="w-12 h-12 text-rose-400" />,
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
              className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-pink-600 text-center">
                {item.name}
              </h3>
              <p className="mt-3 text-gray-700 text-sm text-justify leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default FoodCategoriesPage;

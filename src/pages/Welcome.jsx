import { useState } from "react";

const DiabetopediaContent = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");

  // BMI Calculation
  const calculateBMI = () => {
    if (height && weight) {
      const heightMeters = height / 100;
      const bmiValue = (weight / (heightMeters * heightMeters)).toFixed(2);
      setBmi(bmiValue);
    }
  };

  return (
    <div className="bg-pink-50 min-h-screen text-gray-900">
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="text-center mb-10 px-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-pink-700">
            Welcome to Diabetopedia!
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-700 leading-relaxed">
            This app helps diabetics plan meals, maintain balanced blood sugar, and simplify healthy eating.
          </p>
        </section>

        {/* BMI Form */}
        <section className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto w-full">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Enter your details:
          </h3>
          <div className="mt-4 space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <input
              type="number"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 border rounded-md text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
            <button
              onClick={calculateBMI}
              className="w-full bg-pink-500 text-white py-3 rounded-md hover:bg-pink-600 transition duration-200"
            >
              Calculate BMI
            </button>
            {bmi && (
              <p className="text-lg text-gray-800 mt-2 text-center">
                Your BMI: <span className="font-bold">{bmi}</span>
              </p>
            )}
          </div>
        </section>

        {/* Food Categories */}
        <section className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-2">
          {[
            {
              title: "Vegetables 🥦",
              items: "Spinach, Cauliflower, Bell Peppers, Tomatoes, Zucchini",
            },
            {
              title: "Fruits 🍓",
              items: "Strawberries, Blueberries, Raspberries, Cherries, Pears",
            },
            {
              title: "Proteins 🥚",
              items: "Eggs, Chicken, Tofu, Fish, Almonds, Walnuts",
            },
          ].map((cat, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-lg shadow-md text-center hover:shadow-lg transition duration-300"
            >
              <h4 className="text-lg sm:text-xl font-semibold text-pink-700">{cat.title}</h4>
              <p className="mt-2 text-sm sm:text-base text-gray-700">{cat.items}</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default DiabetopediaContent;

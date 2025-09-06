import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecommendedCategories from "../pages/RecommendedCategories";

const DiabetopediaContent = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [gender, setGender] = useState("");
  const [activity, setActivity] = useState("");

  const navigate = useNavigate();

  const activityDescriptions = {
    low: {
      title: "Sedentary / Low Activity",
      description:
        "Mostly sitting or lying down; minimal physical activity. Examples include desk jobs, watching TV, reading, or doing minimal housework.",
    },
    mild: {
      title: "Lightly Active / Mildly Active",
      description:
        "Some physical activity during the day, such as light housework or walking, stretching or yoga 1–3 days a week. Typical roles: teachers, shopkeepers, tailors, light factory workers.",
    },
    moderate: {
      title: "Moderately Active",
      description:
        "Regular physical activity or a physically active job. Examples include fitness routines 5–6 times a week, or roles such as construction workers, farmers, dancers, and fitness instructors.",
    },
    veryactive: {
      title: "Very Active",
      description:
        "High-intensity activity for long durations daily. Examples include professional athletes, manual laborers with long hours (e.g., mining, porters, rural women doing extensive farm work).",
    },
  };

  const calculateBMI = () => {
    if (height && weight) {
      const heightMeters = height / 100;
      const bmiValue = (weight / (heightMeters * heightMeters)).toFixed(2);
      setBmi(bmiValue);
    }
  };

  const goToBooklet = () => {
    navigate("/booklet", {
      state: { name, age, height, weight, bmi, gender, activity },
    });
  };

  return (
    <div className="bg-blue-50 min-h-screen text-gray-900 flex flex-col">
      <main className="container mx-auto px-4 py-8 flex flex-col lg:flex-row items-start gap-10">
        {/* Left Section */}
        <section className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-white-700 mb-4">
  Welcome to <span className="text-green-600">Diabetopedia</span>! 🌿
</h2>
<p className="text-gray-700 text-base sm:text-lg leading-relaxed">
  Living with diabetes doesn’t have to be overwhelming. <strong>Diabetopedia</strong> is your all-in-one wellness companion designed specifically for individuals managing diabetes and prediabetes. Whether you're newly diagnosed or looking to better control your health, this app provides simple, tailored guidance that fits your lifestyle.
</p>

<p className="mt-4 text-gray-700 text-base sm:text-lg leading-relaxed">
  By analyzing your physical stats such as <strong>BMI, age, gender</strong>, and <strong>activity level</strong>, we craft a diet and lifestyle suggestion plan just for you. No complex jargon, just actionable steps toward better sugar control, meal planning, and well-being.
</p>

<p className="mt-4 text-gray-700 text-base sm:text-lg leading-relaxed">
  Let us help you:
</p>
<ul className="list-disc list-inside mt-2 text-gray-700 text-base sm:text-lg space-y-2">
  <li>Calculate your Body Mass Index (BMI) and understand its significance</li>
  <li>Create a personalized diet plan based on your profile</li>
  <li>Explore healthy food categories suited for diabetics</li>
  <li>Stay consistent with your nutrition and physical activity goals</li>
</ul>

<p className="mt-4 text-gray-700 text-base sm:text-lg leading-relaxed">
  With Diabetopedia, you’re not just tracking — you’re transforming. Let’s take the first step toward a healthier, more balanced you! 💪
</p>

        </section>

        {/* Right Section */}
        <section className="flex-1 bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Enter Your Details 📝
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border rounded-md"
            />
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-3 border rounded-md"
            />
            <input
              type="number"
              placeholder="Height (cm)"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full p-3 border rounded-md"
            />
            <input
              type="number"
              placeholder="Weight (kg)"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full p-3 border rounded-md"
            />
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full p-3 border rounded-md"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>

            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
              className="w-full p-3 border rounded-md"
            >
              <option value="">Select Activity Level</option>
              <option value="low">Sedentary / Low</option>
              <option value="mild">Lightly Active / Mildly Active</option>
              <option value="moderate">Moderately Active</option>
              <option value="veryactive">Very Active</option>
            </select>

            {activity && (
              <div className="bg-white-100 border-l-4 border-blue-400 p-3 rounded-md mt-2 text-sm text-gray-800">
                <p className="font-semibold">{activityDescriptions[activity]?.title}</p>
                <p>{activityDescriptions[activity]?.description}</p>
              </div>
            )}

            <button
              onClick={calculateBMI}
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-white-600"
            >
              Calculate BMI
            </button>

            {bmi && (
              <>
                <p className="text-lg text-center text-gray-800 mt-2">
                  Your BMI: <span className="font-bold">{bmi}</span>
                </p>
                <button
                  onClick={goToBooklet}
                  className="w-full bg-green-500 text-white py-3 rounded-md mt-4 hover:bg-green-600"
                >
                  Grab your Diet
                </button>
              </>
            )}
          </div>
        </section>
      </main>

      {/* Recommended Categories */}
      
<RecommendedCategories />


    </div>
  );
};

export default DiabetopediaContent;
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

  // Validation states
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

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

  // Validation functions
  const validateName = (name) => {
    if (!name.trim()) return "Name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) return "Name can only contain letters and spaces";
    return "";
  };

  const validateAge = (age) => {
    if (!age) return "Age is required";
    const ageNum = parseInt(age);
    if (isNaN(ageNum)) return "Age must be a valid number";
    if (ageNum < 1 || ageNum > 120) return "Age must be between 1 and 120";
    return "";
  };

  const validateHeight = (height) => {
    if (!height) return "Height is required";
    const heightNum = parseFloat(height);
    if (isNaN(heightNum)) return "Height must be a valid number";
    if (heightNum < 50 || heightNum > 300) return "Height must be between 50 and 300 cm";
    return "";
  };

  const validateWeight = (weight) => {
    if (!weight) return "Weight is required";
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum)) return "Weight must be a valid number";
    if (weightNum < 10 || weightNum > 500) return "Weight must be between 10 and 500 kg";
    return "";
  };

  const validateGender = (gender) => {
    if (!gender) return "Gender is required";
    return "";
  };

  const validateActivity = (activity) => {
    if (!activity) return "Activity level is required";
    return "";
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    
    newErrors.name = validateName(name);
    newErrors.age = validateAge(age);
    newErrors.height = validateHeight(height);
    newErrors.weight = validateWeight(weight);
    newErrors.gender = validateGender(gender);
    newErrors.activity = validateActivity(activity);

    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === "");
  };

  // Check if form is valid for real-time feedback
  const isFormValid = () => {
    return name && age && height && weight && gender && activity && 
           !errors.name && !errors.age && !errors.height && !errors.weight && 
           !errors.gender && !errors.activity;
  };

  // Handle field blur for real-time validation
  const handleBlur = (fieldName) => {
    setTouched({ ...touched, [fieldName]: true });
    
    let error = "";
    switch (fieldName) {
      case "name":
        error = validateName(name);
        break;
      case "age":
        error = validateAge(age);
        break;
      case "height":
        error = validateHeight(height);
        break;
      case "weight":
        error = validateWeight(weight);
        break;
      case "gender":
        error = validateGender(gender);
        break;
      case "activity":
        error = validateActivity(activity);
        break;
      default:
        break;
    }
    
    setErrors({ ...errors, [fieldName]: error });
  };

  const calculateBMI = () => {
    // Validate height and weight before calculating BMI
    const heightError = validateHeight(height);
    const weightError = validateWeight(weight);
    
    if (heightError || weightError) {
      setErrors({
        ...errors,
        height: heightError,
        weight: weightError
      });
      return;
    }

    if (height && weight) {
      const heightMeters = height / 100;
      const bmiValue = (weight / (heightMeters * heightMeters)).toFixed(2);
      setBmi(bmiValue);
    }
  };

  const goToBooklet = () => {
    // Validate all fields before proceeding
    if (!validateForm()) {
      // Mark all fields as touched to show errors
      setTouched({
        name: true,
        age: true,
        height: true,
        weight: true,
        gender: true,
        activity: true
      });
      return;
    }

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
          <p className="text-sm text-gray-600 mb-4">
            All fields are required to generate your personalized diet plan.
          </p>
          <div className="space-y-4">
            {/* Name Input */}
            <div>
              <input
                type="text"
                placeholder="Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => handleBlur("name")}
                className={`w-full p-3 border rounded-md ${
                  touched.name && errors.name 
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
              />
              {touched.name && errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Age Input */}
            <div>
              <input
                type="number"
                placeholder="Age *"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                onBlur={() => handleBlur("age")}
                className={`w-full p-3 border rounded-md ${
                  touched.age && errors.age 
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
              />
              {touched.age && errors.age && (
                <p className="text-red-500 text-sm mt-1">{errors.age}</p>
              )}
            </div>

            {/* Height Input */}
            <div>
              <input
                type="number"
                placeholder="Height (cm) *"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                onBlur={() => handleBlur("height")}
                className={`w-full p-3 border rounded-md ${
                  touched.height && errors.height 
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
              />
              {touched.height && errors.height && (
                <p className="text-red-500 text-sm mt-1">{errors.height}</p>
              )}
            </div>

            {/* Weight Input */}
            <div>
              <input
                type="number"
                placeholder="Weight (kg) *"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                onBlur={() => handleBlur("weight")}
                className={`w-full p-3 border rounded-md ${
                  touched.weight && errors.weight 
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
              />
              {touched.weight && errors.weight && (
                <p className="text-red-500 text-sm mt-1">{errors.weight}</p>
              )}
            </div>

            {/* Gender Select */}
            <div>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                onBlur={() => handleBlur("gender")}
                className={`w-full p-3 border rounded-md ${
                  touched.gender && errors.gender 
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
              >
                <option value="">Select Gender *</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {touched.gender && errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
              )}
            </div>

            {/* Activity Level Select */}
            <div>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                onBlur={() => handleBlur("activity")}
                className={`w-full p-3 border rounded-md ${
                  touched.activity && errors.activity 
                    ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                    : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                } focus:outline-none focus:ring-2`}
              >
                <option value="">Select Activity Level *</option>
                <option value="low">Sedentary / Low</option>
                <option value="mild">Lightly Active / Mildly Active</option>
                <option value="moderate">Moderately Active</option>
                <option value="veryactive">Very Active</option>
              </select>
              {touched.activity && errors.activity && (
                <p className="text-red-500 text-sm mt-1">{errors.activity}</p>
              )}
            </div>

            {activity && (
              <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-md mt-2 text-sm text-gray-800">
                <p className="font-semibold">{activityDescriptions[activity]?.title}</p>
                <p>{activityDescriptions[activity]?.description}</p>
              </div>
            )}

            {/* Form validation status */}
            {isFormValid() && (
              <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded-md mt-2 text-sm text-green-800">
                <p className="font-semibold">✅ All details are valid!</p>
                <p>You can now calculate your BMI and proceed to get your personalized diet plan.</p>
              </div>
            )}

            <button
              onClick={calculateBMI}
              className="w-full bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!height || !weight || errors.height || errors.weight}
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
                  className="w-full bg-green-500 text-white py-3 rounded-md mt-4 hover:bg-green-600 transition-colors duration-200"
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
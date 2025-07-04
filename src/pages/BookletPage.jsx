import React from "react";
import { useLocation } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";

const BookletPage = () => {
  const location = useLocation();
  const { bmi, gender, activity } = location.state || {};

  if (!bmi || !gender || !activity) {
    return (
      <div className="text-center text-red-600 font-bold mt-10">
        Please provide BMI, gender, and activity level.
      </div>
    );
  }

  const getBMICategory = () => {
    const numericBMI = parseFloat(bmi);
    if (numericBMI < 18.5) return "underweight";
    if (numericBMI >= 18.5 && numericBMI <= 24.9) return "normalweight";
    if (numericBMI >= 25 && numericBMI <= 29.9) return "overweight";
    if (numericBMI >= 30 && numericBMI <= 100) return "obese";
    return "invalid";
  };

  const folderName = `${getBMICategory()}-${gender}-${activity}`;
  
  // Ensure even number of pages to support proper two-page spread
  const totalPages = 12;

  const images = Array.from({ length: totalPages }, (_, i) => (
    `/assets/images/${folderName}/page${i + 1}.png`
  ));

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4 flex flex-col items-center">
      <h2 className="text-3xl font-extrabold text-pink-700 italic mb-4 text-center">
        Your Personalized Diet Booklet
      </h2>

      <p className="text-gray-600 text-sm italic mb-6 text-center">
        📖 Tap or click on the edges of the booklet to flip pages.
      </p>

      <div className="w-full max-w-[1300px] overflow-x-auto border border-pink-300 bg-white p-4 shadow-xl rounded-lg">
        <HTMLFlipBook
          width={600}
          height={600}
          size="stretch"
          minWidth={300}
          maxWidth={1200}
          minHeight={400}
          maxHeight={1000}
          showCover={true}
          showSpread={true}
          drawShadow={true}
          useMouseEvents={true}
          mobileScrollSupport={true}
          flippingTime={600}
          className="mx-auto min-w-[1200px]"
        >
          {images.map((src, index) => (
            <div key={index} className="page bg-white flex items-center justify-center">
              <img
                src={src}
                alt={`Page ${index + 1}`}
                className="w-full h-full object-contain"
                onError={(e) => (e.target.style.display = "none")}
              />
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default BookletPage;

import React from "react";
import HTMLFlipBook from "react-pageflip";

// Import images from your assets folder
import Monday from "../assets/images/Diet plan for underweight very active male (_18.5)/MONDAY.png";
import Tuesday from "../assets/images/Diet plan for underweight very active male (_18.5)/TUESDAY.png";
import Wednesday from "../assets/images/Diet plan for underweight very active male (_18.5)/WEDNESDAY.png";
import Thursday from "../assets/images/Diet plan for underweight very active male (_18.5)/THURSDAY.png";
import Friday from "../assets/images/Diet plan for underweight very active male (_18.5)/FRIDAY.png";
import Saturday from "../assets/images/Diet plan for underweight very active male (_18.5)/SATURDAY.png";
import Sunday from "../assets/images/Diet plan for underweight very active male (_18.5)/SUNDAY.png";

const BookletPage = () => {
  const images = [Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday];

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50">
      <HTMLFlipBook
        width={350}
        height={500}
        size="stretch"
        minWidth={300}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1200}
        maxShadowOpacity={0.5}
        showCover={true}
        className="shadow-xl"
      >
        <div className="page bg-white flex flex-col justify-center items-center text-center p-4">
          <h2 className="text-xl font-bold text-pink-700 mb-4">📖 Your Personalized Diet Booklet</h2>
          <p className="text-sm text-gray-700">Flip through to explore your weekly meal plan!</p>
        </div>

        {images.map((img, index) => (
          <div key={index} className="page bg-white flex justify-center items-center">
            <img
              src={img}
              alt={`Day ${index + 1}`}
              className="max-h-full max-w-full object-contain p-4"
            />
          </div>
        ))}
      </HTMLFlipBook>
    </div>
  );
};

export default BookletPage;

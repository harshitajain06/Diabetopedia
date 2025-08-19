import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";

const BookletPage = () => {
  const location = useLocation();
  const { bmi, gender, activity } = location.state || {};

  const [loadedCount, setLoadedCount] = useState(0);
  const totalPages = 12;

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

  // Image previews for flipbook
  const images = Array.from({ length: totalPages }, (_, i) => (
    `/assets/images/${folderName}/page${i + 1}.png`
  ));

  // Path to the pre-generated PDF
  const pdfPath = `/assets/pdfs/${folderName}.pdf`;

  const downloadPDF = () => {
    const link = document.createElement("a");
    link.href = pdfPath;
    link.download = `${folderName}-booklet.pdf`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4 flex flex-col items-center">
      <h2 className="text-3xl font-extrabold text-pink-700 italic mb-4 text-center">
        Your Personalized Diet Booklet
      </h2>

      <p className="text-gray-600 text-sm italic mb-6 text-center">
        📖 Tap or click on the edges of the booklet to flip pages.
      </p>

      {/* Show button only when images finish loading */}
      {loadedCount === totalPages ? (
        <div className="mb-6 flex flex-col items-center">
          <button
            onClick={downloadPDF}
            className="px-6 py-2 bg-pink-600 text-white rounded-lg shadow-md hover:bg-pink-700 transition"
          >
            📥 Download Booklet (PDF)
          </button>
        </div>
      ) : (
        <p className="mb-6 text-gray-500 italic">
          ⏳ Loading booklet… please wait
        </p>
      )}

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
            <div
              key={index}
              className="page bg-white flex items-center justify-center"
            >
              <img
                src={src}
                alt={`Page ${index + 1}`}
                className="w-full h-full object-contain"
                onLoad={() => setLoadedCount((prev) => prev + 1)}
                onError={(e) => {
                  e.target.style.display = "none";
                  setLoadedCount((prev) => prev + 1);
                }}
              />
            </div>
          ))}
        </HTMLFlipBook>
      </div>
    </div>
  );
};

export default BookletPage;

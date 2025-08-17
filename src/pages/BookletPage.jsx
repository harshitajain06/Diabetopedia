import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import HTMLFlipBook from "react-pageflip";
import jsPDF from "jspdf";

const BookletPage = () => {
  const location = useLocation();
  const { bmi, gender, activity } = location.state || {};

  const [loadedCount, setLoadedCount] = useState(0);
  const [validImages, setValidImages] = useState([]);
  const [downloading, setDownloading] = useState(false);
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

  const images = Array.from({ length: totalPages }, (_, i) => (
    `/assets/images/${folderName}/page${i + 1}.png`
  ));

  // Generate PDF from valid images only
  const generatePDF = async () => {
    if (validImages.length === 0) return;

    setDownloading(true); // show indication
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    for (let i = 0; i < validImages.length; i++) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = validImages[i];

      await new Promise((resolve, reject) => {
        img.onload = () => {
          const aspectRatio = img.width / img.height;
          let imgWidth = pageWidth;
          let imgHeight = pageWidth / aspectRatio;

          if (imgHeight > pageHeight) {
            imgHeight = pageHeight;
            imgWidth = pageHeight * aspectRatio;
          }

          const x = (pageWidth - imgWidth) / 2;
          const y = (pageHeight - imgHeight) / 2;

          pdf.addImage(img, "PNG", x, y, imgWidth, imgHeight);

          if (i < validImages.length - 1) pdf.addPage();
          resolve();
        };
        img.onerror = reject;
      });
    }

    pdf.save(`${folderName}-booklet.pdf`);
    setDownloading(false); // hide indication after done
  };

  return (
    <div className="min-h-screen bg-pink-50 py-10 px-4 flex flex-col items-center">
      <h2 className="text-3xl font-extrabold text-pink-700 italic mb-4 text-center">
        Your Personalized Diet Booklet
      </h2>

      <p className="text-gray-600 text-sm italic mb-6 text-center">
        📖 Tap or click on the edges of the booklet to flip pages.
      </p>

      {/* Show button only when all images are processed */}
      {loadedCount === totalPages ? (
        validImages.length > 0 ? (
          <div className="mb-6 flex flex-col items-center">
            <button
              onClick={generatePDF}
              disabled={downloading}
              className={`px-6 py-2 rounded-lg shadow-md transition ${
                downloading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-pink-600 text-white hover:bg-pink-700"
              }`}
            >
              {downloading ? "⏳ Generating PDF..." : "📥 Download Booklet (PDF)"}
            </button>
          </div>
        ) : (
          <p className="mb-6 text-red-500 font-semibold">
            ❌ No booklet pages found.
          </p>
        )
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
                onLoad={() => {
                  setLoadedCount((prev) => prev + 1);
                  setValidImages((prev) => [...prev, src]);
                }}
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

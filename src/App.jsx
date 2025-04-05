import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Welcome from "./pages/Welcome";
import FoodCategoriesPage from "./pages/FoodCategoriesPage";

function App() {
  return (
    <Router>
      <Header />

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/categories" element={<FoodCategoriesPage />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Result from "./pages/Result";
import BuyCredit from "./pages/BuyCredit";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={true} />

      <div className="bg-gray-100 min-h-screen flex flex-col">
        {/* Header */}
        <header>
          <Navbar />
        </header>

        {/* Main content */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/result" element={<Result />} />
            <Route path="/buy" element={<BuyCredit />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer>
          <Footer />
        </footer>
      </div>
    </>
  );
};

export default App;

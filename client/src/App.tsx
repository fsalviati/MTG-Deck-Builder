import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes";
import "./App.css";
import "./styles/variables.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <AppRoutes />
      <Footer />
    </div>
  );
}

export default App;

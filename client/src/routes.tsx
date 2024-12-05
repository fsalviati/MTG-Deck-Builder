import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import DeckBuilder from "./pages/DeckBuilder";
import MyDecks from "./pages/MyDecks";
import About from "./pages/About";
import PrivateRoute from "./components/PrivateRoute";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route
      path="/deck-builder"
      element={
        <PrivateRoute>
          <DeckBuilder />
        </PrivateRoute>
      }
    />
    <Route
      path="/my-decks"
      element={
        <PrivateRoute>
          <MyDecks />
        </PrivateRoute>
      }
    />
  </Routes>
);

export default AppRoutes;

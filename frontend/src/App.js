import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SingleWorkout from "./components/SingleWorkout";
import EditWorkout from "./components/EditWorkout";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout/:id" element={<SingleWorkout />} />
          <Route path="/edit-workout/:id" element={<EditWorkout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

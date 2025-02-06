import React from "react";
import AppRoutes from "/routes";
import NavBar from "./components/NavBar"; // Import the NavBar component

function App() {
  return (
    <div className="App">
      <NavBar /> {/* Display NavBar */}
      <AppRoutes />
    </div>
  );
}

export default App;
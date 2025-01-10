import { useState } from "react";

import "./App.css";
import NavBar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import DashboardOverview from "./components/dashboard/OverView";

function App() {
  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <NavBar />
        {/* Dashboard Overview - Ensure it's placed below the NavBar */}
        <DashboardOverview />
      </div>
    </div>
  );
}

export default App;

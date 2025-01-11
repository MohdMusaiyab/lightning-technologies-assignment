import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Sidebar from "./components/SideBar";
import DashboardOverview from "./components/dashboard/OverView";

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Overlay for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 lg:hidden z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static flex h-full transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          lg:translate-x-0 lg:flex bg-white w-64 z-20 shadow-lg`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-full lg:w-[calc(100%-16rem)]">
        {/* Navbar with toggle button */}
        <NavBar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <DashboardOverview />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
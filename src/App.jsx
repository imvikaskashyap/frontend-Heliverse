import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Users from "./pages/Users";
import Teams from "./pages/Teams";

function App() {
  return (
    <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80" />
        <div className="absolute inset-0 backdrop-blur-sm" />
      </div>

      <Sidebar />

      <div className="relative z-10 flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
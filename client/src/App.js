import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import './App.css';
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import AdminHome from "./pages/Admin/AdminHome";
import AdminBuses from "./pages/Admin/AdminBuses";
import AdminUsers from "./pages/Admin/AdminUsers";
function App() {
  const {Loading} = useSelector(state=>state.alerts)
  return <div>
   {Loading && <Loader/>}
    <BrowserRouter >
  {/* <Header /> */}
  <Routes>
    <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
    <Route path="/admin/home" element={<ProtectedRoute><AdminHome/></ProtectedRoute>}/>
    <Route path="/admin/buses" element={<ProtectedRoute><AdminBuses/></ProtectedRoute>}/>
    <Route path="/admin/users" element={<ProtectedRoute><AdminUsers/></ProtectedRoute>}/>
    <Route path="/Register" element={<PublicRoute><Register/></PublicRoute>}/>
    <Route path="/Login" element={<PublicRoute><Login/></PublicRoute>}/>
    
    </Routes>
    </BrowserRouter>
  </div>
}

export default App;

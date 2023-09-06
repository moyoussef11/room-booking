import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./website/pages/Home";
import Register from "./website/auth/Register";
import Login from "./website/auth/Login";
import DashBoard from "./website/dashboard/DashBoard";
import Users from "./website/dashboard/Users/Users";
import RoomReservations from "./website/dashboard/Rooms/RoomReservations";
import RequireAuth from "./website/auth/RequireAuth";
import RequireBack from "./website/auth/RequireBack";
import About from "./website/pages/About";
import Cities from "./website/dashboard/Cities/Cities";
import ShowCities from "./website/dashboard/Cities/ShowCities";
import UpdateCity from "./website/dashboard/Cities/UpdateCity";
import CreateRooms from "./website/dashboard/Rooms/CreateRooms";
import UpdateRoom from "./website/dashboard/Rooms/UpdateRoom";
import MoreDetails from "./website/dashboard/Rooms/MoreDetails";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/moreDetails/:id" element={<MoreDetails />} />
        <Route element={<RequireBack />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/dashboard" element={<DashBoard />}>
            <Route path="users" element={<Users />} />
            <Route path="cities" element={<Cities />} />
            <Route path="ShowCities/:id" element={<UpdateCity />} />
            <Route path="ShowCities" element={<ShowCities />} />
            <Route path="CreateRooms" element={<CreateRooms />} />
            <Route path="RoomReservations" element={<RoomReservations />} />
            <Route path="RoomReservations/:id" element={<UpdateRoom />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;

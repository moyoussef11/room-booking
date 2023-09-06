import React from "react";
import Cookie from "cookie-universal";
import { Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {


  const cookie = Cookie();
  const token = cookie.get("BookRooms");


return token? <Outlet />:<Navigate to={"/login"} replace={true} />
};

export default RequireAuth;


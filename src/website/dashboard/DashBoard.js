import React from 'react';
import TopBar from '../../components/dashboard/TopBar';
import SideBar from '../../components/dashboard/SideBar';
import { Outlet } from 'react-router-dom';
import './dashboard.css';
const DashBoard = () => {
  return (
    <>
      <TopBar />
        <div className="d-flex justify-content-between">
          <SideBar />
          <div className="outlet m-2">
            <Outlet />
          </div>
        </div>
    </>
  );
}

export default DashBoard;
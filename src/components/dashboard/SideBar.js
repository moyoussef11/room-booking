import { faBed, faCirclePlus, faCity,faPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { userContext } from '../../Context/UserContext';

const SideBar = () => {

  const user = useContext(userContext); 
  const [role, setRole] = useState(user.role);
  
  useEffect(() => {
    setRole(user.role);
  }, [user.role]);
  

    return (
      <>
        {role === 'admin' ?  <div className="SideBar pt-3">
          <NavLink
            to={"users"}
            className="d-flex align-items-center gap-2 side-link"
          >
            <FontAwesomeIcon icon={faUsers} />
            <p className="m-0">users</p>
          </NavLink>
          <NavLink
            to={"cities"}
            className="d-flex align-items-center gap-2 side-link"
          >
            <FontAwesomeIcon icon={faPlus} />
            <p className="m-0">AddCity</p>
          </NavLink>
          <NavLink
            to={"ShowCities"}
            className="d-flex align-items-center gap-2 side-link"
          >
            <FontAwesomeIcon icon={faCity} />
            <p className="m-0">ShowCities</p>
          </NavLink>
          <NavLink
            to={"CreateRooms"}
            className="d-flex align-items-center gap-2 side-link"
          >
            <FontAwesomeIcon icon={faCirclePlus} />
            <p className="m-0">CreateRooms</p>
          </NavLink>
          <NavLink
            to={"RoomReservations"}
            className="d-flex align-items-center gap-2 side-link"
          >
            <FontAwesomeIcon icon={faBed} />
            <p className="m-0">Rooms</p>
          </NavLink>
        </div>:  <div className="SideBar pt-3">
          <NavLink
            to={"ShowCities"}
            className="d-flex align-items-center gap-2 side-link"
          >
            <FontAwesomeIcon icon={faCity} />
            <p className="m-0">ShowCities</p>
          </NavLink>
          <NavLink
            to={"RoomReservations"}
            className="d-flex align-items-center gap-2 side-link"
          >
            <FontAwesomeIcon icon={faBed} />
            <p className="m-0">Rooms</p>
          </NavLink>
        </div>}
      </>
    );
}

export default SideBar;
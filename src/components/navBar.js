import React from "react";
import { NavLink } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

const NavBar = () => {
  const user = getCurrentUser();
  return (
    //Sidebar Holder
    <nav id="sidebar">
      <div className="sidebar-header">
        <h3>Car Hire</h3>
      </div>

      <ul className="list-unstyled components">
        <p>Hire Your Favourite Car</p>
        {/* <li className="active">
          <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Home</a>
          <ul className="collapse list-unstyled" id="homeSubmenu">
            <li className="nav-item">
              <NavLink className="nav-link" to="/movies">
                All Movies
              </NavLink>
            </li>
            <li>
              <a href="#">Home 2</a>
            </li>
            <li>
              <a href="#">Home 3</a>
            </li>
          </ul>
        </li> */}
          {/* <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Pages</a>
          <ul className="collapse list-unstyled" id="pageSubmenu">
            <li>
              <a href="#">Page 1</a>
            </li>
            <li>
              <a href="#">Page 2</a>
            </li>
            <li>
              <a href="#">Page 3</a>
            </li>
          </ul>
        </li>
        <li> */}
        <li className="nav-item">
          <NavLink className="nav-link" to="/movies">
            All Movies
              </NavLink>
        </li>
        <li>
          {user && user.isClient && (
            <NavLink to="/mymovies">
              My Movies
            </NavLink>
          )}
        </li>
        <li>
          {user && user.isSuperAdmin && (
            <NavLink className="nav-link" to="/customers">
              Customers
            </NavLink>
          )}
        </li>
        <li>
          {user && user.isSuperAdmin && (
            <NavLink className="nav-link" to="/rentals">
              Rentals
            </NavLink>
          )}
        </li>
        {user && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/profile">
                {user.isSuperAdmin ? "Admin" : "Profile"}
              </NavLink>
            </li>
        )}
        {/* <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Contact Us</a>
        </li> */}
      </ul>

      <ul className="list-unstyled CTAs">
        {!user ? (<><li>
          <NavLink to="/login" className="download">Sign In</NavLink>
        </li>
          <li>
            <NavLink to="/register" className="article">Create New Account</NavLink>
          </li></>) : (<li>
            <NavLink to="/logout" className="article">Log Out</NavLink>
          </li>)}
      </ul>
    </nav>

    // <nav className="navbar navbar-expand-md navbar-dark bg-dark">
    //   <Link className="navbar-brand" to="/">
    //     MovieApp
    //   </Link>
    //   <button
    //     className="navbar-toggler"
    //     type="button"
    //     data-toggle="collapse"
    //     data-target="#navbarNav"
    //     aria-controls="navbarNav"
    //     aria-expanded="false"
    //     aria-label="Toggle navigation"
    //   >
    //     <span className="navbar-toggler-icon"></span>
    //   </button>
    //   <div className="collapse navbar-collapse" id="navbarNav">
    //     <ul className="navbar-nav">

          // {!user && (
          //   <>
          //     <li className="nav-item">
          //       <NavLink className="nav-link" to="/login">
          //         Login
          //       </NavLink>
          //     </li>
          //     <li className="nav-item">
          //       <NavLink className="nav-link" to="/register">
          //         Register
          //       </NavLink>
          //     </li>
          //   </>
          // )}
    //     </ul>
    //   </div>
    // </nav>
  );
};

export default NavBar;

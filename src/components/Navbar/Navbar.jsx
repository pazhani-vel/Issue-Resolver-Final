import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.css";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = async () => {
    await logout();
    history.push("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">IssueSolver</Link>
      </div>
      {user && (
        <ul className="navbar-links">
          <li>
            <Link to="/userDashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/myissue">My Issues</Link>
          </li>
          <li>
            <Link to="/reportissuepage">Report Issue</Link>
          </li>
          <li>
            <Link to="/allissues">All Issues</Link>
          </li>
          <li>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </li>
        </ul>
      )}
      {!user && (
        <ul className="navbar-links">
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;

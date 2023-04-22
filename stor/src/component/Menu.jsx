import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import sce from "../images/SCE_logo.png";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Menu() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        {" "}
        <img style={{ width: 90 }} src={sce} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link to={"/products"} className="nav-link">
            מוצרים להשאלה
          </Link>
          <Link to={"/newloan"} className="nav-link">
            טופס להשאלה חדשה
          </Link>
          <Link to={"/myloan"} className="nav-link">
            השאלות שלי
          </Link>
          <Link to={"/history"} className="nav-link">
            הסטוריית השאלות
          </Link>
          <Link to={"/manager"} className="nav-link">
            {" "}
            מנהל{" "}
          </Link>
          <Link to={"/student"} className="nav-link">
            student{" "}
          </Link>
          <Link to={"/teacher"} className="nav-link">
            teacher{" "}
          </Link>
          <Link to={"/"} className="nav-link" onClick={handleLogout}>
            deconnect{" "}
          </Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

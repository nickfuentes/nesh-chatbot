import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="custom-nav">
      <div>
        <Link to={"/"} className="brand-logo left">
          <img
            className="responsive-img"
            style={{ width: "120px", marginLeft: "10px", marginTop: "8px" }}
            src="https://hellonesh.io/static/images/nesh.png"
            alt="nesh"
          ></img>
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li>
            <Link to={"/shop"}>Holder</Link>
          </li>
          <li>
            <Link to={"/about"}>Holder</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;

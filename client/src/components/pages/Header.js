import React from "react";

const Header = () => {
  return (
    <nav className="custom-nav">
      <div>
        <div className="left">
          <img
            className="responsive-img"
            style={{
              width: "120px",
              marginLeft: "2.2rem",
              marginTop: "1.2rem",
              cursor: "pointer"
            }}
            src="nesh.png"
            alt="nesh"
          ></img>
        </div>
      </div>
    </nav>
  );
};

export default Header;

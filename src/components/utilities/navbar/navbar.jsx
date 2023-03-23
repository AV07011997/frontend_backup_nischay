import React, { useState } from "react";
import "./navbar.css";
import { Dropdown, ButtonToolbar } from "rsuite";
import { FaSignOutAlt, FaCaretDown } from "react-icons/fa";
import { navBarValues } from "../constants/navbarvalues";
import "rsuite/dist/rsuite.min.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const NavBar = (radiovalue) => {
  var navigatevalue = radiovalue.radiovalue;
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
  };
  const handleclick = (item) => {
    if (item == "DOWNLOAD") {
      navigate(`/download/${navigatevalue}`);
    }
    if (item == "UPLOAD") {
      navigate(`/upload/${navigatevalue}`);
      console.log(item);
      console.log(radiovalue);
    }
    if (item == "BUREAU") {
      navigate(`/bureau/${navigatevalue}`);
    }
    if (item == "HOME") {
      navigate("/home");
    }
    console.log(item);
  };

  return (
    <div>
      <div className="body">
        <div className="navbarimage">
          <img src="/images/logo.png" id="navbarimage"></img>
        </div>
        <div id="gap"></div>

        <div className="title">
          <Dropdown
            id="dropdown"
            title={
              <div id="any">
                <img id="useravatar" src="/images/avatar.jpg"></img>
                <div id="quote">
                  <span id="welcome">Welcome,</span>
                  Dhurin
                </div>
              </div>
            }
          >
            <Dropdown.Item className="item" onClick={logout}>
              <FaSignOutAlt style={{ color: "red" }}></FaSignOutAlt>LOGOUT
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <div className="body2">
        <div className="container">
          {Object.keys(navBarValues).map((item) => {
            if (item === "ANALYZE") {
              return (
                <div id="a1" key={item}>
                  <Dropdown
                    id="a2"
                    title={
                      <div>
                        <a href="#" className="tags">
                          <div className="image">
                            <img
                              id="home"
                              className="imgg"
                              src={navBarValues[item]}
                            ></img>
                          </div>
                          <div className="text">{item}</div>
                        </a>
                        <div className="gapp"></div>
                      </div>
                    }
                  >
                    <Dropdown.Menu title="BUREAU">
                      <Dropdown.Item>
                        <a>Summary</a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a>Month-wise</a>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                    <Dropdown.Menu title="BANK">
                      <Dropdown.Item>
                        <a>Summary</a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a>Month-wise</a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a>Counterparties</a>
                      </Dropdown.Item>
                      <Dropdown.Item>
                        <a>Statement</a>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <div id="a3"></div>
                </div>
              );
            } else {
              return (
                <div key={item}>
                  <a
                    href="#"
                    className="tags"
                    onClick={() => {
                      handleclick(item);
                    }}
                  >
                    <div className="image">
                      <img
                        id="home"
                        className="imgg"
                        src={navBarValues[item]}
                      ></img>
                    </div>
                    <div className="text">{item}</div>
                  </a>
                  <div className="gapp"></div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};
export default NavBar;

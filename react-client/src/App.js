import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
//
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./App.css";
//

import ViewEmergencyAlerts from "./components/ViewEmergencyAlerts";

import DailyInfoHistory from "./components/DailyInfoHistory";
import DailyInfo from "./components/DailyInfo";
import VitalHistoryView from "./components/VitalHistoryView";
import VitalHistory from "./components/VitalHistory";
import VitalSigns from "./components/VitalSigns";
import RegisterUser from "./components/RegisterUser";
import SendEmergencyAlert from "./components/SendEmergencyAlert";
import Login from "./components/Login";
import Home from "./components/Home";

//
function App() {
  const [screen, setScreen] = useState("auth");
  const [role, setRole] = useState("auth");

  const readCookie = async () => {
    try {
      const res = await axios.get("/api/read_cookie");

      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
      }

      if (res.data.role !== undefined) {
        setRole(res.data.role);
      }
    } catch (e) {
      setScreen("auth");
      setRole("auth");
      console.log(e);
    }
  };

  useEffect(() => {
    readCookie();
  }, []);

  return (
    <Router>
      <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/registerUser">Register</Nav.Link>
            <Nav.Link href="/sendEmergencyAlert">Send Emergency Alert</Nav.Link>
            <Nav.Link href="/viewEmergencyAlerts">View Emergency Alerts</Nav.Link>
            <Nav.Link href="/vitalSigns">Add Vital Signs</Nav.Link>
            <Nav.Link href="/vitalHistory">Vital History</Nav.Link>
            <Nav.Link href="/dailyInfo">Add Daily Info</Nav.Link>
            <Nav.Link href="/dailyInfoHistory">Daily Info History</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div>
        <Route render={() => <Home />} path="/home" />
        <Route render={() => <Login />} path="/login" />
        <Route render={() => <RegisterUser />} path="/registerUser" />
        <Route render={() => <SendEmergencyAlert />} path="/sendEmergencyAlert" />
        <Route render={() => <ViewEmergencyAlerts />} path="/viewEmergencyAlerts" />

        {screen !== "auth" && role === "nurse" ? (
          <React.Fragment>
            <Route render={() => <VitalSigns />} path="/vitalSigns" />
            <Route render={() => <VitalHistory />} path="/vitalHistory" />
            <Route render={() => <VitalHistoryView />} path="/vitalHistoryView/:id" />
          </React.Fragment>
        ) : (
            <React.Fragment>
              <Route render={() => <Login />} path="/vitalSigns" />
              <Route render={() => <Login />} path="/vitalHistory" />
              <Route render={() => <Login />} path="/vitalHistoryView/:id" />
            </React.Fragment>
          )}
        {screen !== "auth" && role === "patient" ? (
          <React.Fragment>
            <Route render={() => <DailyInfo />} path="/dailyInfo" />
            <Route render={() => <DailyInfoHistory />} path="/dailyInfoHistory" />
          </React.Fragment>
        ) : (
            <React.Fragment>
              <Route render={() => <Login />} path="/dailyInfo" />
              <Route render={() => <Login />} path="/dailyInfoHistory" />
            </React.Fragment>
          )}
      </div>
    </Router>
  );
}
//<Route render ={()=> < App />} path="/" />
export default App;

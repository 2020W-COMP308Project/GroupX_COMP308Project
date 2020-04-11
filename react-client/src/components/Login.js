import React, { useState, useEffect } from "react";
//import ReactDOM from 'react-dom';
import axios from "axios";
//
import View from "./View";
import List from "./List";
//
function App() {
  //state variable for the screen, admin or user
  const [screen, setScreen] = useState("auth");
  //store input field data, user name and password
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const apiUrl = "http://localhost:3000/api/signin";
  //send username and password to the server
  // for initial authentication
  const auth = async () => {
    console.log("calling auth");
    try {
      //call api
      let loginData = { username, password };
      const res = await axios.post(apiUrl, loginData);
      //process the response
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) {
      //print the error
      console.log(e);
    }
  };

  //check if the user already logged-in
  const readCookie = async () => {
    try {
      console.log("--- in readCookie function ---");
      //
      const res = await axios.get("/read_cookie");
      //
      if (res.data.screen !== undefined) {
        setScreen(res.data.screen);
        console.log(res.data.screen);
      }
    } catch (e) {
      setScreen("auth");
      console.log(e);
    }
  };
  //runs the first time the view is rendered
  //to check if user is signed in
  useEffect(() => {
    readCookie();
  }, []); //only the first render
  //
  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="col-6 div-style ">
        <div className="bg-danger text-light title">
          <h2 className="text-center">User Login</h2>
        </div>
        {screen === "auth" ? (
          <div className="container-fluid margins bg-light">
            <div className="form-group">
              <label>User name: </label>
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label>Password: </label>
              <br />
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="form-group text-center">
              <button
                onClick={auth}
                className="btn btn-outline-danger margin-bottom col-6 "
              >
                Login
              </button>
            </div>
          </div>
        ) : (
          <View screen={screen} setScreen={setScreen} />
        )}
      </div>
    </div>
  );
}

export default App;

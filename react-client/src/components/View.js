import RegisterUser from "./RegisterUser";
import List from "./List";
import React, { useState } from "react";

//
import axios from "axios";
//
function View(props) {
  // read the info from props, coming from the ancestor component
  const { screen, setScreen } = props;

  // return a stateful value and funcion to update it
  const [data, setData] = useState();
  //
  const [user, setUser] = useState("");
  //
  // called when user clicks on Logout button
  // to clear the cookie and set the screen state variable
  // back to its initial state.
  const deleteCookie = async () => {
    try {
      await axios.get("/api/signout");
      setScreen("auth");
      props.rerender();

    } catch (e) {
      console.log(e);
    }
  };

  // called when user clicks on Get Data button
  // end-point demonstrates another example for the use
  // of cookie specific response from the server.
  const getData = async () => {
    try {
      const res = await axios.get("/api/welcome");
      console.log(res.data);
      setData(res.data);
    } catch (e) {
      console.log(e);
    }
  };
  //
  const createUser = () => {
    console.log("in createUser");
    setUser("y");
  };

  return (
    <div className="container-fluid ">
        <div className="col-12 ">
            {user !== "y" ? (
                <div className="App margins">
                    <p>{screen}</p>
                    <div className="btn-group margin-bottom" role="group">
                    <button
                        onClick={deleteCookie}
                        className="btn btn-danger margins"
                        type="button"
                    >
                        Log out
                    </button>
                    </div>
                </div>
            ) : (
                <RegisterUser screen={screen} setScreen={setScreen} />
            )}
        </div>
         {<List screen={screen} setScreen={setScreen} /> }
    </div>
  );
}

//
export default View;

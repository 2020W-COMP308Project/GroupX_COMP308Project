import React, { useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function RegisterUser(props) {
  const [user, setUser] = useState({
    _id: "",
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    role: "",
    lastLoggedIn: "",
    verified: "",
    created: "",
  });
  const [showLoading, setShowLoading] = useState(false);
  const apiUrl = "http://localhost:3000/api/signup";

  const saveUser = (e) => {
    setShowLoading(true);
    e.preventDefault();
    const data = {
      username: user.username,
      firstName: user.firstName.toUpperCase(),
      lastName: user.lastName.toUpperCase(),
      role: user.role,
      lastLoggedIn: user.lastLoggedIn,
      password: user.password,
      verified: user.verified,
      created: user.created,
    };
    axios
      .post(apiUrl, data)
      .then((result) => {
        setShowLoading(false);
        props.history.push("/login");
      })
      .catch((error) => setShowLoading(false));
  };

  const onChange = (e) => {
   e.persist();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid  d-flex justify-content-center">
      <div className="col-6 div-style">
        <div className="bg-danger text-light title">
          {" "}
          <h2 className="h2-style">User Sign up</h2>
        </div>

        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <div className="container-fluid margins">
          <Jumbotron className="bg-light">
            <Form onSubmit={saveUser}>
              <Form.Group>
                <Form.Label> First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Enter first name"
                  value={user.firstName}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label> Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Enter last name."
                  value={user.lastName}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>User name</Form.Label>
                <Form.Control
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Enter a user name."
                  value={user.username}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password </Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter password."
                  value={user.password}
                  onChange={onChange}
                />
                <Form.Group>
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    type="text"
                    name="role"
                    id="role"
                    placeholder="Enter either patient or nurse."
                    value={user.role}
                    onChange={onChange}
                  />
                </Form.Group>
              </Form.Group>
              <div className="text-center">
                <Button variant="outline-danger col-6" type="submit">
                  Save
                </Button>
              </div>
            </Form>
          </Jumbotron>
        </div>
      </div>
    </div>
  );
}

export default withRouter(RegisterUser);

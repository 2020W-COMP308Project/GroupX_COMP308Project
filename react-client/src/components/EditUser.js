import React, { useState, useEffect } from "react";
import axios from "axios";
import {Jumbotron,Spinner,Button,Form,ButtonToolbar,ButtonGroup} from "react-bootstrap";
import { withRouter } from "react-router-dom";

function EditUser(props) {
    const [user, setUser] = useState({
        _id: "",
        username:"",
        firstName: "",
        lastName: "",
        password: "",
        role:"",
        lastLoggedIn: "",
        verified: "",
        created: "",
    });
    const [showLoading, setShowLoading] = useState(true);
    const [userRole, setUserRole] = useState();
    const apiUrl = "http://localhost:3000/users/" + props.match.params.id;
    //runs only once after the first render
    useEffect(() => {
        setShowLoading(false);
        //call api
        const fetchData = async () => {
            const result = await axios(apiUrl);
            setUser(result.data);
            console.log(result.data);
            setShowLoading(false);
        };

        fetchData();
    }, []);

    const updateUser = e => {
        setShowLoading(true);
        e.preventDefault();
        const data = {
            username: user.username,
            firstName: user.firstName.toUpperCase(),
            lastName: user.lastName.toUpperCase(),
            password: user.password,
            role: userRole,
            lastLoggedIn: user.lastLoggedIn,
            password: user.password,
            verified: user.verified,
            created: user.created,
        };
        axios
            .put(apiUrl, data)
            .then(result => {
                setShowLoading(false);
                props.history.push("/show/" + result.data._id);
            })
            .catch(error => setShowLoading(false));
    };
    //runs when user enters a field
    const onChange = e => {
        e.persist();
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    return (
        <div className="container col-6 ">
            <div className="span12 div-style bg-danger radius p-10">
                <h2 className="h3-style text-center bg-danger text-light radius">Edit User</h2>
                {showLoading && (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )}
                <Jumbotron>
                    <Form onSubmit={updateUser}>
                        <Form.Group>
                            <Form.Label> User name</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                id="username"
                                value={user.username}
                                disabled
                            />
                        </Form.Group>
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
                                placeholder="Enter last name"
                                value={user.lastName}
                                onChange={onChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <ButtonToolbar aria-label="buttons for role">
                                <Form.Label>Role</Form.Label>
                                <div className="margins-left">
                                    <ButtonGroup className="mr-4" aria-label="role" required name="role" id="role" value={user.role}>
                                        <Button variant="outline-success" name="role" id="role" onClick={e => setUserRole("nurse")} value={user.role}> Nurse</Button>
                                        <Button variant="outline-danger" name="role" id="role" onClick={e => setUserRole("patient")} value={user.role}>Patient</Button>
                                    </ButtonGroup>
                                </div>

                            </ButtonToolbar>
                        </Form.Group>
                        <div className="text-center">
                            <Button variant="outline-danger col-6" type="submit">
                                Update
            </Button>
</div>
                       
                    </Form>
                </Jumbotron>
            </div>
        </div>
    );
}

export default withRouter(EditUser);

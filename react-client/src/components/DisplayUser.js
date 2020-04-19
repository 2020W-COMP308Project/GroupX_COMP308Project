import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import { withRouter } from "react-router-dom";

function DisplayUser(props) {
    const [data, setData] = useState({});
    const [showLoading, setShowLoading] = useState(true);
    const apiUrl = "http://localhost:3000/users/" + props.match.params.id;

    // courselist

    useEffect(() => {
        setShowLoading(false);
        // setShowCourseLoading(false);
        const fetchData = async () => {
            const result = await axios(apiUrl);
            setData(result.data);
            setShowLoading(false);
        };

        fetchData();
    }, []);

    const editUser = id => {
        props.history.push({
            pathname: "/edit/" + id
        });
    };
    const usersList = () => {
        props.history.push({
            pathname: "/login"
        });
    };
    const deleteUser = id => {
        setShowLoading(true);
        const user = {
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            password: data.password,
             role:data.role,
        };

        axios
            .delete(apiUrl, user)
            .then(result => {
                setShowLoading(false);
                props.history.push("/login");
            })
            .catch(error => setShowLoading(false));
    };

    return (
        <div className="container col-6">
            <div className="span12 div-style margins bg-danger p-10 radius"> 
                <h2 className="h3-style text-center bg-danger text-light">User Detail</h2>
                {showLoading &&(
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )}
                <Jumbotron>
                    <h3>
                        Name: {data.firstName}, {data.lastName}
                    </h3>
                    <p className="p-font">Role: {data.role}</p>
                    <p className="p-font">User name: {data.username}</p>
                    <p>
                       
            <Button
                            type="button"
                            variant="outline-primary    "
                            onClick={() => {
                                usersList();
                            }}
                        >
                            Users List
            </Button>
 &nbsp;
                        <Button
                            type="button"
                            variant="outline-info"
                            onClick={() => {
                                editUser(data._id);
                            }}
                        >
                            Edit User
            </Button>
            &nbsp;
            <Button
                            type="button"
                            variant="outline-danger"
                            onClick={() => {
                                deleteUser(data._id);
                            }}
                        >
                            Delete
            </Button>

                    </p>
                </Jumbotron>
            </div>
        </div>
    );
}

export default withRouter(DisplayUser);

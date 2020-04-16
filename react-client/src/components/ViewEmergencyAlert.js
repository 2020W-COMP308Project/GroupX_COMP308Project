import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Jumbotron, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function ViewEmergencyAlert(props) {
    // patient list
    const [dataPatients, setPatientData] = useState([]);
    const apiUrlPatient = "http://localhost:3000/patients";
    // alert
    const [data, setData] = useState([]);
    const apiUrl = "http://localhost:3000/api/alert/" + props.match.params.id;

    // loading
    const [showLoading, setShowLoading] = useState(true);
    const [showError, setShowError] = useState(false);


    useEffect(() => {
        setShowLoading(false);
        const fetchData = async () => {
            // call patient api
            const resultPatient = await axios(apiUrlPatient);
            console.log(resultPatient.data);
            setPatientData(resultPatient.data);

            // call alert api
            const result = await axios(apiUrl);
            console.log(result.data);
            setData(result.data);

            // loading ends
            setShowLoading(false);
        };

        fetchData();
    }, []);



    //
    const displayEmergencyAlertTable = data.map((item, idx) => {
        let patient = dataPatients.find(i => i._id === item.owner);

        let alert = {
            patientName: patient.firstName + " " + patient.lastName,
            message: item.message,
            created: String(item.created).replace('T', ' ').slice(0, 19),
            hasRed: item.hasRead,
        }

        return (
            <tr key={idx}
                onClick={() => {
                    showDetail(alert._id);
                }}>
                <td>{alert.created}</td>
                <td>{alert.patientName}</td>
                <td>{alert.message}</td>
                <td>{alert.hasRead ? ("true") : ("false")}</td>
            </tr>
        );
    })

    const showDetail = id => {
        props.history.push({
            pathname: "/viewEmergencyAlert/" + id
        });
    };

    return (

        <div className="container-fluid  d-flex justify-content-center">
            <div className="col-6 div-style">
                <div className="bg-danger text-light title">
                    {" "}
                    <h2 className="h2-style">Emegency Alert List</h2>
                </div>
                <br />

                {showLoading && (
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                )}

                <div className="container-fluid margins">
                    {showError && (
                        <span>
                            There is something wrong...
                        </span>
                    )}
                    <Jumbotron className="bg-light">
                        <Form>
                            <Form.Group>
                                <Form.Label className="font-weight-bold">
                                    Date
                                </Form.Label>
                                <Form.Control
                                    as="text"
                                    rows="10"
                                    name="created"
                                    id="created"
                                    className="textarea"
                                    value={data.created}
                                    readonly
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="font-weight-bold">
                                    Message
                                </Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows="10"
                                    name="message"
                                    id="message"
                                    className="textarea"
                                    value={data.message}
                                    readonly
                                />
                            </Form.Group>

                            <div className="text-center">
                                <a className="outline-danger col-6" href="/viewEmergencyAlerts">View Alert List</a>
                            </div>


                        </Form>
                    </Jumbotron>



                </div>
            </div>
        </div>
    );

}

export default withRouter(ViewEmergencyAlert);

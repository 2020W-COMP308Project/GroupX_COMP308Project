import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner, Jumbotron, Form, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function DailyInfo(props) {
    const [screen, setScreen] = useState("auth");

    const readCookie = async () => {
        try {
            const res = await axios.get("/api/read_cookie");

            if (res.data.screen !== undefined) {
                setScreen(res.data.screen);
            }
        } catch (e) {
            setScreen("auth");
            console.log(e);
        }
    };

    useEffect(() => {
        readCookie();
    }, []);

    let patientId = screen;

    const [dailyInfo, setDailyInfo] = useState({
        _id: "",
        pulseRate: "",
        bloodPressure: "",
        weight: "",
        temperature: "",
        respiratoryRate: "",
        lastModified: "",
        owner: "",
        created: "",
    });

    const [showLoading, setShowLoading] = useState(false);
    const [showError, setShowError] = useState(false);

    const apiUrl = "http://localhost:3000/api/dailyInfo/create";

    const saveDailyInfo = (e) => {
        setShowLoading(true);
        let currDateTime = new Date();
        e.preventDefault();
        const data = {
            pulseRate: dailyInfo.pulseRate,
            bloodPressure: dailyInfo.bloodPressure,
            weight: dailyInfo.weight,
            temperature: dailyInfo.temperature,
            respiratoryRate: dailyInfo.respiratoryRate,
            lastModified: currDateTime,
            owner: patientId,
            created: currDateTime
        };

        axios
        .post(apiUrl, data)
        .then((result) => {
            setShowLoading(false);
            if (result.data.screen === "error") {
                setShowError(true);
                console.log("error: " + showError);
            } else {
                props.history.push("/home");
            }
        })
        .catch((error) => setShowLoading(false));
    };

    const onChange = (e) => {
        e.persist();
        setDailyInfo({ ...dailyInfo, [e.target.name]: e.target.value });
    };

    return (
        <div className="container-fluid col-12 div-right">
            <div className="span12 div-style">
                <div className="bg-danger text-light title">
                    {" "}
                    <h2 className="h2-style">Add My Daily Info</h2>
                </div>

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
                        <Form onSubmit={saveDailyInfo}>
                            <Form.Group>
                                <Form.Label>Pulse Rate</Form.Label>
                                <Form.Control
                                type="number"
                                name="pulseRate"
                                id="pulseRate"
                                placeholder="Enter pulse rate"
                                value={dailyInfo.pulseRate}
                                onChange={onChange}
                                required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Blood Pressure</Form.Label>
                                <Form.Control
                                type="number"
                                name="bloodPressure"
                                id="bloodPressure"
                                placeholder="Enter a blood pressure."
                                value={dailyInfo.bloodPressure}
                                onChange={onChange}
                                required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Weight</Form.Label>
                                <Form.Control
                                type="number"
                                name="weight"
                                id="weight"
                                placeholder="Enter a weight."
                                value={dailyInfo.weight}
                                onChange={onChange}
                                required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Temperature</Form.Label>
                                <Form.Control
                                type="number"
                                name="temperature"
                                id="temperature"
                                placeholder="Enter a temperature."
                                value={dailyInfo.temperature}
                                onChange={onChange}
                                required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Respiratory Rate</Form.Label>
                                <Form.Control
                                type="number"
                                name="respiratoryRate"
                                id="respiratoryRate"
                                placeholder="Enter respiratory rate."
                                value={dailyInfo.respiratoryRate}
                                onChange={onChange}
                                required
                                />
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

export default withRouter(DailyInfo);
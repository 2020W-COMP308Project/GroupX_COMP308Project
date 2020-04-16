import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function ViewEmergencyAlerts(props) {
    // patient list
    const [dataPatients, setPatientsData] = useState([]);
    const apiUrlPatients = "http://localhost:3000/patients";
    // alert list
    const [data, setData] = useState([]);
    const apiUrl = "http://localhost:3000/api/alerts";
    // loading
    const [showLoading, setShowLoading] = useState(true);
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        setShowLoading(false);
        const fetchData = async () => {
            // call patient api
            const resultPatients = await axios(apiUrlPatients);
            console.log(resultPatients.data);
            setPatientsData(resultPatients.data);

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
            _id: item._id,
            patientName: patient.firstName + " " + patient.lastName,
            message: item.message,
            created: String(item.created).replace('T', ' ').slice(0, 19),
            hasRed: item.hasRead,
        }

        console.log("????:" + alert._id);
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
        <div className="container-fluid col-12 justify-content-center">
            <div className="span12 div-style">
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

                    <div className="mb-20">
                        <table className="table table-primary">
                            <thead className="thead-dark">
                                <tr>
                                    <th>Date</th>
                                    <th>Patient Name</th>
                                    <th>Messsage</th>
                                    <th>Read</th>
                                </tr>
                            </thead>
                            <tbody className="tr">{displayEmergencyAlertTable}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default withRouter(ViewEmergencyAlerts);

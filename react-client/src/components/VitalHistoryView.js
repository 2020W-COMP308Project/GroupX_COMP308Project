import React, { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "react-bootstrap";
import { withRouter } from "react-router-dom";

function VitalHistoryView(props) {
    const [data, setData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const [showError, setShowError] = useState(false);
    const apiUrl = "http://localhost:3000/api/clinicalVisits";
    const patientId =  props.match.params.id;

    useEffect(() => {
        setShowLoading(false);
        const fetchData = async () => {
            const result = await axios(apiUrl);
            setData(result.data);
            setShowLoading(false);
        };

        fetchData();
    }, []);

    let array = [];

    data.map(item => {
        if (item.patient === patientId) {
            array.push(item);
            return item;
        }
    });

    const displayAllVitalHistoryTable = array.map((vital, idx) => {
        return (
            <tr key={idx}>
                <td>{vital.bodyTemperature}</td>
                <td>{vital.heartRate}</td>
                <td>{vital.bloodPressure}</td>
                <td>{vital.respiratoryRate}</td>
                <td>{vital.created}</td>
            </tr>
        );
    });

    return (
        <div className="container-fluid col-12 justify-content-center">
            <div className="span12 div-style">
                <div className="bg-danger text-light title">
                {" "}
                <h2 className="h2-style">Patient Vital History</h2>
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
                                <th>Body Temperature</th>
                                <th>Heart Rate</th>
                                <th>Blood Pressure</th>
                                <th>Repository Rate</th>
                                <th>Date</th>
                            </tr>
                            </thead>
                            <tbody className="tr">{displayAllVitalHistoryTable}</tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default withRouter(VitalHistoryView);

import React, { useState, useEffect } from "react";
import axios from "axios";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import { withRouter } from "react-router-dom";

function List(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  const apiUrl = "http://localhost:3000/users";

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(apiUrl);
      setData(result.data);
      setShowLoading(false);
    };

    fetchData();
  }, []);

  const showDetail = (id) => {
    props.history.push({
      pathname: "/show/" + id,
    });
  };

  return (
    <div className="container">
      <div className="span12 div-style">
        <h2 className="h2-style">List Of Users</h2>
        {showLoading && (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
        <h5 class="paddings">Click on user to see user details.</h5>
        <ListGroup>
          {data.map((item, idx) => (
            <ListGroup.Item
              key={idx}
              action
              onClick={() => {
                showDetail(item._id);
              }}
            >
              {"User name:  =>" +
                item.username +
                ", First name=> " +
                item.firstName +
                ", Last Name=> " +
                item.lastName +
                ", Role=> " +
                item.role}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default withRouter(List);

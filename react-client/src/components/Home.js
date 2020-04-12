import { withRouter } from "react-router-dom";

import React from "react";

function Home(props) {
    return (
        <div className="container">
            <div className="span12 div-style">
                <h2 className="h2-style"> Centennial College Nurse Patient App</h2>
                <p className="p-style">
                    React front-end calls Express REST API.
        </p>
            </div>
        </div>
    );
}

export default withRouter(Home);

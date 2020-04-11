import { withRouter } from "react-router-dom";

import React from "react";

function Home(props) {
    return (
        <div className="container">
            <div className="span12 div-style">
                <h2 className="h2-style"> Centennial College Student Course App</h2>
                <p className="p-style">
                    React front-end calls Express REST API to add, list, update, or delete
                    a user, create a course etc.
        </p>
            </div>
        </div>
    );
}

export default withRouter(Home);

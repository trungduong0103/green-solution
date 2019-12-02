import React from 'react';
import NavBar from "../NavBar";

export default class CleanUpDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return(
            <div>
                <NavBar/>
                <h3>Detail Location {this.props.match.params.id}</h3>
            </div>
        )
    }
}

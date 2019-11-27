import React from 'react';


export default class CleanUpDetail extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div>
                <h3>Detail Location {this.props.match.params.id}</h3>
            </div>
        )
    }
}

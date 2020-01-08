import React from "react";
import {compose, withProps} from "recompose";
import {REACT_APP_GOOGLE_KEY} from "../../../environments/Keys";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import markerLogo from "../../../assets/imgs/marker.png";

export const CleanUpDetailMap = compose(
    withProps(props => {
        return {
            googleMapURL: `${REACT_APP_GOOGLE_KEY}`,
            loadingElement: <div style={{height: `100%`}}/>,
            containerElement: <div style={{height: `100%`}}/>,
            mapElement: <div style={{height: `100%`}}/>
        }

    }),
    withScriptjs,
    withGoogleMap
)(props =>
    <GoogleMap defaultZoom={15} center={props.center}>
        <Marker
            icon={{url: markerLogo, scaledSize: {width: 45, height: 45}}}
            position={props.center}
        />
    </GoogleMap>
);

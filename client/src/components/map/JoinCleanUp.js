import React, {Component, useState} from 'react';
import {GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs} from "react-google-maps"
import {REACT_APP_GOOGLE_KEY} from "../../environments/Enviroments";
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import {Link} from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import NavBar from "../NavBar";
import withStyles from "@material-ui/core/styles/withStyles";


const data = [
    {
        name: "Ton Duc Thang University",
        lat: 10.732629,
        lng: 106.699156,
        id: 1
    },
    {
        name: "Civil Police University",
        lat: 10.733936,
        lng: 106.697933,
        id: 2
    },
    {
        name: "RMIT University Vietnam",
        lat: 10.729793,
        lng: 106.693759,
        id: 3
    }
];


const styles = {
    mapContainer: {
        width: "50vw",
        height: "50vh",
        top: "30%",
        left: "20%"
    }
};


function Map() {
    const [selectedLocation, setSelectedLocation] = useState(null);
    return (
        <GoogleMap
            defaultZoom={6}
            defaultCenter={{lat: 15.308913, lng: 107.993648}}
        >
            <MarkerClusterer
                averageCenter
                enableRetinaIcons
                gridSize={60}
            >
                {data.map(item => (
                    <Marker
                        key={item.id}
                        name={item.name}
                        position={{
                            lat: item.lat,
                            lng: item.lng
                        }}
                        onClick={() => {
                            setSelectedLocation(item)
                        }}
                    >

                    </Marker>
                ))}
            </MarkerClusterer>

            {selectedLocation && (
                <InfoWindow
                    onCloseClick={() => {
                        setSelectedLocation(null);
                    }}
                    position={{
                        lat: selectedLocation.lat,
                        lng: selectedLocation.lng
                    }}
                >
                    <div style={{
                        textAlign: "center"
                    }}>
                        <h5>{selectedLocation.name}</h5>
                        <Link to={`/DetailLocation/${selectedLocation.id}`}>Detail</Link>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    )
}

const MapWrapped = withScriptjs((withGoogleMap(Map)));

class JoinCleanUp extends Component {

    render() {
        const {classes} = this.props;
        return (
            <div>
                <NavBar/>
                <Grid container>
                    <Grid item className={classes.mapContainer}>

                        <MapWrapped
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
                                REACT_APP_GOOGLE_KEY
                                }`}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `100%` }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                    </Grid>
                </Grid>

            </div>

        )
    }
}

export default withStyles(styles)(JoinCleanUp);





import React, {Component, useState} from 'react';
import {GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import SearchBox from "react-google-maps/lib/components/places/SearchBox"
import {Link} from "react-router-dom"
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import NavBar from "../NavBar";
import withStyles from "@material-ui/core/styles/withStyles";
import _ from "lodash"
import { compose, withProps, lifecycle, withHandlers, withStateHandlers} from "recompose";

const REACT_APP_GOOGLE_KEY = "AIzaSyCYNKAOTtJlvMv3_gteqJOVoaQAS2k7N-A";


const styles = {
    mapContainer: {
        position: "absolute",
        width: "50vw",
        height: "50vh",
        top: "30%",
        left: "5%",
        boxShadow: "0 10px 20px rgba(0,0,0,0.25)"
    },
    text: {
        position: "absolute",
        top: "23%",
        left: "13%",
        fontFamily:"'Quicksand', sans-serif;",
        fontSize: 30,

    }
};
const Map = compose (

    withProps({
        // googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_KEY}&v=3.exp&libraries=geometry,drawing,places`,
        googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
            REACT_APP_GOOGLE_KEY}`,
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `100%` }} />,
        mapElement: <div style={{ height: `100%` }} />
    }),
    withHandlers({
        onMarkerClusterClick: () => (markerClusterer) => {
            const clickedMarkers = markerClusterer.getMarkers();
            console.log(`Current clicked markers length: ${clickedMarkers.length}`);
            console.log(clickedMarkers)
        },

    }),

    withStateHandlers(() => ({
        isOpen: false,
        markerIndex: 0
    }), {
        onToggleOpen: ({ isOpen }) => (index) => ({
            isOpen: !isOpen,
            markerIndex: index
        }),


    }),

    lifecycle({

        componentWillMount() {
            const refs = {};

            this.setState({
                bounds: null,
                center: {
                    lat: 10.812675, lng: 106.656734
                },


                // onMapMounted: ref => {
                //     refs.map = ref;
                // },
                // onBoundsChanged: () => {
                //     this.setState({
                //         bounds: refs.map.getBounds(),
                //         center: refs.map.getCenter(),
                //     })
                // },

                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },
                onPlacesChanged: () => {
                    const places = refs.searchBox.getPlaces();
                    const bounds = new window.google.maps.LatLngBounds();

                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport)
                        } else {
                            bounds.extend(place.geometry.location)
                        }
                    });
                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location,
                    }));
                    const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

                    this.setState({
                        center: nextCenter,
                        markers: nextMarkers,
                    });
                    // refs.map.fitBounds(bounds);
                },
            })
        }
    }),
    withScriptjs,
    withGoogleMap,
)(props =>
    <GoogleMap
        // ref={props.onMapMounted}
        defaultZoom={11}
        center={props.center}

        // onBoundsChanged={props.onBoundsChanged}
    >

        <SearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            controlPosition={window.google.maps.ControlPosition.TOP_CENTER}
            onPlacesChanged={props.onPlacesChanged}
        >
            <input
                type="text"
                placeholder="Nhập tỉnh thành bạn muốn tìm"
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `40px`,
                    marginTop: `12px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                }}
            />
        </SearchBox>


        <MarkerClusterer
            onClick={props.onMarkerClusterClick}
            averageCenter
            enableRetinaIcons
            gridSize={60}
        >
            {props.locations.map((marker,index) => (
                <Marker
                    key={index}
                    position={{ lat: marker.lat, lng: marker.lng }}
                    onClick={() => props.onToggleOpen(index)}
                >

                    {(props.isOpen && props.markerIndex === index) &&
                    <InfoWindow
                        onCloseClick={props.onToggleOpen}
                        key={index}
                    >
                        <div style={{
                        textAlign: "center"
                        }}>
                            <h5>{marker.name}</h5>
                            <Link to={`/DetailLocation/${marker.id}`}>Detail</Link>
                        </div>
                    </InfoWindow>}

                </Marker>
            ))}
        </MarkerClusterer>
    </GoogleMap>
);

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [
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
            ]
        }
    }
    // Fetch all locations from database and setState
    componentDidMount() {

    }


    render() {
        const {classes} = this.props;
        return (
            <div>
                <NavBar/>
                <Grid container>
                    <Grid item sm={8} md={8}>
                        <Typography className={classes.text}>Chọn địa điểm bạn muốn tham dự</Typography>
                        <Grid item className={classes.mapContainer}>
                            <Map locations={this.state.locations}/>

                        </Grid>
                    </Grid>


                    <Grid item sm={4} md={4}>
                        {/*<SearchBar/>*/}

                    </Grid>
                </Grid>


            </div>

        )
    }
}

export default withStyles(styles)(SearchBar);





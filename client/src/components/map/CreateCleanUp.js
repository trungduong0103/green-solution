import React, {Component} from 'react';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps"
import SearchBox from "react-google-maps/lib/components/places/SearchBox"
//Material UI
import Typography from "@material-ui/core/Typography"
import Grid from "@material-ui/core/Grid"
import withStyles from "@material-ui/core/styles/withStyles";
//React-redux
import {connect} from "react-redux";
import {getAllLocations} from "../../redux/actions/LocationActions";
//React router

import NavBar from "../NavBar";

import _ from "lodash"
import {compose, lifecycle, withProps, withStateHandlers} from "recompose";
import {REACT_APP_GOOGLE_KEY} from "../../environments/Keys";


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
        fontFamily: "'Quicksand', sans-serif;",
        fontSize: 30,

    }
};
const Map = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
            REACT_APP_GOOGLE_KEY}`,
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `100%`}}/>,
        mapElement: <div style={{height: `100%`}}/>
    }),

    withStateHandlers(() => ({
        isMarkerShown: false,
        markerPosition: null
    }), {
        onMapClick: ({isMarkerShown}) => (e) => ({
            markerPosition: e.latLng,
            isMarkerShown: true,
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

                markers: [],

                onMarkerMounted: ref => {
                    refs.marker = ref
                },

                onPositionChanged: () => {
                    const position = refs.marker.getPosition();
                    const positionArray = position.toString().split(",");
                    // this.props.eventLat = positionArray[0];
                    // this.props.eventLng = positionArray[1];
                    console.log(positionArray[0], positionArray[1]);
                    // console.log(this.props.eventLat);
                    // console.log(this.props.eventLng);
                    // this.setState({
                    //     eventLat: positionArray[0],
                    //     eventLng: positionArray[1]
                    // });
                    // console.log(typeof position.toString());
                    // console.log(position.toString())

                },

                onSearchBoxMounted: ref => {
                    refs.searchBox = ref;
                },

                onPlacesChanged: (place) => {
                    const places = refs.searchBox.getPlaces();

                    const bounds = new window.google.maps.LatLngBounds();

                    places.forEach(place => {
                        if (place.geometry.viewport) {
                            bounds.union(place.geometry.viewport)
                        } else {
                            bounds.extend(place.geometry.location)
                        }
                    });

                    places.map(place => {
                        return this.props.handleCall({
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng()
                        })
                    });

                    const nextMarkers = places.map(place => ({
                        position: place.geometry.location
                    }));

                    const nextCenter = _.get(nextMarkers, '0.position', this.state.center);
                    this.setState({
                        center: nextCenter,
                        markers: nextMarkers,
                    });

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
        onClick={props.onMapClick}
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
        {props.markers.map((marker, index) =>
            <Marker
                key={index}
                position={marker.position}
                onPositionChanged={props.onPositionChanged}
                ref={props.onMarkerMounted}/>
        )}

    </GoogleMap>
);

class CreateCleanUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            eventLat: 0,
            eventLng: 0
        }
    }

    //Get marker position from user's search
    getLocation = (childData) => {
        console.log("called from parent", childData);
        this.setState({
            eventLat: childData.lat,
            eventLng: childData.lng
        })
    };


    render() {
        // console.log(this.props.locations);
        const {classes} = this.props;
        return (
            <div>
                <NavBar/>
                <Grid container>
                    <Grid item sm={8} md={8}>
                        <Typography className={classes.text}>Chọn địa điểm bạn muốn tạo sự kiện</Typography>
                        <Grid item className={classes.mapContainer}>
                            <Map
                                handleCall={this.getLocation()}
                            />

                        </Grid>
                    </Grid>


                    <Grid item sm={4} md={4}>
                        <Typography>{this.state.eventLat}</Typography>
                        <Typography>{this.state.eventLng}</Typography>
                    </Grid>
                </Grid>


            </div>

        )
    }
}

const mapStateToProps = state => ({
    // locations: state.locationsData.locations
});

const mapDispatchToProps = {
    getAllLocations
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(CreateCleanUp));





import React from "react";
import {compose, lifecycle, withProps, withStateHandlers} from "recompose";
import {REACT_APP_GOOGLE_KEY} from "../../../environments/Keys";
import _ from "lodash";
import {GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";

import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer";
import Button from "@material-ui/core/Button";
export const JoinCleanUpMap = compose(
    withProps({
        googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
            REACT_APP_GOOGLE_KEY}`,
        loadingElement: <div style={{height: `100%`}}/>,
        containerElement: <div style={{height: `100%`}}/>,
        mapElement: <div style={{height: `100%`}}/>
    }),
    withStateHandlers(() => ({
        isOpen: false,
        markerIndex: 0
    }), {
        onToggleOpen: ({isOpen}) => (index) => ({
            isOpen: !isOpen,
            markerIndex: index
        }),
    }),

    lifecycle({

        componentDidMount() {

            const refs = {};

            this.setState({
                bounds: null,
                center: {
                    lat: 10.812675, lng: 106.656734
                },

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

                },
            })
        }
    }),
    withScriptjs,
    withGoogleMap,
)(props =>
    <GoogleMap defaultZoom={11} center={props.center}>
        <SearchBox
            ref={props.onSearchBoxMounted}
            bounds={props.bounds}
            controlPosition={window.google.maps.ControlPosition.TOP_CENTER}
            onPlacesChanged={props.onPlacesChanged}
        >
            <input
                type="text"
                placeholder="Nhập địa chỉ bạn muốn tìm..."
                style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `40px`,
                    marginTop: `10px`,
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
            {props.locations.map((marker, index) => (
                <Marker
                    icon={{
                        url: require("../../../assets/imgs/marker.png"),
                        scaledSize: {width: 60, height: 60}
                    }}
                    key={index}
                    position={{lat: marker.lat, lng: marker.lng}}
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
                            <h2>{marker.name}</h2>
                            <Button
                                variant="outlined"
                                onClick={() => props.openCleanUpForm(marker.id)}
                            >
                                Tham Gia
                            </Button>
                            {/*<Link to={`/cleanup-detail/${marker.id}`}>Detail</Link>*/}
                        </div>
                    </InfoWindow>}
                </Marker>
            ))}
        </MarkerClusterer>
    </GoogleMap>
);

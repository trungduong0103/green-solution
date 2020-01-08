import {compose, lifecycle, withProps, withStateHandlers} from "recompose";
import {REACT_APP_GOOGLE_KEY} from "../../../environments/Keys";
import _ from "lodash";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import React from "react";

export const MapWithSearchBox = compose(
    withProps({
        googleMapURL: `${REACT_APP_GOOGLE_KEY}`,
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
            const {center} = this.props;
            this.setState({
                bounds: null,
                center: center ? center : {lat: 10.821, lng: 106.6297},
                markers: [],

                onMarkerMounted: ref => {
                    refs.marker = ref;
                },

                onPositionChanged: () => {
                    const position = refs.marker.getPosition();
                    return this.props.handleCall({
                        lat: position.lat(),
                        lng: position.lng()
                    })
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

                    places.map(place => {
                        return this.props.handleCall({
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                            address: place.formatted_address
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
        defaultZoom={15}
        center={props.center}
        onClick={props.onMapClick}
    >
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
                defaultValue={props.street}
            />
        </SearchBox>
        {props.markers.map((marker, index) =>
            <Marker
                icon={{
                    url: require("../../../assets/imgs/marker.png"),
                    scaledSize: {width: 50, height: 50}
                }}
                key={index}
                ref={props.onMarkerMounted}
                onPositionChanged={props.onPositionChanged}
                position={marker.position}
            />
        )}
        {props.markers.length === 0 &&
        <Marker
            icon={{
                url: require("../../../assets/imgs/marker.png"),
                scaledSize: {width: 50, height: 50}
            }}
            ref={props.onMarkerMounted}
            onPositionChanged={props.onPositionChanged}
            position={props.center}
        />
        }
    </GoogleMap>
);

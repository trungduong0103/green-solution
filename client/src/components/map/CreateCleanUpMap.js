import {compose, lifecycle, withProps, withStateHandlers} from "recompose";
import {REACT_APP_GOOGLE_KEY} from "../../environments/Keys";
import _ from "lodash";
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";
import React from "react";

export const CreateCleanUpMap = compose(
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
        defaultZoom={11}
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
            />
        )}

    </GoogleMap>
);

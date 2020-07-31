import React from "react";
import { compose, lifecycle, withProps } from "recompose";
import { REACT_APP_GOOGLE_KEY } from "../../../environments/Keys";
import _ from "lodash";
import { GoogleMap, InfoWindow, Marker, withGoogleMap, withScriptjs } from "react-google-maps";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";

import markerLogo from "../../../assets/imgs/marker.png";
import locationAvatar from "../../../assets/imgs/download.jpeg";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";

export const JoinCleanUpMap = compose(
    withProps(() => {
        return {
            googleMapURL: `${REACT_APP_GOOGLE_KEY}`,
            loadingElement: <div style={{ height: `100%` }} />,
            containerElement: <div style={{ height: `100%` }} />,
            mapElement: <div style={{ height: `100%` }} />,
            locationAvatar: {
                height: "150px",
                width: "150px",
                marginRight: "auto",
                marginLeft: "auto"
            }
        }
    }),


    lifecycle({
        componentDidMount() {
            const refs = {};
            this.setState({
                bounds: null,
                center: { lat: 10.812675, lng: 106.656734 },

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
                onInfoWindowClick: (id) => {
                    window.open(`/cleanup-detail/${id}`, 'mywindow')
                }
            })
        }
    }),
    withScriptjs,
    withGoogleMap,
)(props =>
    <GoogleMap defaultZoom={11} center={props.center} onClick={props.minimize}>
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
        {props.locations.map((marker, index) => (
            <Marker
                icon={{
                    url: markerLogo,
                    scaledSize: props.showInfoWindow && props.infoWindowIndex === index ?
                        { width: 60, height: 60 } :
                        { width: 45, height: 45 }
                }}
                onClick={() => props.enlarge(index)}
                key={marker.id}
                position={{ lat: marker.lat, lng: marker.lng }}
            >
                {(props.showInfoWindow && props.infoWindowIndex === index) &&
                    <InfoWindow onCloseClick={props.onToggleOpen} onClick={() => props.onInfoWindowClick(marker.id)}>
                        <div onClick={() => props.onInfoWindowClick(marker.id)} style={{ cursor: 'pointer' }}>
                            <Card style={{ maxWidth: "400px", maxHeight: "400px", width: "300px", height: "auto", alignContent: "center", justifyContent: "center" }}>

                                {(marker.locationImages !== undefined && marker.locationImages.length > 0) ?
                                    <CardMedia component="img"
                                        style={props.locationAvatar}
                                        src={`${marker.locationImages[0]}`}
                                        alt="Site's Image"
                                        title="Site's Image"
                                    /> : marker.logoUrl !== undefined ? <CardMedia component="img"
                                        style={props.locationAvatar}
                                        src={`${marker.logoUrl}`}
                                        alt="Site's Image"
                                        title="Site's Image"
                                    /> : <CardMedia component="img"
                                        style={props.locationAvatar}
                                        src={locationAvatar}
                                        alt="Site's Image"
                                        title="Site's Image"
                                        />}
                                <CardContent style={{ textAlign: "center" }}>

                                    <Typography style={{ fontFamily: "Quicksand, sans-serif" }} gutterBottom variant="h5">{marker.name}</Typography>

                                    <Typography style={{ fontFamily: "Quicksand, sans-serif" }} variant="body2" color="textSecondary"
                                        component="h5">From: {marker.startDate}</Typography>
                                    <Typography style={{ fontFamily: "Quicksand, sans-serif" }} variant="body2" color="textSecondary"
                                        component="h5">Description: {marker.description}</Typography>
                                </CardContent>
                            </Card>
                        </div>
                    </InfoWindow>}
            </Marker>
        ))}
    </GoogleMap>
);

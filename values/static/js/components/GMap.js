import React, { Component } from 'react'
import { compose, withProps } from 'recompose'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

import MarkerList from './MarkerList'

// const MyMark = props => {
//     fetch(`/values/${props.value}`).then(res => res.json()).then(data => {
//         return <Marker position={{ lat: data.loc.latitude, lng: data.loc.longitude }} title={`plant: ${props.value}\ntemperature: ${data.values.map(d => d.temperature)[data.values.length - 1]}\nhumidity: ${data.values.map(d => d.humidity)[data.values.length - 1]}\nsoil moisture: ${data.values.map(d => d.moisture)[data.values.length - 1]}\nstatus: ${data.values.map(d => d.moisture)[data.values.length - 1] >= 900 ? 'dead' : 'alive'}`} />
//        //  wl: data.values.map(d => d.distance)[data.values.length - 1],
//     })
// }

const MyMapComponent = compose(
    withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyASZsihSydnvgO82MaFKaczekH65_nuruQ&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
)((props) =>
    <GoogleMap
        defaultZoom={8}
        defaultCenter={props.center}
    >
        {props.isMarkerShown && <MarkerList />}
    </GoogleMap>
)

export default class GMap extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 1,
            lat: 0,
            lng: 0,
            pid: 1,
            temp: 0,
            moist: 0,
            humid: 0,
            wl: 0,
            status: 'alive'
        }
    }
    render() {
        fetch(`/values/${this.state.value}`).then(res => res.json()).then(data => {
            this.setState({
                lat: data.loc.latitude,
                lng: data.loc.longitude,
                pid: this.state.value,
                temp: data.values.map(d => d.temperature)[data.values.length - 1],
                moist: data.values.map(d => d.moisture)[data.values.length - 1],
                humid: data.values.map(d => d.humidity)[data.values.length - 1],
                wl: data.values.map(d => d.distance)[data.values.length - 1],
                status: data.values.map(d => d.moisture)[data.values.length - 1] >= 900 ? 'dead' : 'alive'
            })
        })
        return (
            <div className="jesse">
                <MyMapComponent center={{ lat: this.state.lat, lng: this.state.lng }} isMarkerShown />
            </div>
        )
    }
}
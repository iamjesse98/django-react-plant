import React, { Component } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

export default class MarkerComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
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
    componentWillMount() {
        fetch(`/values/${this.props.value}`).then(res => res.json()).then(data => {
            this.setState({
                lat: data.loc.latitude,
                lng: data.loc.longitude,
                pid: this.props.value,
                temp: data.values.map(d => d.temperature)[data.values.length - 1],
                moist: data.values.map(d => d.moisture)[data.values.length - 1],
                humid: data.values.map(d => d.humidity)[data.values.length - 1],
                wl: data.values.map(d => d.distance)[data.values.length - 1],
                status: data.values.map(d => d.moisture)[data.values.length - 1] >= 900 ? 'dead' : 'alive'
            })
        })
    }
    render() {
        return (
            <Marker icon={{ path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW, scale: 5, strokeColor: `${this.state.status === 'alive' ? 'green' : 'red'}` }} position={{ lat: this.state.lat, lng: this.state.lng }} title={`plant: ${this.state.pid}\ntemperature: ${this.state.temp}\nhumidity: ${this.state.humid}\nsoil moisture: ${this.state.moist}\nstatus: ${this.state.status}`} />
        )
    }
}
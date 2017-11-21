import React, { Component } from 'react'

import MarkerComponent from './MarkerComponent'

export default class MarkerList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pids: []
        }
    }
    componentWillMount() {
        fetch(`/plants/`).then(res => res.json()).then(data => {
            this.setState({
                pids: data.pids
            })
        })
    }
    render() {
        return (
            this.state.pids.map(pid => <MarkerComponent value={pid} key={pid} />)
        )
    }
}
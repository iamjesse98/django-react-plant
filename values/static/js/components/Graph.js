import React, { Component } from 'react'
import Paper from 'material-ui/Paper'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import { Line } from 'react-chartjs-2'
import Bacon from 'baconjs'

export default class Graph extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pids: [],
            value: 1,
            chartData: {
                labels: [0, .5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24],
                datasets: [{
                    data: [],
                    label: "Temperature",
                    borderColor: "#3e95cd",
                    fill: false
                }, {
                    data: [],
                    label: "Humidity",
                    borderColor: "#8e5ea2",
                    fill: false
                }, {
                    data: [],
                    label: "Moisture",
                    borderColor: "#8e5ea2",
                    fill: false
                }, {
                    data: [],
                    label: "Water-level",
                    borderColor: "#8e5ea2",
                    fill: false
                }]
            }
        }
    }
    componentDidMount() {
        fetch(`/plants/`).then(res => res.json()).then(data => {
            this.setState({
                pids: data.pids
            })
        })
    }
    changePlant(event, index, value) { this.setState({ value }) }
    render() {
        let repeat = Bacon.fromPoll(5000, () => fetch(`/values/${this.state.value}`).then(res => res.json()))
        repeat.onValue(res => res.then(data => {
            this.setState({
                chartData: {
                    labels: [0, .5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 12.5, 13, 13.5, 14, 14.5, 15, 15.5, 16, 16.5, 17, 17.5, 18, 18.5, 19, 19.5, 20, 20.5, 21, 21.5, 22, 22.5, 23, 23.5, 24],
                    datasets: [{
                        data: data.values.map(d => d.temperature),
                        label: "Temperature",
                        borderColor: "#3e95cd",
                        fill: false
                    }, {
                        data: data.values.map(d => d.humidity),
                        label: "Humidity",
                        borderColor: "#8e5ea2",
                        fill: false
                    }, {
                        data: data.values.map(d => d.moisture),
                        label: "Moisture",
                        borderColor: "pink",
                        fill: false
                    }, {
                        data: data.values.map(d => d.distance),
                        label: "Water-level",
                        borderColor: "yellow",
                        fill: false
                    }]
                }
            })
        }))
        return (
            <div className="jesse">
                <Paper style={{ width: '100%', textAlign: 'right' }} zDepth={2}>
                    <DropDownMenu value={this.state.value} onChange={(event, index, value) => this.changePlant(event, index, value)} openImmediately={false}>
                        {this.state.pids.map(pid => <MenuItem value={pid} key={pid} primaryText={`Plant ${pid}`} />)}
                    </DropDownMenu>
                </Paper>
                <Line
                    data={this.state.chartData}
                    height={300}
                    options={{
                        title: {
                            display: true,
                            text: 'Sensor Readings',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'top'
                        },
                        maintainAspectRatio: false,
                    }}
                />
            </div>
        )
    }
}
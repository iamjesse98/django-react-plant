import React, { Component } from 'react'
import { GridList, GridTile } from 'material-ui/GridList'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Paper from 'material-ui/Paper'
import DropDownMenu from 'material-ui/DropDownMenu'
import MenuItem from 'material-ui/MenuItem'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import ContentAdd from 'material-ui/svg-icons/content/add'
import CommunicationVoicemail from 'material-ui/svg-icons/communication/voicemail'
import Bacon from 'baconjs'
// import injectTapEventPlugin from 'react-tap-event-plugin'

const style = {
    height: 200,
    width: 250,
    margin: 10,
    textAlign: 'center',
    display: 'inline-block',
}

const largeText = {
    fontSize: '45px',
    textAlign: 'center'
}

const btstyle = {
    position: 'fixed',
    right: '10px',
    bottom: '10px'
}

function speak(txt) {
    let msg = new SpeechSynthesisUtterance()
    let voices = window.speechSynthesis.getVoices()
    msg.voice = voices["Microsoft Zira Desktop - English (United States)"]
    msg.rate = 1
    msg.pitch = 1
    msg.text = txt

    speechSynthesis.speak(msg)
}

export default class Dash extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: 1,
            temps: [],
            humids: [],
            moists: [],
            dists: [],
            temp: 0,
            humid: 0,
            moist: 0,
            dist: 0,
            on: 0,
            pids: []
        }
        // injectTapEventPlugin()
    }
    sendCommand() {
        this.setState({
            on: Math.abs(this.state.on - 1)
        })
        // console.log(this.state.on)
        fetch(`/values/motor/`, { method: 'post', body: JSON.stringify({ on: this.state.on }) }).then(res => res.json()).then(res => console.log(res))
    }
    componentDidMount() {
        fetch(`/plants/`).then(res => res.json()).then(data => {
            this.setState({
                pids: data.pids
            })
        })
    }
    changePlant(event, index, value) { this.setState({value}) }
    render() {
        let repeat = Bacon.fromPoll(5000, () => fetch(`/values/${this.state.value}`).then(res => res.json()))
        repeat.onValue(res => res.then(data => {
            // console.log(data)
            this.setState({
                temps: data.values.map(d => d.temperature),
                humids: data.values.map(d => d.humidity),
                moists: data.values.map(d => d.moisture),
                dists: data.values.map(d => d.distance),
                temp: data.values.map(d => d.temperature)[data.values.length - 1],
                humid: data.values.map(d => d.humidity)[data.values.length - 1],
                moist: data.values.map(d => d.moisture)[data.values.length - 1],
                dist: data.values.map(d => d.distance)[data.values.length - 1]
            })
        }))
        return (
            <div className="jesse">
                <Paper style={{ width: '100%', textAlign: 'right' }} zDepth={2}>
                    <DropDownMenu value={this.state.value} onChange={(event, index, value) => this.changePlant(event, index, value)} openImmediately={false}>
                        {this.state.pids.map(pid => <MenuItem value={pid} key={pid} primaryText={`Plant ${pid}`} />)}
                    </DropDownMenu>
                </Paper>
                <Paper className="box-res jesse" style={style} zDepth={2} rounded={false} >
                    <Card>
                        <CardTitle title="🌡 Temperature" subtitle="in C" />
                        <CardText>
                            <p style={largeText}>{this.state.temp}</p>
                        </CardText>
                        <CardActions>
                            <FlatButton label="Fahrenheit" />
                        </CardActions>
                    </Card>
                </Paper>
                <Paper className="box-res" style={style} zDepth={2} rounded={false} >
                    <Card>
                        <CardTitle title="💧 Humidity" subtitle="in C" />
                        <CardText>
                            <p style={largeText}>{this.state.humid}</p>
                        </CardText>
                        <CardActions>
                            <FlatButton label="Fahrenheit" />
                        </CardActions>
                    </Card>
                </Paper>
                <Paper className="box-res" style={style} zDepth={2} rounded={false} >
                    <Card>
                        <CardTitle title="🌊 Water Level" subtitle="in C" />
                        <CardText>
                            <p style={largeText}>{this.state.dist}</p>
                        </CardText>
                        <CardActions>
                            <FlatButton label="Fahrenheit" />
                        </CardActions>
                    </Card>
                </Paper>
                <Paper className="box-res" style={style} zDepth={2} rounded={false} >
                    <Card>
                        <CardTitle title="⛱ Soil Moisture" subtitle="in C" />
                        <CardText>
                            <p style={largeText}>{this.state.moist}</p>
                        </CardText>
                        <CardActions>
                            <FlatButton label="Fahrenheit" />
                        </CardActions>
                    </Card>
                </Paper>
                <FloatingActionButton onClick={() => this.sendCommand()} mini={true} style={btstyle}>
                    <ContentAdd />
                </FloatingActionButton>
                <FloatingActionButton onClick={() => speak(`Temperature is ${this.state.temp}, Humidity is ${this.state.humid}, Water Level is ${this.state.dist}, Soil Moisture is ${this.state.moist}`)} secondary={true} style={{ position: 'fixed', left: '20px', bottom: '20px' }}>
                    <CommunicationVoicemail />
                </FloatingActionButton>
            </div>
        )
    }
}
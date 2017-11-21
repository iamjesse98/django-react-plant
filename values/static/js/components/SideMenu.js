import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Avatar from 'material-ui/Avatar'
import IconButton from 'material-ui/IconButton'
import NavigationMenu from 'material-ui/svg-icons/navigation/menu'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'

import { Link } from 'react-router-dom'

export default class SideMenu extends Component {
    constructor(props) {
        super(props)
        this.state = { open: false, signout: false, add: false, delete: false, d_p_id: -1, a_p_id: -1, a_lat: 0, a_long: 0 }
    }
    toggleNav() {
        this.setState({ open: !this.state.open})
    }
    handleOpen() {
        this.setState({ signout: true });
    };

    handleClose() {
        this.setState({ signout: false });
    }

    handleOpenAdd() {
        this.setState({ add: true });
    };

    handleCloseAdd() {
        this.setState({ add: false });
    }

    handleOpenDelete() {
        this.setState({ delete: true });
    };

    handleCloseDelete() {
        this.setState({ delete: false });
    }

    sendAdd() {
        fetch(`/values/create/`, { method: 'post', body: JSON.stringify({ apid: this.state.a_p_id, lat: this.state.a_lat, lng: this.state.a_long }) }).then(res => res.json()).then(res => console.log(res))
    }

    sendDelete() {
        fetch(`/delet/`, { method: 'post', body: JSON.stringify({ dpid: this.state.d_p_id }) }).then(res => res.json()).then(res => console.log(res))
    }

    handleChangeAP(event) {
        this.setState({ a_p_id: event.target.value })
    }
    
    handleChangeLat(event) {
        this.setState({ a_lat: event.target.value })
    }

    handleChangeLng(event) {
        this.setState({ a_long: event.target.value })
    }

    handleChangeDP(event) {
        this.setState({ d_p_id: event.target.value })
    }

    render() {
        const actions = [
            <a href="/logout/"><FlatButton
                label="Yes"
                primary={true}
            /></a>,
            <FlatButton
                label="No"
                primary={true}
                onClick={() => this.handleClose()}
            />,
        ]
        const add_actions = [
            <FlatButton
                label="Add"
                primary={true}
                onClick={() => this.sendAdd()}
            />,
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => this.handleCloseAdd()}
            />
        ]
        const delete_actions = [
            <FlatButton
                label="Delete"
                primary={true}
                onClick={() => this.sendDelete()}
            />,
            <FlatButton
                label="Cancel"
                primary={true}
                onClick={() => this.handleCloseDelete()}
            />
        ]
        return (
            <div>
                <Dialog
                    actions={actions}
                    modal={false}
                    open={this.state.signout}
                    onRequestClose={() => this.handleClose()}
                >
                    Are you sure?
                </Dialog>
                {/* add plant */}
                <Dialog
                    actions={add_actions}
                    title="Add Plant"
                    modal={false}
                    open={this.state.add}
                    onRequestClose={() => this.handleCloseAdd()}
                >
                    <TextField
                        floatingLabelText="Plant ID"
                        value={this.state.a_p_id}
                        onChange={(event) => this.handleChangeAP(event)}
                    /><br />
                    <TextField
                        floatingLabelText="Latitude"
                        value={this.state.a_lat}
                        onChange={(event) => this.handleChangeLat(event)}
                    /><br />
                    <TextField
                        floatingLabelText="Longitude"
                        value={this.state.a_long}
                        onChange={(event) => this.handleChangeLng(event)}
                    /><br />
                </Dialog>
                {/* delete plant */}
                <Dialog
                    actions={delete_actions}
                    modal={false}
                    title="Delete Plant"
                    open={this.state.delete}
                    onRequestClose={() => this.handleCloseDelete()}
                >
                    <TextField
                        floatingLabelText="Plant ID"
                        value={this.state.d_p_id}
                        onChange={(event) => this.handleChangeDP(event)}
                    /><br />
                </Dialog>
                
                <AppBar
                    title="Group - 18"
                    iconElementRight={<IconButton tooltip="expand menu" touch={true} tooltipPosition="bottom-left"><NavigationMenu /></IconButton>}
                    showMenuIconButton={false}
                    style={{ position: 'fixed', top: 0 }}
                    onRightIconButtonTouchTap={() => this.toggleNav()}
                />
                <Drawer
                    docked={false}
                    open={this.state.open}
                    onRequestChange={open => this.setState({ open })}
                    disableSwipeToOpen={false}
                    openSecondary={true}
                >
                    <div style={{ textAlign: 'center', marginTop: '10px' }}>
                        <Avatar src="http://mydea.github.io/ember-presentation/assets/img/emberjs-logo.png" size={70} />                        
                    </div>
                    <div style={{ textAlign: 'center', background: 'rebeccapurple', width: '100%', marginTop: '0' }}>
                        <h1>User</h1>
                    </div>
                    <Link to="/values/react/"><MenuItem onClick={() => this.toggleNav()}>Dashboard</MenuItem></Link>
                    <Link to="/values/react/graph/"><MenuItem onClick={() => this.toggleNav()}>Graph</MenuItem></Link>
                    <Link to="/values/react/map/"><MenuItem onClick={() => this.toggleNav()}>Map</MenuItem></Link>
                    {/* <a href="/values/create/"><MenuItem onClick={() => this.toggleNav()}>Add Plant</MenuItem></a> */}
                    <MenuItem onClick={() => this.handleOpenAdd()}>Add Plant</MenuItem>
                    <MenuItem onClick={() => this.handleOpenDelete()}>Delete Plant</MenuItem>                    
                    {/* <a href="/delet/"><MenuItem onClick={() => this.toggleNav()}>Delete Plant</MenuItem></a>                                         */}
                    <MenuItem onClick={() => this.handleOpen()}>Sign Out</MenuItem>
                </Drawer>
            </div>
        )
    }
}
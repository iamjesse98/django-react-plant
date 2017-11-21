import React from 'react'
import Main from './components/Main'

import SideMenu from './components/SideMenu'
import FancyFooter from './components/FancyFooter'

class App extends React.Component {
    render() {
        return (
            <div>
                <SideMenu />
                <br /><br /><br />
                <div style={{ textAlign: 'center', display: 'block', minHeight: '100%', height: '90%', paddingBottom: '100px' }}>
                    <Main />
                </div>
                <FancyFooter />
            </div>
        )
    }
}

export default App
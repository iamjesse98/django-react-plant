import React from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { TransitionGroup, CSSTransition } from 'react-transition-group'

// import all the components
import Dash from './Dash'
import Graph from './Graph'
import GMap from './GMap'

const Main = withRouter(({ location }) => (
    <main>
        <TransitionGroup>
            <CSSTransition
                key={location.key}
                classNames='jesse'
                unmountOnExit={true}
                mountOnEnter={true}
                timeout={400}
            >
                <Switch>
                    <Route exact path='/values/react/' component={Dash} />
                    <Route exact path='/values/react/graph/' component={Graph} />
                    <Route exact path='/values/react/map/' component={GMap} />
                </Switch>
            </CSSTransition>
        </TransitionGroup>
    </main>
))

export default Main
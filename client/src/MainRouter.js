import React from 'react'
import { Route,Switch  } from 'react-router-dom'
import Home from './components/Home'

function MainRouter() {
    
    return ( 
        <div>
        <Switch>
            <Route exact path="/" component={Home}/>
        </Switch>
        </div>
    )
}

export default MainRouter
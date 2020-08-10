import React from 'react'
import './app.css'

import Spinner from '../spinner/spinner'
import ErrorIndicator from '../error-indicator/error'



const App = () => {
    return <div className="wrapper">
        <Spinner />
        <ErrorIndicator />
    </div>
}

export default App
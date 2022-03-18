import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

// Routes
import { Home } from './routes/Home'

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)

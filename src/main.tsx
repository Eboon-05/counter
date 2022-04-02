import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'

import { store } from './redux/store'

// Styles
import './styles/main.scss'

// Routes
import { Home } from './routes/Home'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path='/' element={<Home />} />
                </Routes>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
